import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const documentContract = c.router({
  addDocument: {
    method: "POST",
    path: "/document/new",
    summary: "Add new document in system",
    responses: {
      201: c.type<{ message: string }>(),
      400: c.type<{ error: string }>(),
    },
    body: z.object({
      tipo_documento: z.string(),
      valor_tributo: z.number(),
      valor_liquido: z.number(),
    }),
  },
});
