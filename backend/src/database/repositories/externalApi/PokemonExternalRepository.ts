import { IPokemonsExternal } from "@models/PokemonsExternal";
import {
  IPokemonShort,
  IPokemonsByTypeResponse,
} from "./interfaces/IPokemonResponse";
import {
  IFindByTypeDTO,
  IGetPokemonsDTO,
  IPokemonExternalApiRepository,
  IResponsePaginationPokemonsDTO,
} from "../IPokemonExternalApiRepository";
import { IEvolutions } from "@models/Evoluetions";
import { ITypesPokemons } from "@models/TypesPokemons";
import { PokemonService } from "services/PokemonServices/PokemonService";
import { getStatsFormated } from "@helpers/getStatsFormated";
import { getTypesFormated } from "@helpers/getTypesFormated";
import { getAbilitiesFormated } from "@helpers/getAbilitiesFormated";
import { getEvolutionsFormated } from "@helpers/getEvolutionsFormated";
import { IPokemonNames } from "@models/PokemonNames";

class PokemonExternalRepository implements IPokemonExternalApiRepository {
  constructor(private pokemonServices = new PokemonService()) {}

  async getPokemonNames(): Promise<IPokemonNames[]> {
    try {
      const getLimit = await this.pokemonServices.getAllPokemons({
        limit: 1,
        offset: 0,
      });

      const limit = getLimit.count;

      const pokemons = await this.pokemonServices.getAllPokemons({
        limit,
        offset: 0,
      });

      return pokemons.results.map((pokemon) => {
        return {
          name: pokemon.name,
        };
      });
    } catch (error) {
      return [];
    }
  }

  async get({
    limit,
    offset,
  }: IGetPokemonsDTO): Promise<IResponsePaginationPokemonsDTO> {
    try {
      const pokemons = await this.pokemonServices.getAllPokemons({
        limit,
        offset,
      });

      const total = pokemons.count;

      if (pokemons.results.length == 0 && !pokemons.next) {
        return {
          pokemons: [],
          pagination: {
            limit,
            offset,
            total: 0,
          },
        };
      }

      const pokemonsReturn: IPokemonsExternal[] = [];

      await Promise.all(
        pokemons?.results?.map(async (pokemon: IPokemonShort) => {
          const allInformationPokemon = await this.pokemonServices.findByUrl(
            pokemon.url
          );

          const stats = getStatsFormated(allInformationPokemon.stats);
          const types = getTypesFormated(allInformationPokemon.types);
          const abilities = getAbilitiesFormated(
            allInformationPokemon.abilities
          );

          const img_url =
            allInformationPokemon.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default;

          const basic_img_url = allInformationPokemon.sprites.front_default;

          const evolutions = await this.findEvolutions(
            allInformationPokemon.id
          );

          pokemonsReturn.push({
            id: allInformationPokemon.id,
            weight: allInformationPokemon.weight,
            base_experience: allInformationPokemon.base_experience,
            height: allInformationPokemon.height,
            name: allInformationPokemon.name,
            abilities,
            types,
            stats,
            img_url,
            basic_img_url,
            evolutions,
          });
        })
      );

      return {
        pokemons: pokemonsReturn.sort((a, b) => a.id - b.id),
        pagination: {
          limit,
          offset,
          total,
        },
      };
    } catch (error) {
      return {
        pokemons: [],
        pagination: {
          limit,
          offset,
          total: 0,
        },
      };
    }
  }

  async getTypes(): Promise<ITypesPokemons[]> {
    try {
      const types = await this.pokemonServices.getTypes();

      return types.results.map((type) => {
        return { name: type.name };
      });
    } catch (error) {
      return [];
    }
  }

  async find(search: string): Promise<IPokemonsExternal | null> {
    try {
      const pokemon = await this.pokemonServices.find(search);

      const stats = getStatsFormated(pokemon!.stats);
      const types = getTypesFormated(pokemon!.types);
      const abilities = getAbilitiesFormated(pokemon!.abilities);

      const img_url =
        pokemon!.sprites.versions["generation-v"]["black-white"].animated
          .front_default;

      const basic_img_url = pokemon!.sprites.front_default;

      const evolutions = await this.findEvolutions(pokemon?.id!);

      const pokemonsReturn: IPokemonsExternal = {
        id: pokemon!.id,
        weight: pokemon!.weight,
        base_experience: pokemon!.base_experience,
        height: pokemon!.height,
        name: pokemon!.name,
        abilities,
        types,
        stats,
        evolutions,
        img_url,
        basic_img_url,
      };

      return pokemonsReturn;
    } catch (error) {
      return null;
    }
  }

  async findByType({
    limit,
    offset,
    type,
  }: IFindByTypeDTO): Promise<IResponsePaginationPokemonsDTO> {
    try {
      const pokemons = await this.pokemonServices.findByType(type);

      if (pokemons.pokemon.length == 0)
        return {
          pokemons: [],
          pagination: {
            limit: limit,
            offset: offset,
            total: 0,
          },
        };

      const pokemonsReturn: IPokemonsExternal[] = [];
      const pokemonsForLoop = pokemons.pokemon.slice(offset, offset + limit);

      await Promise.all(
        pokemonsForLoop.map(async (pokemon: IPokemonsByTypeResponse) => {
          const allInformationPokemon = await this.pokemonServices.findByUrl(
            pokemon.pokemon.url
          );

          const stats = getStatsFormated(allInformationPokemon.stats);
          const types = getTypesFormated(allInformationPokemon.types);
          const abilities = getAbilitiesFormated(
            allInformationPokemon.abilities
          );

          const img_url =
            allInformationPokemon.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default;

          const basic_img_url = allInformationPokemon.sprites.front_default;

          const evolutions = await this.findEvolutions(
            allInformationPokemon.id
          );

          pokemonsReturn.push({
            id: allInformationPokemon.id,
            weight: allInformationPokemon.weight,
            base_experience: allInformationPokemon.base_experience,
            height: allInformationPokemon.height,
            name: allInformationPokemon.name,
            abilities,
            types,
            stats,
            img_url,
            basic_img_url,
            evolutions,
          });
        })
      );

      return {
        pokemons: pokemonsReturn.sort((a, b) => a.id - b.id),
        pagination: {
          limit,
          offset,
          total: pokemons.pokemon.length,
        },
      };
    } catch (error) {
      return {
        pokemons: [],
        pagination: {
          limit: limit,
          offset: offset,
          total: 0,
        },
      };
    }
  }

  async findEvolutions(pokemon_id: number): Promise<IEvolutions[]> {
    try {
      const pokemon = await this.pokemonServices.getPokemonSpecies(pokemon_id);

      const evolutions = await this.pokemonServices.getEvolutions(
        pokemon.evolution_chain.url
      );

      const evolutions_formatted = getEvolutionsFormated(evolutions);

      await Promise.all(evolutions_formatted.map( async (evolution, index) => {
        const poke = await this.pokemonServices.find(evolution.name);

        evolutions_formatted[index]['basic_img_url'] = poke?.sprites!.front_default;
        evolutions_formatted[index]['link_url'] = `${process.env.FRONT_URL}/pokemon/${poke!.id}`;
      }))

      return evolutions_formatted;
    } catch (error) {
      return [];
    }
  }
}

export { PokemonExternalRepository };
