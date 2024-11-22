import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const userContract = c.router({
  registerUser: {
    method: "POST",
    path: "/user/register",
    summary: "Create new user in system",
    responses: {
      201: c.type<{ message: string }>(),
      400: c.type<{ error: string }>(),
    },
    body: z.object({
      username: z
        .string()
        .min(3, "O campo username precisa ter no mínimo 3 caracteres")
        .max(20, "O campo username precisa ter no máximo 20 caracteres")
        .regex(
          /^[a-zA-Z0-9._-]+$/,
          "O campo username contém caracteres inválidos",
        ),
      email: z
        .string()
        .email("O campo email precisa ser um email válido")
        .min(1, "O campo email precisa ser preenchido"),
      password: z
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .max(25, "A senha deve ter no máximo 25 caracteres")
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial",
        ),
    }),
  },
});
