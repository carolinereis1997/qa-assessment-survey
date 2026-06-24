import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import Table from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import { NavigateFunction, useSearchParams } from "react-router-dom";
import { PesquisaList } from "../../infra/entities/pesquisa-list.entity";
import { Pesquisa } from "../../infra/entities/pesquisa.entity";
import {
  PesquisaFiltersInputSchema,
  PesquisaFiltersOutputSchema,
} from "../../schema/pesquisa-filters.schema";

type TPesquisaListView = {
  pesquisas?: PesquisaList;
  loading: boolean;
  isError: boolean;
  navigate: NavigateFunction;
  page: number;
  formFilters: UseFormReturn<
    PesquisaFiltersInputSchema,
    unknown,
    PesquisaFiltersOutputSchema
  >;
};

export function PesquisaListView({
  pesquisas,
  loading,
  isError,
  navigate,
  page,
  formFilters,
}: Readonly<TPesquisaListView>) {
  const [, setSearchParams] = useSearchParams();

  const columns: ColumnDef<Pesquisa>[] = [
    {
      id: "nome",
      header: "Nome",
      cell: ({ row }) => (
        <span
          data-test-id={`pesquisa-nome-${row.id}`}
          className="font-medium text-zinc-800"
        >
          {row.original.props.nome}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.getStatus();
        return (
          <Badge
            data-test-id={`pesquisa-status-${row.id}`}
            variant={status.color === "green" ? "success" : "secondary"}
          >
            {status.label}
          </Badge>
        );
      },
    },
    {
      id: "periodo",
      header: "Período",
      cell: ({ row }) => (
        <span
          data-test-id={`pesquisa-periodo-${row.id}`}
          className="text-zinc-600"
        >
          {row.original.getPeriodo()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-4">
          <Button
            data-test-id={`pesquisa-edit-button-${row.id}`}
            variant="outline"
            size="sm"
            onClick={() => navigate(`/pesquisas/editar/${row.original.id}`)}
          >
            Editar
          </Button>

          <Button
            data-test-id={`pesquisa-public-button-${row.id}`}
            variant="outline"
            size="sm"
            onClick={() => navigate(`/pesquisas/resposta/${row.original?.props?.idPublico}`)}
          >
            Responder
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Pesquisas</h1>
          <p className="text-sm text-zinc-500">Pesquisas de clima da empresa</p>
        </div>
        <Button
          data-test-id="pesquisa-create-button"
          onClick={() => navigate("/pesquisas/criar")}
        >
          Nova pesquisa
        </Button>
      </header>

      <div className="flex w-56 flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Status</label>
        <Select
          data-test-id="pesquisa-status-filter"
          name="status"
          control={formFilters.control}
          placeholder="Selecione o status"
          options={[
            { value: "ativo", label: "Ativa" },
            { value: "inativo", label: "Inativa" },
          ]}
          onChangeCapture={(value) =>
            setSearchParams((params) => {
              if (value) params.set("status", value);
              else params.delete("status");
              params.set("page", "1");
              return params;
            })
          }
        />
      </div>

      {isError && (
        <p data-test-id="pesquisa-list-error" className="text-sm text-red-600">
          Erro ao carregar as pesquisas.
        </p>
      )}

      <Table
        page={page}
        pages={pesquisas?.pages}
        data={pesquisas?.items}
        loading={loading}
        columns={columns}
      />
    </div>
  );
}
