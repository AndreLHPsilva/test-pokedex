import { IPokemons } from "./Pokemons";
import { ITeamsOnPokemons } from "./TeamsOnPokemons";
import { IUsers } from "./Users";

export interface ITeams {
  id: string;
  name: string;
  user?: IUsers;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  TeamsOnPokemons?: ITeamsOnPokemons[]
  pokemons?: IPokemons[]
}
