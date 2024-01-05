import { inject, injectable } from "tsyringe";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";
import { ITypesPokemons } from "@models/TypesPokemons";

@injectable()
class GetTypesUseCase {
  constructor(
    @inject("PokemonExternalRepository")
    private pokemonRepository: IPokemonExternalApiRepository
  ) {}

  async execute(): Promise<ITypesPokemons[]> {
    return await this.pokemonRepository.getTypes();
  }
}

export { GetTypesUseCase };
