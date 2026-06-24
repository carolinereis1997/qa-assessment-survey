import { Injectable } from "@nestjs/common";
import { FindPesquisaByIdRepository } from "../repositories/find-pesquisa-by-id.repository";

@Injectable()
export class ShowPesquisaService {
  constructor(private readonly findById: FindPesquisaByIdRepository) {}

  async execute(id: string, empresaId: string) {
    return await this.findById.execute(id, empresaId);
  }
}
