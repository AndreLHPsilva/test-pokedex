import { IEvolutionsResponse, IGetAllPokemonsDTO, IPokemonByTypeResponse, IPokemonCompleted, IPokemonSpeciesResponse, IResponseGetAllPokemons, ITypesPokemonsReponse } from "@database/repositories/externalApi/interfaces/IPokemonResponse";

export interface IPokemonService{
  getPokemonSpecies(pokemon_id: number): Promise<IPokemonSpeciesResponse>;
  getAllPokemons(data: IGetAllPokemonsDTO): Promise<IResponseGetAllPokemons>;
  getEvolutions(url: string): Promise<IEvolutionsResponse>;
  getTypes(): Promise<ITypesPokemonsReponse>;
  find(search: string): Promise<IPokemonCompleted | null>;
  findByUrl(url: string): Promise<IPokemonCompleted>;
  findByType(type: string): Promise<IPokemonByTypeResponse>;
}