import { Control, FieldErrors, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { PesquisaCreateInputSchema } from "../../../schema/pesquisa-create.schema";
import { PERGUNTA_TIPO_OPTIONS, tipoExigeOpcoes } from "../../../types/others";
import { OpcoesList } from "./opcoes-list";

type TPerguntaItem = {
  control: Control<PesquisaCreateInputSchema>;
  errors: FieldErrors<PesquisaCreateInputSchema>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
};

export function PerguntaItem({
  control,
  errors,
  index,
  onRemove,
  canRemove,
}: TPerguntaItem) {
  const tipo = useWatch({ control, name: `perguntas.${index}.tipo` });
  const exigeOpcoes = tipoExigeOpcoes(tipo);
  const perguntaError = errors.perguntas?.[index];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          control={control}
          name={`perguntas.${index}.nome`}
          label="Título da pergunta *"
          placeholder="Insira a pergunta"
          data-test-id={`pergunta-nome-input-${index}`}
          helperText={perguntaError?.nome?.message}
        />
        <Select
          control={control}
          name={`perguntas.${index}.tipo`}
          label="Tipo *"
          placeholder="Selecione o tipo"
          clearable={false}
          options={PERGUNTA_TIPO_OPTIONS}
          data-test-id={`pergunta-tipo-select-${index}`}
          helperText={perguntaError?.tipo?.message}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Checkbox
          control={control}
          name={`perguntas.${index}.respostaObrigatoria`}
          label="Resposta obrigatória"
          data-test-id={`pergunta-respostaObrigatoria-${index}`}
        />
        <Checkbox
          control={control}
          name={`perguntas.${index}.justificarResposta`}
          label="Justificar resposta"
          data-test-id={`pergunta-justificarResposta-${index}`}
        />
        {exigeOpcoes && (
          <Checkbox
            control={control}
            name={`perguntas.${index}.permitirOutro`}
            label='Permitir "outro"'
            data-test-id={`pergunta-permitirOutro-${index}`}
          />
        )}
      </div>

      {exigeOpcoes && (
        <OpcoesList control={control} errors={errors} perguntaIndex={index} />
      )}

      {canRemove && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-test-id={`remove-pergunta-button-${index}`}
            onClick={onRemove}
          >
            Remover pergunta
          </Button>
        </div>
      )}
    </div>
  );
}
