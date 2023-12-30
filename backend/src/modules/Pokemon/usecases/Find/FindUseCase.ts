import { ApiError } from "../../../../errors/ApiError";
import { inject, injectable } from "tsyringe";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";

@injectable()
class FindUseCase {
  constructor(
    @inject("PokemonExternalRepository")
    private pokemonRepository: IPokemonExternalApiRepository
  ) {}

  async execute(search: string): Promise<IPokemonsExternal> {
    const pokemon = await this.pokemonRepository.find(search);

    if (!pokemon) throw new ApiError("Pokemon não encontrado!");

    return pokemon;
  }
}

export { FindUseCase };
