import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindValidation } from "./FindValidation";
import { FindUseCase } from "./FindUseCase";


class FindController {
  async handle(req: Request, res: Response) {
    const { search } = FindValidation.validate(req.params);

    const findUseCase = container.resolve(FindUseCase);
    const response = await findUseCase.execute(search);
    
    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Pokemon encontrado",
      developerMessage: "Pokemon founded",
    });
  }
}

export { FindController };
