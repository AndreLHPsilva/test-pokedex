import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  search: string;
}

class FindValidation {
  static validate(data: any): IData {
    const getPokemonSchema = z.object({
      search: z
        .string({
          required_error: "Parametro para pesquisa do pokemon é obrigatorio",
          invalid_type_error: "Parametro para pesquisa do pokemon deve ser uma string ou number",
        })
        .min(1, { message: "O Parametro para pesquisa do pokemon deve ter pelo menos 1 caracter" }),
    });

    const validatedeDate = getPokemonSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { FindValidation };
