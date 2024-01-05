import { IParamsGetByTypePokemonsDTO } from "../../Api/Pokemon";
import { IPokemons } from "../Pokemon";
import { ITeams } from "../Team";
import { ITypesPokemons } from "../TypesPokemons";

export interface IPokemonsContext {
  pokemons: IPokemonsExternal[];
  typesPokemons: ITypesPokemons[];
  pagination: IPaginationDTO;
  typeSelected: IOptionsTypePokemon | null;
  setTypeSelected: React.Dispatch<
    React.SetStateAction<IOptionsTypePokemon | null>
  >;
  typeSearch: "type" | "others";
  setTypeSearch: React.Dispatch<React.SetStateAction<"type" | "others">>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  specificPokemon: IPokemonsExternal | null;
  setSpecificPokemon: React.Dispatch<
    React.SetStateAction<IPokemonsExternal | null>
  >;
  loadingPokemon: boolean;
  setLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>;
  loadingNames: boolean;
  setLoadingNames: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonNames: IPokemonNames[];
  setPokemonNames: React.Dispatch<React.SetStateAction<IPokemonNames[]>>;
  GetTypesPokemons(): void;
  GetPokemons(data?: IPaginationParamsDTO): void;
  FindPokemon(search: string | number): void;
  GetByTypePokemon(data?: IParamsGetByTypePokemonsDTO): void;
  WhitchRequestSend(data: IPaginationParamsDTO): void;
  ClearSearchs(): void;
  GetPokemonNames(): void;
}

export interface IPaginationParamsDTO {
  limit: number;
  offset: number;
}

export interface IOptionsTypePokemon {
  label: string | null;
  value: string | null;
}

export interface IResponseGetPokemonsDTO {
  pokemons: IPokemonsExternal[];
  pagination: IPaginationDTO;
}

export interface IPaginationDTO {
  limit: number;
  offset: number;
  total: number;
}

export interface IPokemonsExternal {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  img_url: string;
  basic_img_url: string;
  types: string[];
  stats: IStatsPokemon[];
  abilities: string[];

  evolutions: IEvolutions[];
  TeamsOnPokemons?: ITeamsOnPokemons[];
}

interface IStatsPokemon {
  name: string;
  qnt: number;
}

export interface IEvolutions {
  name: string;
  position: number;
  basic_img_url?: string;
  link_url: string;
}

export interface ITeamsOnPokemons {
  id: string;
  team?: ITeams;
  team_id: string;
  pokemon?: IPokemons;
  pokemon_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPokemonNames {
  name: string;
}
