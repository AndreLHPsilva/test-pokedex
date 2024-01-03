import { inject, injectable } from "tsyringe";
import { IPokemonExternalApiRepository, IResponseGetPokemonsDTO } from "@database/repositories/IPokemonExternalApiRepository";

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

  async execute(data: IGetDTO): Promise<IResponseGetPokemonsDTO> {
    return await this.pokemonRepository.get(data);
  }
}

export { GetUseCase };
