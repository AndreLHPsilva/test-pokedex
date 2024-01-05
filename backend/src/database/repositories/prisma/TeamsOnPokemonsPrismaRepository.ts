import { prisma } from ".";
import {
  ICreateTeamsOnPokemonsDTO,
  ITeamsOnPokemonsRepository,
} from "../ITeamsOnPokemonsRepository";
import { ITeamsOnPokemons } from "@models/TeamsOnPokemons";

class TeamsOnPokemonsPrismaRepository implements ITeamsOnPokemonsRepository {
  constructor(private repository = prisma.teamsOnPokemons) {}

  async create({
    pokemon_id,
    team_id,
  }: ICreateTeamsOnPokemonsDTO): Promise<ITeamsOnPokemons> {
    return await this.repository.create({
      data: {
        pokemon: {
          connect: {
            id: pokemon_id,
          },
        },
        team: {
          connect: {
            id: team_id,
          },
        },
      },
    });
  }

  async remove(teamOnPokemon_id: string): Promise<void> {
    await this.repository.delete({
      where: { id: teamOnPokemon_id },
    });
  }

  async getByTeamId(team_id: string): Promise<ITeamsOnPokemons[]> {
    return (await this.repository.findMany({
      where: {
        team_id,
      },
      include: {
        pokemon: true,
      },
    })) as ITeamsOnPokemons[];
  }
}

export { TeamsOnPokemonsPrismaRepository };
