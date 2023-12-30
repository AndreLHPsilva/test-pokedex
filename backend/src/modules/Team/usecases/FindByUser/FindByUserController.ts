import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByUserUseCase } from "./FindByUserUseCase";


class FindByUserController {
  async handle(req: Request, res: Response) {

    const user_id = req.auth_user!.id;

    const findByUserUseCase = container.resolve(FindByUserUseCase);
    const response = await findByUserUseCase.execute(user_id);

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Time encontrado!",
      developerMessage: "Team founded",
    });
  }
}

export { FindByUserController };
