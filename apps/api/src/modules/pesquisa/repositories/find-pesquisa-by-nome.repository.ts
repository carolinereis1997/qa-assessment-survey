import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class FindPesquisaByNomeRepository {
  constructor(private readonly prisma: PrismaService) {}

  execute(empresaId: string, nome: string) {
    return this.prisma.pesquisa.findUnique({
      where: { empresaId_nome: { empresaId, nome }, deletedAt: null },
    });
  }
}
