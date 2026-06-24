import { Injectable, NotFoundException } from "@nestjs/common";
import { getStatusFromPeriod } from "src/modules/pesquisa/helpers/get-status-from-period";
import { validateNameAvailability } from "src/modules/pesquisa/helpers/validate-name-availability";
import { validateSurveyDates } from "src/modules/pesquisa/helpers/validate-survey-dates";
import { UpdatePesquisaDto } from "../dtos/update-pesquisa.dto";
import { verifyOpcoesChanges } from "../helpers/verify-opcoes-changes";
import { verifyPerguntasChanges } from "../helpers/verify-perguntas-changes";
import { FindPesquisaByIdRepository } from "../repositories/find-pesquisa-by-id.repository";
import { FindPesquisaByNomeRepository } from "../repositories/find-pesquisa-by-nome.repository";
import { UpdatePesquisaRepository } from "../repositories/update-pesquisa.repository";

@Injectable()
export class UpdatePesquisaService {
  constructor(
    private readonly updateRepository: UpdatePesquisaRepository,
    private readonly findById: FindPesquisaByIdRepository,
    private readonly findByNomeRepository: FindPesquisaByNomeRepository,
  ) {}

  async execute(id: string, data: UpdatePesquisaDto) {
    const dataLancamento = new Date(data.dataLancamento);
    const dataEncerramento = data.dataEncerramento
      ? new Date(data.dataEncerramento)
      : null;

    validateSurveyDates(dataLancamento, dataEncerramento);

    const survey = await this.findById.execute(id, data.empresaId);

    if (!survey) {
      throw new NotFoundException("Pesquisa não encontrada.");
    }

    const surveyWithSameName = await this.findByNomeRepository.execute(
      data.empresaId,
      data.nome,
    );

    validateNameAvailability(surveyWithSameName, id);

    const isActive = getStatusFromPeriod(dataLancamento, dataEncerramento);

    const perguntasChanges = verifyPerguntasChanges(
      data.perguntas,
      survey.perguntas,
    );

    const perguntasRetained = data.perguntas.filter(
      (pergunta): pergunta is typeof pergunta & { id: number } =>
        pergunta.id !== undefined,
    );

    const opcoesChanges = verifyOpcoesChanges(
      perguntasRetained,
      survey.perguntas,
    );

    return await this.updateRepository.execute(id, {
      empresaId: data.empresaId,
      nome: data.nome,
      descricao: data.descricao,
      dataLancamento,
      dataEncerramento,
      estaAtiva: isActive,
      perguntasChanges,
      opcoesChanges,
    });
  }
}
