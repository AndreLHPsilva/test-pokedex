import { ITeam } from "../Types/User";

export function VerifyTeamFull(team: ITeam|null){

  if(!team){
    return false;
  }

  return team.pokemons.length == 5;
}