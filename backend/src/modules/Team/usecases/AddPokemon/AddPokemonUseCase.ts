import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { ITeams } from "@models/Teams";
import { IPokemonRepository } from "@database/repositories/IPokemonRepository";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";
import { ApiError } from "@errors/ApiError";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemons } from "@models/Pokemons";
import { ITeamsOnPokemonsRepository } from "@database/repositories/ITeamsOnPokemonsRepository";
import { ITeamsOnPokemons } from "@models/TeamsOnPokemons";

interface IAddPokemonDTO {
  user_id: string;
  external_id: number;
}

@injectable()
class AddPokemonUseCase {
  constructor(
    @inject("PokemonRepository") private pokemonRepository: IPokemonRepository,
    @inject("PokemonExternalRepository")
    private pokemonExternalRepository: IPokemonExternalApiRepository,
    @inject("TeamRepository") private teamRepository: ITeamRepository,
    @inject("TeamsOnPokemonsRepository")
    private teamsOnPokemonsRepository: ITeamsOnPokemonsRepository
  ) {}

  async execute({ user_id, external_id }: IAddPokemonDTO): Promise<ITeams> {
    let pokemon: IPokemonsExternal | IPokemons | null =
      await this.pokemonRepository.findExternalId(external_id);

    if (!pokemon) {
      pokemon = await this.pokemonExternalRepository.find(external_id);

      if (!pokemon) {
        throw new ApiError("Pokemon não encontrado!");
      }

      pokemon = await this.pokemonRepository.create({
        external_id: pokemon.id,
        name: pokemon.name,
      });
    }

    const team = await this.teamRepository.findByUserId(user_id);

    if (!team) {
      throw new ApiError("Usuário ainda não tem um time criado!");
    }

    const teamsOnPokemons = await this.teamsOnPokemonsRepository.getByTeamId(
      team.id
    );

    if (teamsOnPokemons?.length == 5) {
      throw new ApiError(
        "Time já chegou no limite máximo de pokemons, 5 por time!"
      );
    }

    const alreadyExistsThisPokemon = teamsOnPokemons.find(
      (teamOnPokemon) => teamOnPokemon.pokemon?.external_id == external_id
    );

    if (!!alreadyExistsThisPokemon) {
      throw new ApiError("Este pokemon já pertence ao seu time!");
    }

    await this.teamsOnPokemonsRepository.create({
      team_id: team.id,
      pokemon_id: pokemon.id,
    });

    let pokemons = team.TeamsOnPokemons?.map((teamOnPokemon) => {
      return teamOnPokemon.pokemon!;
    });

    if (!pokemons || pokemons.length == 0) {
      pokemons = [];
    }

    pokemons?.push(pokemon);
    delete team.TeamsOnPokemons;
    team.pokemons = pokemons.sort((a, b) => a.external_id - b.external_id);

    return team;
  }
}

export { AddPokemonUseCase };
