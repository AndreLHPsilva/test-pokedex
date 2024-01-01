import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByTypeValidation } from "./FindByTypeValidation";
import { FindByTypeUseCase } from "./FindByTypeUseCase";


class FindByTypeController {
  async handle(req: Request, res: Response) {
    const { type } = FindByTypeValidation.validate(req.params);

    const findByTypeUseCase = container.resolve(FindByTypeUseCase);
    const response = await findByTypeUseCase.execute(type);
    
    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Pokemons encontrados",
      developerMessage: "Pokemons foundeds",
    });
  }
}

export { FindByTypeController };
