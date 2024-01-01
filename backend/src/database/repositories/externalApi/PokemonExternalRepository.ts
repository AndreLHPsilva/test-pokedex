import { IPokemonsExternal } from "@models/PokemonsExternal";
import { axiosInstance } from "@config/axios";
import {
  IAbilitiesResponse,
  IEvolutionsResponse,
  IEvolvesToResponse,
  IPokemonByTypeResponse,
  IPokemonCompleted,
  IPokemonsByTypeResponse,
  IStatResponse,
  ITypeResponse,
  ITypesPokemonsReponse,
} from "./interfaces/IPokemonResponse";
import {
  IFindByTypeDTO,
  IGetPokemonsDTO,
  IPokemonExternalApiRepository,
  IResponsePaginationPokemonsDTO,
} from "../IPokemonExternalApiRepository";
import { IEvolutions } from "@models/Evoluetions";
import { ITypesPokemons } from "@models/TypesPokemons";

interface IPokemonShort {
  name: string;
  url: string;
}

interface IResponseGetAllPokemons {
  count: number;
  next: string;
  previous: boolean;
  results: IPokemonShort[];
}

interface IStat {
  name: string;
  qnt: number;
}

class PokemonExternalRepository implements IPokemonExternalApiRepository {
  constructor(
    private base_url = process.env.POKE_URL ?? "https://pokeapi.co/api/v2"
  ) {}

  async get({
    limit,
    offset,
  }: IGetPokemonsDTO): Promise<IResponsePaginationPokemonsDTO> {
    try {
      const pokemons: IResponseGetAllPokemons = await axiosInstance.get(
        `${this.base_url}/pokemon?limit=${limit}&offset=${offset}`
      );

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
          const allInformationPokemon: IPokemonCompleted =
            await axiosInstance.get(pokemon.url);
          const stats: IStat[] = allInformationPokemon.stats?.map(
            (stat: IStatResponse) => {
              return {
                name: stat.stat.name,
                qnt: stat.base_stat,
              };
            }
          );
          const types: string[] = allInformationPokemon.types.map(
            (type: ITypeResponse) => {
              return type.type.name;
            }
          );
          const abilities: string[] = allInformationPokemon.abilities.map(
            (abilitiy: IAbilitiesResponse) => {
              return abilitiy.ability.name;
            }
          );

          const img_url =
            allInformationPokemon.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default;

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
      const types: ITypesPokemonsReponse = await axiosInstance.get(
        `${this.base_url}/type`
      );

      return types.results.map((type) => {
        return { name: type.name };
      });
    } catch (error) {
      return [];
    }
  }

  async find(search: string): Promise<IPokemonsExternal | null> {
    try {
      const pokemon: IPokemonCompleted | null = await axiosInstance.get(
        `${this.base_url}/pokemon/${search}`
      );

      const stats: IStat[] = pokemon!.stats?.map((stat: IStatResponse) => {
        return {
          name: stat.stat.name,
          qnt: stat.base_stat,
        };
      });

      const types: string[] = pokemon!.types.map((type: ITypeResponse) => {
        return type.type.name;
      });
      const abilities: string[] = pokemon!.abilities.map(
        (abilitiy: IAbilitiesResponse) => {
          return abilitiy.ability.name;
        }
      );

      const img_url =
        pokemon!.sprites.versions["generation-v"]["black-white"].animated
          .front_default;

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
      const pokemons: IPokemonByTypeResponse = await axiosInstance.get(
        `${this.base_url}/type/${type}`
      );

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
          const allInformationPokemon: IPokemonCompleted =
            await axiosInstance.get(pokemon.pokemon.url);

          const stats: IStat[] = allInformationPokemon.stats?.map(
            (stat: IStatResponse) => {
              return {
                name: stat.stat.name,
                qnt: stat.base_stat,
              };
            }
          );

          const types: string[] = allInformationPokemon.types.map(
            (type: ITypeResponse) => {
              return type.type.name;
            }
          );

          const abilities: string[] = allInformationPokemon.abilities.map(
            (abilitiy: IAbilitiesResponse) => {
              return abilitiy.ability.name;
            }
          );

          const img_url =
            allInformationPokemon.sprites.versions["generation-v"][
              "black-white"
            ].animated.front_default;

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
            evolutions,
          });
        })
      );

      return {
        pokemons: pokemonsReturn.sort((a,b) => a.id - b.id),
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
      const pokemon: any = await axiosInstance.get(
        `${this.base_url}/pokemon-species/${pokemon_id}`
      );

      const evoluetions: IEvolutionsResponse = await axiosInstance.get(
        pokemon.evolution_chain.url
      );
      const evoluetionsReturn: IEvolutions[] = [
        {
          name: evoluetions.chain.species.name,
          position: 1,
        },
      ];

      if (evoluetions.chain.evolves_to.length > 0) {
        function getEvolutions(
          evolvesTo: IEvolvesToResponse[],
          position: number
        ): void {
          evolvesTo.forEach((evolve) => {
            evoluetionsReturn.push({
              name: evolve.species.name,
              position: position + 1,
            });

            if (evolve.evolves_to.length > 0) {
              getEvolutions(evolve.evolves_to, position + 1);
            }
          });
        }

        getEvolutions(evoluetions.chain.evolves_to, 1);
      }

      return evoluetionsReturn;
    } catch (error) {
      return [];
    }
  }
}

export { PokemonExternalRepository };
