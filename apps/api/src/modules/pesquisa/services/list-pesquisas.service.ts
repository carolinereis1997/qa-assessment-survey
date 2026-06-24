import { Injectable } from "@nestjs/common";
import { ListPesquisasQueryDto } from "../dtos/list-pesquisas.dto";
import { ListPesquisasRepository } from "../repositories/list-pesquisas.repository";

@Injectable()
export class ListPesquisasService {
  constructor(private readonly listRepository: ListPesquisasRepository) {}

  async execute(data: ListPesquisasQueryDto) {
    return await this.listRepository.execute(data);
  }
}
