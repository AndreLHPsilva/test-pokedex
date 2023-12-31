import { ITeams } from "./Teams";

export interface IUsers {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;

  team?: ITeams;
}
