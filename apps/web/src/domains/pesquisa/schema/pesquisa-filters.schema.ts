import { z } from "zod";

export const pesquisaFiltersSchema = z.object({
  status: z.enum(["ativo", "inativo"]).nullish(),
});

export type PesquisaFiltersInputSchema = z.input<typeof pesquisaFiltersSchema>;
export type PesquisaFiltersOutputSchema = z.output<typeof pesquisaFiltersSchema>;
