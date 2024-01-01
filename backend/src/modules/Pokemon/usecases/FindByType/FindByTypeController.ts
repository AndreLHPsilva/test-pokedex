import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByTypeValidation } from "./FindByTypeValidation";
import { FindByTypeUseCase } from "./FindByTypeUseCase";

class FindByTypeController {
  async handle(req: Request, res: Response) {
    const { limit, offset, type } = FindByTypeValidation.validate({
      ...req.params,
      ...req.query,
    });

    const findByTypeUseCase = container.resolve(FindByTypeUseCase);
    const response = await findByTypeUseCase.execute({
      type,
      limit: Number(limit),
      offset: Number(offset)
    });

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Pokemons encontrados",
      developerMessage: "Pokemons foundeds",
    });
  }
}

export { FindByTypeController };
