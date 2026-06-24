import { formatDate } from "@/lib/format";
import type { PesquisaDTO } from "../../types/dtos/pesquisa.dto";
import type { StatusBadge } from "../../types/others";

export class Pesquisa {
  readonly id: string;
  readonly props: PesquisaDTO;

  constructor(props: PesquisaDTO) {
    this.id = props.id;
    this.props = props;
  }

  getStatus(): StatusBadge {
    return this.props.estaAtiva
      ? { label: "Ativa", color: "green" }
      : { label: "Inativa", color: "gray" };
  }

  getPeriodo(): string {
    const inicio = formatDate(this.props.dataLancamento);
    const fim = this.props.dataEncerramento
      ? formatDate(this.props.dataEncerramento)
      : "Sem encerramento";
    return `${inicio} — ${fim}`;
  }
}
