import { Injectable } from "@nestjs/common";
import { getStatusFromPeriod } from "src/modules/pesquisa/helpers/get-status-from-period";
import { validateNameAvailability } from "src/modules/pesquisa/helpers/validate-name-availability";
import { validateSurveyDates } from "src/modules/pesquisa/helpers/validate-survey-dates";
import { CreatePesquisaDto } from "../dtos/create-pesquisa.dto";
import { CreatePesquisaRepository } from "../repositories/create-pesquisa.repository";
import { FindPesquisaByNomeRepository } from "../repositories/find-pesquisa-by-nome.repository";

@Injectable()
export class CreatePesquisaService {
  constructor(
    private readonly createRepository: CreatePesquisaRepository,
    private readonly findByNomeRepository: FindPesquisaByNomeRepository,
  ) {}

  async execute(data: CreatePesquisaDto) {
    const dataLancamento = new Date(data.dataLancamento);
    const dataEncerramento = data.dataEncerramento
      ? new Date(data.dataEncerramento)
      : null;

    validateSurveyDates(dataLancamento, dataEncerramento);

    const existente = await this.findByNomeRepository.execute(
      data.empresaId,
      data.nome,
    );

    validateNameAvailability(existente, null);

    const isActive: boolean = getStatusFromPeriod(
      dataLancamento,
      dataEncerramento,
    );

    return await this.createRepository.execute(
      {
        empresaId: data.empresaId,
        nome: data.nome,
        descricao: data.descricao,
        dataLancamento,
        dataEncerramento,
        perguntas: data.perguntas.map((pergunta) => ({
          nome: pergunta.nome,
          tipo: pergunta.tipo,
          respostaObrigatoria: pergunta.respostaObrigatoria,
          justificarResposta: pergunta.justificarResposta,
          permitirOutro: pergunta.permitirOutro,
          opcoes: pergunta.opcoes,
        })),
      },
      isActive,
    );
  }
}
