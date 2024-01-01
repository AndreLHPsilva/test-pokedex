import { inject, injectable } from "tsyringe";
import { IPokemonExternalApiRepository, IResponsePaginationPokemonsDTO } from "@database/repositories/IPokemonExternalApiRepository";

interface IRequestDTO{
  type: string;
  limit: number;
  offset: number;
}

@injectable()
class FindByTypeUseCase {
  constructor(
    @inject("PokemonExternalRepository")
    private pokemonRepository: IPokemonExternalApiRepository
  ) {}

  async execute(data: IRequestDTO): Promise<IResponsePaginationPokemonsDTO> {
    return await this.pokemonRepository.findByType(data);
  }
}

export { FindByTypeUseCase };
