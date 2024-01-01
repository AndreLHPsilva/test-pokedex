import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  limit: number;
  offset: number;
}

class GetValidation {
  static validate(data: any): IData {
    const getPokemonSchema = z.object({
      limit: z
        .string({
          required_error: "Parâmetro Limit é obrigatório.",
          invalid_type_error:
            "Parâmetro Limit deve ser do tipo string ou number",
        })
        .refine(
          (value) => {
            const parsedValue = parseInt(value, 10);

            if (isNaN(parsedValue)) return false;

            if (parsedValue <= 0) return false;

            return true;
          },
          {
            message:
              "Parâmetro Limit deve ser um número válido maior que zero.",
          }
        ),
      offset: z
        .string({
          required_error: "Parâmetro offset é obrigatório.",
          invalid_type_error:
            "Parâmetro offset deve ser do tipo string ou number",
        })
        .refine(
          (value) => {
            const parsedValue = parseInt(value, 10);
            return !isNaN(parsedValue);
          },
          { message: "Parâmetro offset deve ser um número válido" }
        ),
    });

    const validatedeDate = getPokemonSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { GetValidation };
