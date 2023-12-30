import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindValidation } from "./FindValidation";
import { FindUseCase } from "./FindUseCase";


class FindController {
  async handle(req: Request, res: Response) {
    const { team_id } = FindValidation.validate(req.params);

    const findUseCase = container.resolve(FindUseCase);
    const response = await findUseCase.execute(team_id);

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Time encontrado!",
      developerMessage: "Team founded",
    });
  }
}

export { FindController };
