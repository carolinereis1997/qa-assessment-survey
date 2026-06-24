import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class FindPesquisaByPublicIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  execute(idPublico: string) {
    return this.prisma.pesquisa.findUnique({
      where: { idPublico, deletedAt: null },
      include: {
        perguntas: {
          include: { opcoes: true },
        },
      },
    });
  }
}
