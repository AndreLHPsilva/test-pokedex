import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { ITeams } from "@models/Teams";
import { ApiError } from "@errors/ApiError";

@injectable()
class FindUseCase {
  constructor(
    @inject("TeamRepository") private teamRepository: ITeamRepository
  ) {}

  async execute(team_id: string): Promise<ITeams> {
    const team = await this.teamRepository.find(team_id);

    if (!team) {
      throw new ApiError("Time não encontrado.");
    }

    const pokemons = team.TeamsOnPokemons?.map((teamOnPokemon) => {
      return teamOnPokemon.pokemon!;
    });

    delete team.TeamsOnPokemons;

    return {
      pokemons,
      ...team,
    };
  }
}

export { FindUseCase };
