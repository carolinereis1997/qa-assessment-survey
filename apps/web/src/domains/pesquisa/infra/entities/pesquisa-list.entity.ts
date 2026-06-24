import type { ListPesquisasResponseDTO } from "../../types/dtos/pesquisa.dto";
import { Pesquisa } from "./pesquisa.entity";

export class PesquisaList {
  readonly items: Pesquisa[];
  readonly pages: number;
  readonly totalItems: number;

  constructor(data: ListPesquisasResponseDTO) {
    this.items = (data.items ?? []).map((item) => new Pesquisa(item));
    this.pages = data.pages ?? 0;
    this.totalItems = data.totalItems ?? 0;
  }
}
