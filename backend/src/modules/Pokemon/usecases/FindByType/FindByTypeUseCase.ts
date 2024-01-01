import { inject, injectable } from "tsyringe";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";

@injectable()
class FindByTypeUseCase {
  constructor(
    @inject("PokemonExternalRepository")
    private pokemonRepository: IPokemonExternalApiRepository
  ) {}

  async execute(type: string): Promise<IPokemonsExternal[]> {
    return await this.pokemonRepository.findByType(type);
  }
}

export { FindByTypeUseCase };
