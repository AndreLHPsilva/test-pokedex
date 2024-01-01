import { IRemovePokemonDTO, IUpdateTeamDTO } from "../../Api/Team";

export interface ITeamContext {
  CreateTeam(data: ICreateTeamDTO): void;
  AddPokemon(external_id: number): void;
  RemovePokemon(data: IRemovePokemonDTO): void;
  UpdateTeam(data: IUpdateTeamDTO): void;
}

export interface ICreateTeamDTO {
  name: string;
}
