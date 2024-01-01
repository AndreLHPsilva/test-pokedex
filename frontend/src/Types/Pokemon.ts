import { ITeamsOnPokemons } from "./PokemonsContext/PokemonsContext";

export interface IPokemons {
  id: string;
  name: string;
  external_id: number;
  created_at: Date;
  updated_at: Date;

  teamsOnPokemons?: ITeamsOnPokemons[];
}
