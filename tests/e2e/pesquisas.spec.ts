import { test, expect } from '@playwright/test';

test('a página de pesquisas carrega', async ({ page }) => {
  await page.goto('/pesquisas');
  await expect(page).toHaveURL(/pesquisas/);
});
test('mostra erro ao tentar enviar sem responder pergunta obrigatória', async ({ page }) => {
  await page.goto('/pesquisas/resposta/pub-ativa');

  await page.getByRole('button', { name: 'Enviar respostas' }).click();

  await expect(page.getByText('Resposta obrigatória.')).toBeVisible();
});
