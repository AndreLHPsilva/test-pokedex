import { prisma } from ".";
import { ICreatePokemonDTO, IPokemonRepository } from "../IPokemonRepository";
import { IPokemons } from "@models/Pokemons";

class PokemonPrismaRepository implements IPokemonRepository {
  constructor(private repository = prisma.pokemon) {}

  async find(pokemon_id: string): Promise<IPokemons | null> {
    return await this.repository.findFirst({
      where: { id: pokemon_id },
    });
  }

  async create(data: ICreatePokemonDTO): Promise<IPokemons> {
    return await this.repository.create({ data });
  }

  async findExternalId(external_id: number): Promise<IPokemons | null> {
    return await this.repository.findFirst({
      where: { external_id },
    });
  }
}

export { PokemonPrismaRepository };
