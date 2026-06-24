import type {
  CreatePesquisaDTO,
  PesquisaFilters,
} from "../../types/dtos/pesquisa.dto";
import type { PesquisaList } from "../entities/pesquisa-list.entity";

export interface PesquisaGateway {
  listPesquisas(filters: PesquisaFilters): Promise<PesquisaList>;
  createPesquisa(data: CreatePesquisaDTO): Promise<void>;
}
