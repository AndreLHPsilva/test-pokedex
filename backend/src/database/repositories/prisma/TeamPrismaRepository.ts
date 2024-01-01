import { prisma } from ".";
import { ICreateTeamDTO, ITeamRepository } from "../ITeamRepository";
import { ITeams } from "@models/Teams";

class TeamPrismaRepository implements ITeamRepository {
  constructor(private repository = prisma.team) {}

  async find(team_id: string): Promise<ITeams | null> {
    return await this.repository.findFirst({
      where: { id: team_id },
      include: {
        TeamsOnPokemons: {
          include: {
            pokemon: true
          }
        }
      },
    });
  }

  async findByUserId(user_id: string): Promise<ITeams | null> {
    return await this.repository.findFirst({
      where: {
        user_id,
      },
      include: {
        TeamsOnPokemons: {
          include: {
            pokemon: true
          }
        }
      },
    });
  }

  async create({ name, user_id }: ICreateTeamDTO): Promise<ITeams> {
    return await this.repository.create({
      data: {
        name,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  }
}

export { TeamPrismaRepository };
