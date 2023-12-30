import { Request, Response } from "express";
import { CreateValidation } from "./CreateValidation";
import { container } from "tsyringe";
import { CreateUseCase } from "./CreateUseCase";

class CreateController {
  async handle(req: Request, res: Response) {
    const { name } = CreateValidation.validate(req.body);

    const user_id = req.auth_user!.id;

    const createUseCase = container.resolve( CreateUseCase );
    const response = await createUseCase.execute({ name, user_id });

    return res.returnApi({
      data: response,
      statusHTTP: 201,
      message: "Time criado com sucesso!",
      developerMessage: "Team Created",
    });
  }
}

export { CreateController };
