import { describe, it, expect } from 'vitest';
import { validateRequiredFields } from '../../../apps/api/src/modules/pesquisa/helpers/validate-required-fields';

function perguntaBase(overrides = {}) {
  return {
    id: 1,
    tipo: 'texto_grande',
    respostaObrigatoria: false,
    justificarResposta: false,
    permitirOutro: false,
    opcoes: [],
    ...overrides,
  };
}

describe('validateRequiredFields', () => {
  it('rejeita pergunta obrigatória sem nenhuma resposta', () => {
    const pergunta = perguntaBase({ respostaObrigatoria: true });
    expect(() =>
      validateRequiredFields(pergunta, { perguntaId: 1 }),
    ).toThrow(/é obrigatória e não foi respondida/);
  });

  it('aceita pergunta obrigatória com o campo principal preenchido', () => {
    const pergunta = perguntaBase({ respostaObrigatoria: true });
    expect(() =>
      validateRequiredFields(pergunta, {
        perguntaId: 1,
        valorOpcaoTexto: 'Foi ótimo',
      }),
    ).not.toThrow();
  });

  it('aceita pergunta obrigatória respondida via "outro" quando permitido', () => {
    const pergunta = perguntaBase({
      respostaObrigatoria: true,
      permitirOutro: true,
    });
    expect(() =>
      validateRequiredFields(pergunta, {
        perguntaId: 1,
        outroTexto: 'Minha resposta alternativa',
      }),
    ).not.toThrow();
  });

  it('aceita pergunta não obrigatória sem resposta', () => {
    const pergunta = perguntaBase({ respostaObrigatoria: false });
    expect(() =>
      validateRequiredFields(pergunta, { perguntaId: 1 }),
    ).not.toThrow();
  });

  it('rejeita quando justificarResposta é exigido e não veio justificativa', () => {
    const pergunta = perguntaBase({
      respostaObrigatoria: true,
      justificarResposta: true,
    });
    expect(() =>
      validateRequiredFields(pergunta, {
        perguntaId: 1,
        valorOpcaoTexto: 'Resposta sem justificativa',
      }),
    ).toThrow(/exige justificativa/);
  });

  it('aceita quando justificarResposta é exigido e a justificativa veio preenchida', () => {
    const pergunta = perguntaBase({
      respostaObrigatoria: true,
      justificarResposta: true,
    });
    expect(() =>
      validateRequiredFields(pergunta, {
        perguntaId: 1,
        valorOpcaoTexto: 'Resposta com justificativa',
        justificativaTexto: 'Porque sim',
      }),
    ).not.toThrow();
  });
});