import { test, expect } from '@playwright/test';

test('a página de pesquisas carrega', async ({ page }) => {
  await page.goto('/pesquisas');
  await expect(page).toHaveURL(/pesquisas/);
});
test('mostra erro ao tentar enviar sem responder pergunta obrigatória', async ({ page }) => {
  await page.goto('/pesquisas');

  // Clica no primeiro botão "Responder" que encontrar na lista
  await page.getByRole('button', { name: 'Responder' }).first().click();

  // Tenta enviar sem preencher nada
  await page.getByRole('button', { name: 'Enviar resposta' }).click();

  // Verifica se a mensagem de erro aparece
  await expect(page.getByText('Resposta obrigatória.')).toBeVisible();
});
