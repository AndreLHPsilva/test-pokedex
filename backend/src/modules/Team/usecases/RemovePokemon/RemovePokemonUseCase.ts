import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { IPokemonRepository } from "@database/repositories/IPokemonRepository";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";
import { ApiError } from "@errors/ApiError";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemons } from "@models/Pokemons";
import { ITeamsOnPokemonsRepository } from "@database/repositories/ITeamsOnPokemonsRepository";
import { ITeamsOnPokemons } from "@models/TeamsOnPokemons";
import { ITeams } from "@models/Teams";

interface IRemovePokemonDTO {
  team_id: string;
  pokemon_id: string;
}

@injectable()
class RemovePokemonUseCase {
  constructor(
    @inject("PokemonRepository") private pokemonRepository: IPokemonRepository,
    @inject("TeamRepository") private teamRepository: ITeamRepository,
    @inject("TeamsOnPokemonsRepository")
    private teamsOnPokemonsRepository: ITeamsOnPokemonsRepository
  ) {}

  async execute({ team_id, pokemon_id }: IRemovePokemonDTO): Promise<ITeams> {
    const team = await this.teamRepository.find(team_id);

    if (!team) {
      throw new ApiError("Time não encontrado!");
    }

    let pokemon: IPokemonsExternal | IPokemons | null =
      await this.pokemonRepository.find(pokemon_id);

    if (!pokemon) {
      throw new ApiError("Pokemon não encontrado!");
    }

    const teamsOnPokemons = await this.teamsOnPokemonsRepository.getByTeamId(
      team.id
    );

    if (teamsOnPokemons.length == 0) {
      throw new ApiError("Time não tem pokemons relacionados!");
    }

    const hasPokemonInTheTeam = teamsOnPokemons.find((teamOnPokemon) => {
      return teamOnPokemon.pokemon?.id === pokemon_id;
    });

    if (!hasPokemonInTheTeam) {
      throw new ApiError("Pokemon não encontrado no time!");
    }

    await this.teamsOnPokemonsRepository.remove(hasPokemonInTheTeam.id);

    let pokemons =
      team.TeamsOnPokemons?.filter((teamOnPokemon) => {
        return teamOnPokemon.pokemon?.id != pokemon_id;
      })?.map((teamsOnPokemon) => {
        return teamsOnPokemon.pokemon!;
      }) ?? [];

    delete team.TeamsOnPokemons;
    team.pokemons = pokemons.sort((a, b) => a.external_id - b.external_id);

    return team;
  }
}

export { RemovePokemonUseCase };
