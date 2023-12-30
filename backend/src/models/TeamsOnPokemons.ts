import { IPokemons } from "./Pokemons";
import { ITeams } from "./Teams";

export interface ITeamsOnPokemons {
  id: string;
  team?: ITeams;
  team_id: string;
  pokemon?: IPokemons;
  pokemon_id: string;
  created_at: Date;
  updated_at: Date;
}
