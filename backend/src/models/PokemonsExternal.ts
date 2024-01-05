import { IEvolutions } from "./Evoluetions";
import { ITeamsOnPokemons } from "./TeamsOnPokemons";

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
