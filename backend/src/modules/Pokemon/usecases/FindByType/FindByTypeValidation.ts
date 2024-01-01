import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  type: string;
}

class FindByTypeValidation {
  static validate(data: any): IData {
    const getPokemonSchema = z.object({
      type: z
        .string({
          required_error: "type é obrigatorio",
          invalid_type_error: "type deve ser uma string",
        })
        .min(1, { message: "O type deve ter pelo menos 1 caracter" }),
    });

    const validatedeDate = getPokemonSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { FindByTypeValidation };
