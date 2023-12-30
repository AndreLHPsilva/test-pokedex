import { IPokemons } from "@models/Pokemons";

export interface ICreatePokemonDTO {
  name: string;
  external_id: number;
}

export interface IPokemonRepository {
  find(pokemon_id: string): Promise<IPokemons | null>;
  findExternalId(external_id: number): Promise<IPokemons | null>;
  create(data: ICreatePokemonDTO): Promise<IPokemons>;
}
