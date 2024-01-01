import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Informe um nome válido.",
      required_error: "Nome é obrigatório.",
    })
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .trim(),
  email: z
    .string({
      invalid_type_error: "Informe um email válido.",
      required_error: "Email é obrigatório.",
    })
    .email({ message: "Informe um email válido." })
    .min(1, { message: "Informe um email válido." })
    .trim(),
  password: z
    .string({
      invalid_type_error: "Informe uma senha válida.",
      required_error: "Senha é obrigatória",
    })
    .min(9, { message: "Senha deve ter no mínimo 9 caracteres." }),
});

export type TypeRegisterDataProps = z.infer<typeof registerFormSchema>;