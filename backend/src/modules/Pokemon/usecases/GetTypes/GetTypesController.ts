import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTypesUseCase } from "./GetTypesUseCase";

class GetTypesController {
  async handle(req: Request, res: Response) {
    const getTypesUseCase = container.resolve(GetTypesUseCase);
    const response = await getTypesUseCase.execute();

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Lista de tipos de pokemons",
      developerMessage: "List pokemons types",
    });
  }
}

export { GetTypesController };
