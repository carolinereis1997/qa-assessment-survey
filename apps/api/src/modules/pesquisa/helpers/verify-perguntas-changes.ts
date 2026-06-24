import { pergunta } from "@prisma/client";
import { UpdatePesquisaDto } from "../dtos/update-pesquisa.dto";

type PerguntaPayload = UpdatePesquisaDto["perguntas"][number];
type PerguntaWithId = PerguntaPayload & { id: number };

export interface PerguntasChanges {
  deletedPerguntasIds: number[];
  newPerguntas: PerguntaPayload[];
  updatedPerguntas: PerguntaWithId[];
}

const hasPerguntaChanged = (
  incoming: PerguntaWithId,
  existing: pergunta,
): boolean =>
  incoming.nome !== existing.nome ||
  incoming.tipo !== existing.tipo ||
  incoming.respostaObrigatoria !== existing.respostaObrigatoria ||
  incoming.justificarResposta !== existing.justificarResposta ||
  incoming.permitirOutro !== existing.permitirOutro;

// compara as perguntas do payload com as do banco e separa em 3 grupos:
// - novas (sem id);
// - removidas (id não consta no payload);
// - alteradas (id ainda existe, mas algum campo mudou).
export function verifyPerguntasChanges(
  incoming: PerguntaPayload[],
  existing: pergunta[],
): PerguntasChanges {
  const incomingWithId = incoming.filter(
    (pergunta): pergunta is PerguntaWithId => pergunta.id !== undefined,
  );

  const incomingIds = new Set(incomingWithId.map((pergunta) => pergunta.id));

  const newPerguntas = incoming.filter((pergunta) => pergunta.id === undefined);

  const deletedPerguntasIds = existing
    .filter((pergunta) => !incomingIds.has(pergunta.id))
    .map((pergunta) => pergunta.id);

  const updatedPerguntas = incomingWithId.filter((pergunta) => {
    const existingPergunta = existing.find((item) => item.id === pergunta.id);
    return (
      existingPergunta !== undefined &&
      hasPerguntaChanged(pergunta, existingPergunta)
    );
  });

  return { deletedPerguntasIds, newPerguntas, updatedPerguntas };
}
