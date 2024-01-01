import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateValidation } from "./UpdateValidation";
import { UpdateUseCase } from "./UpdateUseCase";

class UpdateController {
  async handle(req: Request, res: Response) {
    const { team_id, name } = UpdateValidation.validate({
      ...req.params,
      ...req.body,
    });

    const updateUseCase = container.resolve(UpdateUseCase);
    const response = await updateUseCase.execute({ team_id, name });

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Time atualizado!",
      developerMessage: "Team updated",
    });
  }
}

export { UpdateController };
