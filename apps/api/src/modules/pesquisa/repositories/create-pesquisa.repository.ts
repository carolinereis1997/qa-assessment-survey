import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreatePesquisaDto } from "../dtos/create-pesquisa.dto";

@Injectable()
export class CreatePesquisaRepository {
  constructor(private readonly prisma: PrismaService) {}

  execute(data: CreatePesquisaDto, estaAtiva: boolean) {
    return this.prisma.pesquisa.create({
      data: {
        empresaId: data.empresaId, 
        nome: data.nome,
        descricao: data.descricao ?? null,
        estaAtiva,
        dataLancamento: data.dataLancamento,
        dataEncerramento: data.dataEncerramento ?? null,
        perguntas: {
          create: data.perguntas.map((pergunta) => ({
            nome: pergunta.nome,
            tipo: pergunta.tipo,
            respostaObrigatoria: pergunta.respostaObrigatoria,
            justificarResposta: pergunta.justificarResposta,
            permitirOutro: pergunta.permitirOutro,
            opcoes: {
              create: pergunta.opcoes.map((texto) => ({ texto })),
            },
          })),
        },
      },
      include: {
        perguntas: {
          include: { opcoes: true },
        },
      },
    });
  }
}
