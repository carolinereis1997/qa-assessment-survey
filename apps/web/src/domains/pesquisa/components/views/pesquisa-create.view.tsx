import { UseFormReturn } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PesquisaCreateInputSchema,
  PesquisaCreateOutputSchema,
} from "../../schema/pesquisa-create.schema";
import { PesquisaForm } from "../ui/form/pesquisa-form";

type TPesquisaCreateView = {
  formMethods: UseFormReturn<
    PesquisaCreateInputSchema,
    unknown,
    PesquisaCreateOutputSchema
  >;
  navigate: NavigateFunction;
  loading: boolean;
  isSubmitError: boolean;
  onSubmit: (data: PesquisaCreateOutputSchema) => Promise<void>;
};

export function PesquisaCreateView({
  formMethods,
  navigate,
  loading,
  isSubmitError,
  onSubmit,
}: Readonly<TPesquisaCreateView>) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-8">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-900">Nova pesquisa</h1>
        <p className="text-sm text-zinc-500">Crie uma pesquisa de clima</p>
      </header>

      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <PesquisaForm formMethods={formMethods} />

        {isSubmitError && (
          <p
            data-test-id="pesquisa-create-error"
            className="text-sm text-red-600"
          >
            Erro ao criar a pesquisa. Verifique os dados e tente novamente.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            data-test-id="cancel-button"
            disabled={loading}
            onClick={() => navigate("/pesquisas")}
          >
            Cancelar
          </Button>
          <Button type="submit" data-test-id="create-button" disabled={loading}>
            {loading ? "Salvando…" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
