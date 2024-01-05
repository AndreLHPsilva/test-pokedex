import { ITeamsOnPokemons } from "./PokemonsContext/PokemonsContext";

export interface IPokemons {
  id: string;
  name: string;
  external_id: number;
  img_url?: string;
  created_at: Date;
  updated_at: Date;

  teamsOnPokemons?: ITeamsOnPokemons[];
}
