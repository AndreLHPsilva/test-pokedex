import { ITeamRepository } from "@database/repositories/ITeamRepository";
import { inject, injectable } from "tsyringe";
import { ITeams } from "@models/Teams";
import { ApiError } from "@errors/ApiError";

interface ICreateDTO {
  name: string;
  user_id: string;
}

@injectable()
class CreateUseCase {
  constructor(
    @inject("TeamRepository") private teamRepository: ITeamRepository
  ) {}

  async execute({ name, user_id }: ICreateDTO): Promise<ITeams> {
    const verifyAlreadyExistsTeam = await this.teamRepository.findByUserId(
      user_id
    );

    if (!!verifyAlreadyExistsTeam) {
      throw new ApiError("Usuário já tem um time criado!");
    }

    const responseTeam = await this.teamRepository.create({
      name,
      user_id,
    });
    responseTeam.pokemons = [];

    return responseTeam;
  }
}

export { CreateUseCase };
