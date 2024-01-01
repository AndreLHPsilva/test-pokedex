import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemovePokemonValidation } from "./RemovePokemonValidation";
import { RemovePokemonUseCase } from "./RemovePokemonUseCase";

class RemovePokemonController {
  async handle(req: Request, res: Response) {
    const { pokemon_id, team_id } = RemovePokemonValidation.validate(
      req.params
    );

    const removePokemonUseCase = container.resolve(RemovePokemonUseCase);
    const response = await removePokemonUseCase.execute({
      team_id,
      pokemon_id,
    });

    return res.returnApi({
      data: response,
      statusHTTP: 200,
      message: "Pokemon removido com sucesso!",
      developerMessage: "Pokemon removed",
    });
  }
}

export { RemovePokemonController };
