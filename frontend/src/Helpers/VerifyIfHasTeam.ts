import { ITeam } from "../Types/User";

export function VerifyIfHasTeam(team: ITeam | null) {
  return !!team;
}
