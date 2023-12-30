import { IEvolutions } from "@models/Evoluetions";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { ITypesPokemons } from "@models/TypesPokemons";

export interface IGetPokemonsDTO {
  limit: number;
  offset: number;
}

export interface IPokemonExternalApiRepository {
  get(data: IGetPokemonsDTO): Promise<IPokemonsExternal[]>;
  getTypes(): Promise<ITypesPokemons[]>;
  find(search: string | number): Promise<IPokemonsExternal | null>;
  findByType(type: string): Promise<IPokemonsExternal[]>;
  findEvolutions(external_id: number): Promise<IEvolutions[]>;
}
