import { ITeams } from "@models/Teams";

export interface ICreateTeamDTO {
  name: string;
  user_id: string;
}

export interface ITeamRepository {
  create(data: ICreateTeamDTO): Promise<ITeams>;
  findByUserId(user_id: string): Promise<ITeams|null>;
  find(team_id: string): Promise<ITeams|null>;
}
