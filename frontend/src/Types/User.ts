export interface IPokemon{
  id: string,
  name: string,
  external_id: number,
  img_url: string,
  created_at: Date,
  updated_at: Date
}

export interface ITeam{
  id: string,
  name: string,
  created_at: Date,
  updated_at: Date,
  user_id: string,
  pokemons: IPokemon[]
}

export interface IUser{
  id: string,
  name: string,
  email: string,
  created_at: Date,
  updated_at: Date,
  team: ITeam;
}