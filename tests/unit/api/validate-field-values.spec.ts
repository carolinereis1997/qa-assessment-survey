import { describe, it, expect } from 'vitest';
import { validateFieldValues } from '../../../apps/api/src/modules/pesquisa/helpers/validate-field-values';

function perguntaBase(overrides = {}) {
  return {
    id: 1,
    tipo: 'pontuacao_0_a_5',
    respostaObrigatoria: false,
    justificarResposta: false,
    permitirOutro: false,
    opcoes: [],
    ...overrides,
  };
}

describe('validateFieldValues', () => {
  it('aceita pontuacao_0_a_5 dentro do intervalo', () => {
    const pergunta = perguntaBase({ tipo: 'pontuacao_0_a_5' });
    expect(() =>
      validateFieldValues(pergunta, { perguntaId: 1, valorNumerico: 5 }),
    ).not.toThrow();
  });

  it('rejeita pontuacao_0_a_5 fora do intervalo', () => {
    const pergunta = perguntaBase({ tipo: 'pontuacao_0_a_5' });
    expect(() =>
      validateFieldValues(pergunta, { perguntaId: 1, valorNumerico: 6 }),
    ).toThrow('A pontuação deve estar entre 0 e 5.');
  });

  it('rejeita pontuacao_0_a_10 fora do intervalo', () => {
    const pergunta = perguntaBase({ tipo: 'pontuacao_0_a_10' });
    expect(() =>
      validateFieldValues(pergunta, { perguntaId: 1, valorNumerico: 11 }),
    ).toThrow('A pontuação deve estar entre 0 e 10.');
  });

  it('rejeita opcaoId que não pertence à pergunta (multipla_escolha)', () => {
    const pergunta = perguntaBase({
      tipo: 'multipla_escolha',
      opcoes: [{ id: 10 }, { id: 20 }],
    });
    expect(() =>
      validateFieldValues(pergunta, { perguntaId: 1, opcaoId: 999 }),
    ).toThrow(/não pertence/);
  });

  it('rejeita valor de qualidade_percebida em pergunta de nivel_satisfacao', () => {
    const pergunta = perguntaBase({ tipo: 'nivel_satisfacao' });
    expect(() =>
      validateFieldValues(pergunta, {
        perguntaId: 1,
        valorOpcaoPadronizada: 'excelente',
      }),
    ).toThrow('Valor inválido para nível de satisfação.');
  });

  it('rejeita valor de nivel_satisfacao em pergunta de qualidade_percebida', () => {
    const pergunta = perguntaBase({ tipo: 'qualidade_percebida' });
    expect(() =>
      validateFieldValues(pergunta, {
        perguntaId: 1,
        valorOpcaoPadronizada: 'muito_satisfeito',
      }),
    ).toThrow('Valor inválido para qualidade percebida.');
  });
});