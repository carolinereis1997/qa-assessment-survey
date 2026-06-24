import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class FindPesquisaByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  execute(id: string, empresaId: string) {
    return this.prisma.pesquisa.findUnique({
      where: {
        empresaId,
        id,
        deletedAt: null,
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
  }
}
