import { inject, injectable } from "tsyringe";
import { IPokemonsExternal } from "@models/PokemonsExternal";
import { IPokemonExternalApiRepository } from "@database/repositories/IPokemonExternalApiRepository";

interface IGetDTO {
  limit: number;
  offset: number;
}

@injectable()
class GetUseCase {
  constructor(
    @inject("PokemonExternalRepository")
    private pokemonRepository: IPokemonExternalApiRepository
  ) {}

  async execute(data: IGetDTO): Promise<IPokemonsExternal[]> {
    return await this.pokemonRepository.get(data);
  }
}

export { GetUseCase };
