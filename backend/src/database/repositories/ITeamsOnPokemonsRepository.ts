import { ITeamsOnPokemons } from "@models/TeamsOnPokemons";

export interface ICreateTeamsOnPokemonsDTO{
  pokemon_id: string;
  team_id: string;
}

export interface ITeamsOnPokemonsRepository{
  create(data: ICreateTeamsOnPokemonsDTO): Promise<ITeamsOnPokemons>;
  remove(teamOnPokemon_id: string): Promise<void>;
  getByTeamId(team_id: string): Promise<ITeamsOnPokemons[]>;
}