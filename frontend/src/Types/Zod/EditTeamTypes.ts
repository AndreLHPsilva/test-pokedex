import { z } from "zod";

export const editTeamSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Informe um nome válido.",
      required_error: "Nome é obrigatório.",
    })
    .min(3, { message: "Nome do time deve ter pelo menos 3 caracteres." })
    .trim(),
});

export type TypeEditTeamDataProps = z.infer<typeof editTeamSchema>;
