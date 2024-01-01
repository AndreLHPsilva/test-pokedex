import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  name: string;
}

class CreateValidation {
  static validate(data: IData): IData {
    const createUserSchema = z.object({
      name: z
        .string({
          required_error: "Nome é obrigatorio",
          invalid_type_error: "Nome deve ser uma string",
        })
        .min(1, { message: "O nome deve ter pelo menos 1 caracter" })
        .trim(),
    });

    const validatedeDate = createUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { CreateValidation };
