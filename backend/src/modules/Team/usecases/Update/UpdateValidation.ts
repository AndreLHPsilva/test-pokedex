import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  team_id: string;
  name: string;
}

class UpdateValidation {
  static validate(data: any): IData {
    const updateTeamSchema = z.object({
      team_id: z
        .string({
          required_error: "team_id é obrigatório e deve ser do tipo string",
          invalid_type_error: "team_id deve ser do tipo string",
        })
        .min(1, { message: "team_id deve ter pelo menos 1 caracter" }),
      name: z
        .string({
          required_error: "Nome é obrigatorio",
          invalid_type_error: "Nome deve ser uma string",
        })
        .min(1, { message: "O nome deve ter pelo menos 1 caracter" })
        .trim(),
    });

    const validatedeDate = updateTeamSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { UpdateValidation };
