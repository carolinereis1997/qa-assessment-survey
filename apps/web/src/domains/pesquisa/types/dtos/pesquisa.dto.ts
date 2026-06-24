import type { PerguntaTipo } from "../others";

export type PesquisaStatus = "ativo" | "inativo";

export interface PesquisaDTO {
  id: string;
  empresaId: string;
  nome: string;
  descricao: string | null;
  dataLancamento: string;
  dataEncerramento: string | null;
  estaAtiva: boolean;
  idPublico: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListPesquisasResponseDTO {
  pages: number;
  totalItems: number;
  items: PesquisaDTO[];
}

export interface PesquisaFilters {
  page: number;
  ordination: "asc" | "desc";
  orderBy: "nome" | "dataLancamento";
  status: PesquisaStatus | null;
  empresaId: string;
}

export interface CreatePerguntaDTO {
  nome: string;
  tipo: PerguntaTipo;
  respostaObrigatoria: boolean;
  justificarResposta: boolean;
  permitirOutro: boolean;
  opcoes: string[];
}

export interface CreatePesquisaDTO {
  empresaId: string;
  nome: string;
  descricao?: string;
  dataLancamento: string;
  dataEncerramento?: string | null;
  perguntas: CreatePerguntaDTO[];
}
