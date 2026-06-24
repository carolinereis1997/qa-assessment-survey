import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import type { ListPesquisasQueryDto } from "../dtos/list-pesquisas.dto";

@Injectable()
export class ListPesquisasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: ListPesquisasQueryDto) {
    const where: Prisma.pesquisaWhereInput = {
      empresaId: data.empresaId,
      ...((data.status || data.status !== undefined) && {
        estaAtiva: data.status === "ativo",
      }),
      deletedAt: null,
    };

    const [totalItems, items] = await this.prisma.$transaction([
      this.prisma.pesquisa.count({
        where,
      }),
      this.prisma.pesquisa.findMany({
        where,
        orderBy: this.getOrderBy(data),
        skip: (data.page - 1) * data.perPage,
        take: data.perPage,
      }),
    ]);

    const pages = this.calcPages(totalItems, data.perPage);

    return {
      pages,
      totalItems,
      items,
    };
  }

  private getOrderBy(data: ListPesquisasQueryDto) {
    switch (data.orderBy) {
      case "dataLancamento":
        return {
          dataLancamento: data.ordination,
        };
      case "nome":
        return {
          nome: data.ordination,
        };
      default:
        return {
          nome: data.ordination,
        };
    }
  }

  private calcPages(totalItems: number, quantityPerPage: number) {
    return Math.ceil(totalItems / quantityPerPage);
  }
}
