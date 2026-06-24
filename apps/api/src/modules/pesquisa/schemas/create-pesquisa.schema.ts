import { pergunta_tipo } from "@prisma/client";
import z from "zod";

export const createPesquisaSchema = z.object({
  empresaId: z.string().min(1),
  nome: z.string().min(1),
  descricao: z.string().optional(),
  dataLancamento: z
    .string()
    .datetime()
    .transform((value) => new Date(value)),
  dataEncerramento: z
    .string()
    .datetime()
    .transform((value) => new Date(value))
    .nullable()
    .optional(),
  perguntas: z
    .array(
      z.object({
        nome: z.string().min(1),
        tipo: z.nativeEnum(pergunta_tipo),
        respostaObrigatoria: z.boolean().optional().default(false),
        justificarResposta: z.boolean().optional().default(false),
        permitirOutro: z.boolean().optional().default(false),
        opcoes: z.array(z.string().min(1)).optional().default([]),
      }),
    )
    .min(1),
});
