import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  pokemon_id: string;
  team_id: string;
}

class RemovePokemonValidation {
  static validate(data: any): IData {
    const removePokemonUserSchema = z.object({
      pokemon_id: z
        .string({
          required_error: "Parâmetro pokemon_id é obrigatório.",
          invalid_type_error:
            "Parâmetro pokemon_id deve ser do tipo string ou number",
        })
        .min(1, {
          message: "Parâmetro pokemon_id deve ter pelo menos 1 caracter",
        }),
      team_id: z
        .string({
          required_error: "Parâmetro team_id é obrigatório.",
          invalid_type_error: "Parâmetro team_id deve ser do tipo string",
        })
        .min(1, {
          message: "Parâmetro team_id deve ter pelo menos 1 caracter",
        }),
    });

    const validatedeDate = removePokemonUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { RemovePokemonValidation };
