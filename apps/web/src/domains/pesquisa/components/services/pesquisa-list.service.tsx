import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useSearchParams } from "react-router-dom";
import { env } from "@/config/env";
import { pesquisaGateway } from "../../infra/gateways";
import {
  pesquisaFiltersSchema,
  PesquisaFiltersInputSchema,
  PesquisaFiltersOutputSchema,
} from "../../schema/pesquisa-filters.schema";
import type {
  PesquisaFilters,
  PesquisaStatus,
} from "../../types/dtos/pesquisa.dto";
import type { Order, OrderBy } from "../../types/others";
import { PesquisaListView } from "../views/pesquisa-list.view";

type TPesquisaListService = {
  navigate: NavigateFunction;
};

export function PesquisaListService({ navigate }: TPesquisaListService) {
  const [searchParams] = useSearchParams();

  const queries = useMemo<PesquisaFilters>(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      ordination: (searchParams.get("ordination") || "desc") as Order,
      orderBy: (searchParams.get("orderBy") || "nome") as OrderBy,
      status: searchParams.get("status") as PesquisaStatus | null,
      empresaId: env.empresaId,
    };
  }, [searchParams]);

  const formFilters = useForm<
    PesquisaFiltersInputSchema,
    unknown,
    PesquisaFiltersOutputSchema
  >({
    resolver: zodResolver(pesquisaFiltersSchema),
    defaultValues: { status: queries.status },
  });

  const {
    data: pesquisas,
    isLoading,
    isError,
  } = useQuery(
    ["pesquisas", queries],
    async () => pesquisaGateway.listPesquisas(queries),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <PesquisaListView
      pesquisas={pesquisas}
      loading={isLoading}
      isError={isError}
      navigate={navigate}
      page={queries.page}
      formFilters={formFilters}
    />
  );
}
