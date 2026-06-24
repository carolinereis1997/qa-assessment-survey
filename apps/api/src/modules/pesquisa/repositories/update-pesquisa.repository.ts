import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { OpcoesChanges } from "../helpers/verify-opcoes-changes";
import { PerguntasChanges } from "../helpers/verify-perguntas-changes";

interface UpdatePesquisaInput {
  empresaId: string;
  nome: string;
  descricao?: string | null;
  dataLancamento: Date;
  dataEncerramento?: Date | null;
  estaAtiva: boolean;
  perguntasChanges: PerguntasChanges;
  opcoesChanges: OpcoesChanges;
}

@Injectable()
export class UpdatePesquisaRepository {
  constructor(private readonly prisma: PrismaService) {}

  execute(id: string, input: UpdatePesquisaInput) {
    const now = new Date();
    const { perguntasChanges, opcoesChanges, ...pesquisa } = input;

    return this.prisma.$transaction(async (tx) => {
      // perguntas removidas: soft-delete da pergunta e das opções e respostas ligadas a ela
      if (perguntasChanges.deletedPerguntasIds.length > 0) {
        await tx.pergunta.updateMany({
          where: { id: { in: perguntasChanges.deletedPerguntasIds } },
          data: { deletedAt: now },
        });

        await tx.opcao.updateMany({
          where: { perguntaId: { in: perguntasChanges.deletedPerguntasIds } },
          data: { deletedAt: now },
        });

        await tx.resposta.updateMany({
          where: { perguntaId: { in: perguntasChanges.deletedPerguntasIds } },
          data: { deletedAt: now },
        });
      }

      // perguntas que continuam existindo e tiveram algum campo alterado
      await Promise.all(
        perguntasChanges.updatedPerguntas.map((pergunta) =>
          tx.pergunta.update({
            where: { id: pergunta.id },
            data: {
              nome: pergunta.nome,
              tipo: pergunta.tipo,
              respostaObrigatoria: pergunta.respostaObrigatoria,
              justificarResposta: pergunta.justificarResposta,
              permitirOutro: pergunta.permitirOutro,
            },
          }),
        ),
      );

      // perguntas novas
      for (const pergunta of perguntasChanges.newPerguntas) {
        await tx.pergunta.create({
          data: {
            pesquisaId: id,
            nome: pergunta.nome,
            tipo: pergunta.tipo,
            respostaObrigatoria: pergunta.respostaObrigatoria,
            justificarResposta: pergunta.justificarResposta,
            permitirOutro: pergunta.permitirOutro,
            opcoes: {
              create: pergunta.opcoes.map((opcao) => ({ texto: opcao.texto })),
            },
          },
        });
      }

      // opções removidas de perguntas mantidas: soft-delete da opção e das respostas que apontavam para ela
      if (opcoesChanges.deletedOpcoesIds.length > 0) {
        await tx.opcao.updateMany({
          where: { id: { in: opcoesChanges.deletedOpcoesIds } },
          data: { deletedAt: now },
        });

        await tx.resposta.updateMany({
          where: { opcaoId: { in: opcoesChanges.deletedOpcoesIds } },
          data: { deletedAt: now },
        });
      }

      // opções novas em perguntas mantidas
      if (opcoesChanges.newOpcoes.length > 0) {
        await tx.opcao.createMany({
          data: opcoesChanges.newOpcoes.map((opcao) => ({
            perguntaId: opcao.perguntaId,
            texto: opcao.texto,
          })),
        });
      }

      // opções mantidas que tiveram o texto alterado.
      await Promise.all(
        opcoesChanges.updatedOpcoes.map((opcao) =>
          tx.opcao.update({
            where: { id: opcao.id },
            data: { texto: opcao.texto },
          }),
        ),
      );

      return tx.pesquisa.update({
        where: { id },
        data: {
          empresaId: pesquisa.empresaId,
          nome: pesquisa.nome,
          descricao: pesquisa.descricao ?? null,
          dataLancamento: pesquisa.dataLancamento,
          dataEncerramento: pesquisa.dataEncerramento ?? null,
          estaAtiva: pesquisa.estaAtiva,
        },
        include: {
          perguntas: {
            where: { deletedAt: null },
            include: {
              opcoes: { where: { deletedAt: null } },
            },
          },
        },
      });
    });
  }
}
