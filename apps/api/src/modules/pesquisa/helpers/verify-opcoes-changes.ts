import { Prisma } from "@prisma/client";
import { UpdatePesquisaDto } from "../dtos/update-pesquisa.dto";

type PerguntaWithId = UpdatePesquisaDto["perguntas"][number] & { id: number };
type PerguntaWithOpcoes = Prisma.perguntaGetPayload<{
  include: { opcoes: true };
}>;

export interface OpcoesChanges {
  deletedOpcoesIds: number[];
  newOpcoes: { perguntaId: number; texto: string }[];
  updatedOpcoes: { id: number; texto: string }[];
}

// compara as opções do payload com as do banco e separa em 3 grupos:
// - novas (sem id);
// - removidas (id não consta no payload);
// - alteradas (id ainda existe, mas o texto mudou).
export function verifyOpcoesChanges(
  perguntasRetained: PerguntaWithId[],
  existing: PerguntaWithOpcoes[],
): OpcoesChanges {
  const deletedOpcoesIds: number[] = [];
  const newOpcoes: { perguntaId: number; texto: string }[] = [];
  const updatedOpcoes: { id: number; texto: string }[] = [];

  for (const pergunta of perguntasRetained) {
    const existingPergunta = existing.find((item) => item.id === pergunta.id);
    if (!existingPergunta) continue;

    const incomingIds = new Set(
      pergunta.opcoes
        .filter((opcao) => opcao.id !== undefined)
        .map((opcao) => opcao.id),
    );

    for (const opcao of pergunta.opcoes) {
      if (opcao.id === undefined) {
        newOpcoes.push({ perguntaId: pergunta.id, texto: opcao.texto });
        continue;
      }

      const existingOpcao = existingPergunta.opcoes.find(
        (item) => item.id === opcao.id,
      );
      if (existingOpcao && existingOpcao.texto !== opcao.texto) {
        updatedOpcoes.push({ id: opcao.id, texto: opcao.texto });
      }
    }

    for (const existingOpcao of existingPergunta.opcoes) {
      if (!incomingIds.has(existingOpcao.id)) {
        deletedOpcoesIds.push(existingOpcao.id);
      }
    }
  }

  return { deletedOpcoesIds, newOpcoes, updatedOpcoes };
}
