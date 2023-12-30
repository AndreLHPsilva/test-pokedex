import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  external_id: number;
}

class AddPokemonValidation {
  static validate(data: IData): IData {
    const addPokemonUserSchema = z.object({
      external_id: z
        .number({
          required_error:
            "external_id é obrigatório e deve ser do tipo numérico",
          invalid_type_error: "external_id deve ser do tipo numérico",
        })
        .min(1, { message: "Valor mínimo para external_id é 1" })
    });

    const validatedeDate = addPokemonUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { AddPokemonValidation };
