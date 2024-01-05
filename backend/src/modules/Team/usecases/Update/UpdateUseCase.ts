import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { ITeams } from "@models/Teams";
import { ApiError } from "@errors/ApiError";

interface IRequestDTO {
  team_id: string;
  name: string;
}

@injectable()
class UpdateUseCase {
  constructor(
    @inject("TeamRepository") private teamRepository: ITeamRepository
  ) {}

  async execute({ name, team_id }: IRequestDTO): Promise<ITeams> {
    const team = await this.teamRepository.find(team_id);

    if (!team) {
      throw new ApiError("Time não encontrado.");
    }

    const teamUpdated = await this.teamRepository.update({ name, team_id });

    const pokemons = teamUpdated.TeamsOnPokemons?.map((teamOnPokemon) => {
      return teamOnPokemon.pokemon!;
    })?.sort((a, b) => a.external_id - b.external_id);

    delete teamUpdated.TeamsOnPokemons;

    return {
      pokemons,
      ...teamUpdated,
    };
  }
}

export { UpdateUseCase };
