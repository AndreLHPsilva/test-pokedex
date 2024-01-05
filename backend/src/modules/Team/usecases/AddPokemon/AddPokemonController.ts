import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddPokemonValidation } from "./AddPokemonValidation";
import { AddPokemonUseCase } from "./AddPokemonUseCase";
import { PokemonService } from "services/PokemonServices/PokemonService";

class AddPokemonController {
  async handle(req: Request, res: Response) {
    const { external_id } = AddPokemonValidation.validate(req.body);

    const user_id = req.auth_user!.id;
    
    const addPokemonUseCase = container.resolve(AddPokemonUseCase);
    const response = await addPokemonUseCase.execute({ user_id, external_id });

    return res.returnApi({
      data: response,
      statusHTTP: 201,
      message: "Pokemon Adicionado ao time!",
      developerMessage: "Pokemon added",
    });
  }
}

export { AddPokemonController };
