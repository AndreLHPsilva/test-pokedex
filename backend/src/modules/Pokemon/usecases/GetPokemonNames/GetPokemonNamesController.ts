import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPokemonNamesUseCase } from "./GetPokemonNamesUseCase";

class GetPokemonNamesController {
  async handle(req: Request, res: Response) {
    const getPokemonNamesUseCase = container.resolve(GetPokemonNamesUseCase);
    const response = await getPokemonNamesUseCase.execute();

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Lista de nomes dos pokemons",
      developerMessage: "List pokemons names",
    });
  }
}

export { GetPokemonNamesController };
