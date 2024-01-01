import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetValidation } from "./GetValidation";
import { GetUseCase } from "./GetUseCase";

class GetController {
  async handle(req: Request, res: Response) {
    const { limit, offset } = GetValidation.validate(req.query);

    const getUseCase = container.resolve(GetUseCase);
    const response = await getUseCase.execute({
      limit: Number(limit),
      offset: Number(offset)
    });

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Lista de pokemons",
      developerMessage: "List pokemons",
    });
  }
}

export { GetController };
