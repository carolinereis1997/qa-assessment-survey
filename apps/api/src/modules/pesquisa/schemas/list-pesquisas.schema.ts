import { listDefaultQuerySchema } from "src/shared/schemas/list.schema";
import { z } from "zod";

export const listPesquisasQuerySchema = z
  .object({
    status: z.enum(["ativo", "inativo"]).optional(),
    orderBy: z.enum(["nome", "dataLancamento"]).optional().default("nome"),
  })
  .merge(listDefaultQuerySchema);
