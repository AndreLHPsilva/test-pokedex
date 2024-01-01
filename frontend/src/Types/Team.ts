import { IPokemons } from "./Pokemon";
import { ITeamsOnPokemons } from "./PokemonsContext/PokemonsContext";
import { IUser } from "./User";

export interface ITeams {
  id: string;
  name: string;
  user?: IUser;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  TeamsOnPokemons?: ITeamsOnPokemons[]
  pokemons?: IPokemons[]
}
