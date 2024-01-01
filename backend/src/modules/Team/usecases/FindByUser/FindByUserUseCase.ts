import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { ITeams } from "@models/Teams";
import { ApiError } from "@errors/ApiError";

@injectable()
class FindByUserUseCase {
  constructor(
    @inject("TeamRepository") private teamRepository: ITeamRepository
  ) {}

  async execute(user_id: string): Promise<ITeams> {
    const team = await this.teamRepository.findByUserId(user_id);

    if (!team) {
      throw new ApiError("Time não encontrado.");
    }

    const pokemons = team.TeamsOnPokemons?.map((teamOnPokemon) => {
      return teamOnPokemon.pokemon!;
    }).sort((a, b) => a.external_id - b.external_id);

    delete team.TeamsOnPokemons;

    return {
      pokemons,
      ...team,
    };
  }
}

export { FindByUserUseCase };
