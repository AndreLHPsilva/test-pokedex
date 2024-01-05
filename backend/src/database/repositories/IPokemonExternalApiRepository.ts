import { IEvolutions } from "@models/Evoluetions";
import { IPokemonNames } from "@models/PokemonNames";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { ITypesPokemons } from "@models/TypesPokemons";

export interface IGetPokemonsDTO {
  limit: number;
  offset: number;
}

export interface IResponsePaginationPokemonsDTO {
  pokemons: IPokemonsExternal[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface IFindByTypeDTO{
  type: string;
  limit: number;
  offset: number;
}

export interface IPokemonExternalApiRepository {
  get(data: IGetPokemonsDTO): Promise<IResponsePaginationPokemonsDTO>;
  getTypes(): Promise<ITypesPokemons[]>;
  getPokemonNames(): Promise<IPokemonNames[]>;
  find(search: string | number): Promise<IPokemonsExternal | null>;
  findByType(data: IFindByTypeDTO): Promise<IResponsePaginationPokemonsDTO>;
  findEvolutions(external_id: number): Promise<IEvolutions[]>;
}
