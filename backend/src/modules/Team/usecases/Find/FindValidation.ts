import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  team_id: string;
}

class FindValidation {
  static validate(data: any): IData {
    const findUserSchema = z.object({
      team_id: z
        .string({
          required_error:
            "team_id é obrigatório e deve ser do tipo string",
          invalid_type_error: "team_id deve ser do tipo string",
        })
        .min(1, { message: "team_id deve ter pelo menos 1 caracter" })
    });

    const validatedeDate = findUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { FindValidation };
