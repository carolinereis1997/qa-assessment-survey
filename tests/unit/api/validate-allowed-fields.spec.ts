import { describe, it, expect } from 'vitest';
import { validateAllowedFields } from '../../../apps/api/src/modules/pesquisa/helpers/validate-allowed-fields';

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

describe('validateAllowedFields', () => {
  it('aceita valorOpcaoTexto em pergunta texto_grande', () => {
    const pergunta = perguntaBase({ tipo: 'texto_grande' });
    expect(() =>
      validateAllowedFields(pergunta, {
        perguntaId: 1,
        valorOpcaoTexto: 'Foi uma boa experiência',
      }),
    ).not.toThrow();
  });

  it('rejeita valorNumerico em pergunta texto_grande', () => {
    const pergunta = perguntaBase({ tipo: 'texto_grande' });
    expect(() =>
      validateAllowedFields(pergunta, { perguntaId: 1, valorNumerico: 5 }),
    ).toThrow(/não é compatível/);
  });

  it('rejeita opcaoId em pergunta texto_grande', () => {
    const pergunta = perguntaBase({ tipo: 'texto_grande' });
    expect(() =>
      validateAllowedFields(pergunta, { perguntaId: 1, opcaoId: 10 }),
    ).toThrow(/não é compatível/);
  });

  it('aceita valorNumerico em pergunta pontuacao_0_a_5', () => {
    const pergunta = perguntaBase({ tipo: 'pontuacao_0_a_5' });
    expect(() =>
      validateAllowedFields(pergunta, { perguntaId: 1, valorNumerico: 3 }),
    ).not.toThrow();
  });

  it('rejeita valorOpcaoTexto em pergunta pontuacao_0_a_5', () => {
    const pergunta = perguntaBase({ tipo: 'pontuacao_0_a_5' });
    expect(() =>
      validateAllowedFields(pergunta, {
        perguntaId: 1,
        valorOpcaoTexto: 'texto indevido',
      }),
    ).toThrow(/não é compatível/);
  });

  it('aceita opcaoId em pergunta multipla_escolha', () => {
    const pergunta = perguntaBase({ tipo: 'multipla_escolha' });
    expect(() =>
      validateAllowedFields(pergunta, { perguntaId: 1, opcaoId: 10 }),
    ).not.toThrow();
  });
});