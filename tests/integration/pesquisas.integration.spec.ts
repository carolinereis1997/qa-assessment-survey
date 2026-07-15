import { describe, it, expect } from 'vitest';

const API_URL = 'http://localhost:3000';
const EMPRESA_ID = 'emp-001';

describe('Pesquisas - integração (API real, dados do seed)', () => {
  it('lista as pesquisas da empresa', async () => {
    const response = await fetch(`${API_URL}/pesquisas?empresaId=${EMPRESA_ID}`);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.totalItems).toBeGreaterThanOrEqual(4);
  });

  it('retorna a pesquisa ativa pelo link público, com as perguntas', async () => {
    const response = await fetch(`${API_URL}/public/pub-ativa`);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.perguntas.length).toBe(7);
  });

  it('rejeita pesquisa inativa pelo link público', async () => {
    const response = await fetch(`${API_URL}/public/pub-inativa`);
    expect(response.status).not.toBe(200);
  });

  it('rejeita pesquisa encerrada pelo link público', async () => {
    const response = await fetch(`${API_URL}/public/pub-encerrada`);
    expect(response.status).not.toBe(200);
  });

  it('rejeita pesquisa ainda não lançada (futura) pelo link público', async () => {
    const response = await fetch(`${API_URL}/public/pub-futura`);
    expect(response.status).not.toBe(200);
  });
});
