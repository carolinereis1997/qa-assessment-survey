import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PesquisaCreateInputSchema,
  PesquisaCreateOutputSchema,
} from "../../../schema/pesquisa-create.schema";
import type { PerguntaTipo } from "../../../types/others";
import { PerguntaItem } from "./pergunta-item";

const novaPergunta = {
  nome: "",
  tipo: undefined as unknown as PerguntaTipo,
  respostaObrigatoria: false,
  justificarResposta: false,
  permitirOutro: false,
  opcoes: [],
};

type TPesquisaForm = {
  formMethods: UseFormReturn<
    PesquisaCreateInputSchema,
    unknown,
    PesquisaCreateOutputSchema
  >;
};

export function PesquisaForm({ formMethods }: TPesquisaForm) {
  const {
    control,
    formState: { errors },
  } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "perguntas",
  });

  return (
    <div className="flex flex-col gap-6">
      <Input
        control={control}
        name="nome"
        label="Título *"
        placeholder="Título da pesquisa"
        data-test-id="pesquisa-nome-input"
        helperText={errors.nome?.message}
      />

      <Textarea
        control={control}
        name="descricao"
        label="Descrição"
        placeholder="Descrição da pesquisa"
        data-test-id="pesquisa-descricao-input"
        helperText={errors.descricao?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          control={control}
          name="dataLancamento"
          label="Data de lançamento *"
          data-test-id="pesquisa-dataLancamento"
          helperText={errors.dataLancamento?.message}
        />
        <DatePicker
          control={control}
          name="dataEncerramento"
          label="Data de encerramento"
          data-test-id="pesquisa-dataEncerramento"
          helperText={errors.dataEncerramento?.message}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Perguntas</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-test-id="add-pergunta-button"
            onClick={() => append(novaPergunta)}
          >
            Adicionar pergunta
          </Button>
        </div>

        {typeof errors.perguntas?.message === "string" && (
          <span data-test-id="perguntas-error" className="text-xs text-red-600">
            {errors.perguntas.message}
          </span>
        )}

        {fields.map((field, index) => (
          <PerguntaItem
            key={field.id}
            control={control}
            errors={errors}
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </div>
    </div>
  );
}
