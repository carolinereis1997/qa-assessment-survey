import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { FindPesquisaByPublicIdRepository } from "../repositories/find-pesquisa-by-public-id.repository";

@Injectable()
export class ShowPesquisaPublicaService {
  constructor(private readonly repository: FindPesquisaByPublicIdRepository) {}

  async execute(idPublico: string) {
    const pesquisa = await this.repository.execute(idPublico);

    if (!pesquisa) {
      throw new NotFoundException("Pesquisa não encontrada.");
    }

    if (pesquisa.estaAtiva === false) {
      throw new BadRequestException("Essa Pesquisa não está ativa.");
    }

    return pesquisa;
  }
}
