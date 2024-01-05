import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemonService } from "./Contracts/IPokemonService";
import { axiosInstance } from "@config/axios";
import {
  IEvolutionsResponse,
  IGetAllPokemonsDTO,
  IPokemonByTypeResponse,
  IPokemonCompleted,
  IPokemonSpeciesResponse,
  IResponseGetAllPokemons,
  ITypesPokemonsReponse,
} from "@database/repositories/externalApi/interfaces/IPokemonResponse";
import { ITypesPokemons } from "@models/TypesPokemons";

export class PokemonService implements IPokemonService {
  constructor(
    private base_url = process.env.POKE_URL ?? "https://pokeapi.co/api/v2"
  ) {}
  
  async getTypes(): Promise<ITypesPokemonsReponse> {
    try {
      return await axiosInstance.get(
        `${this.base_url}/type`
      );

    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar tipos dos pokemons"
      );
    }
  }
  
  async getPokemonSpecies(pokemon_id: number): Promise<IPokemonSpeciesResponse> {
    try {
      return await axiosInstance.get(
        `${this.base_url}/pokemon-species/${pokemon_id}`
      );
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar pokemons"
      );
    }
  }

  async getEvolutions(url: string): Promise<IEvolutionsResponse> {
    try {
      return await axiosInstance.get(url);
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar evoluções"
      );
    }
  }

  async findByUrl(url: string): Promise<IPokemonCompleted> {
    try {
      return await axiosInstance.get(url);
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar pokemons"
      );
    }
  }

  async getAllPokemons({
    limit,
    offset,
  }: IGetAllPokemonsDTO): Promise<IResponseGetAllPokemons> {
    try {
      return (await axiosInstance.get(
        `${this.base_url}/pokemon?limit=${limit}&offset=${offset}`
      )) satisfies IResponseGetAllPokemons;
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar pokemons"
      );
    }
  }
  
  async find(search: string): Promise<IPokemonCompleted | null> {
    try {
      return await axiosInstance.get(
        `${this.base_url}/pokemon/${search}`
      );
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar pokemon"
      );
    }
  }

  async findByType(type: string): Promise<IPokemonByTypeResponse> {
    try {
      return await axiosInstance.get(
        `${this.base_url}/type/${type}`
      );
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.message : "Erro ao buscar pokemon"
      );
    }
  }
}
