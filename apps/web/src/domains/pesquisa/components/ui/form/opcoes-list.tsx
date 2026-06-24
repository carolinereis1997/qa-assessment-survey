import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PesquisaCreateInputSchema } from "../../../schema/pesquisa-create.schema";

type TOpcoesList = {
  control: Control<PesquisaCreateInputSchema>;
  errors: FieldErrors<PesquisaCreateInputSchema>;
  perguntaIndex: number;
};

export function OpcoesList({ control, errors, perguntaIndex }: TOpcoesList) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `perguntas.${perguntaIndex}.opcoes`,
  });

  const opcoesError = errors.perguntas?.[perguntaIndex]?.opcoes;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700">Opções</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-test-id={`add-opcao-button-${perguntaIndex}`}
          onClick={() => append({ texto: "" })}
        >
          Adicionar opção
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <Input
              control={control}
              name={`perguntas.${perguntaIndex}.opcoes.${index}.texto`}
              placeholder={`Opção ${index + 1}`}
              data-test-id={`opcao-input-${perguntaIndex}-${index}`}
              helperText={
                errors.perguntas?.[perguntaIndex]?.opcoes?.[index]?.texto
                  ?.message
              }
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-test-id={`remove-opcao-button-${perguntaIndex}-${index}`}
            onClick={() => remove(index)}
          >
            Remover
          </Button>
        </div>
      ))}

      {typeof opcoesError?.message === "string" && (
        <span className="text-xs text-red-600">{opcoesError.message}</span>
      )}
    </div>
  );
}
