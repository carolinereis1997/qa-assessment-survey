# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pesquisas.spec.ts >> mostra erro ao tentar enviar sem responder pergunta obrigatória
- Location: tests\e2e\pesquisas.spec.ts:7:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Enviar resposta' })

```

# Page snapshot

```yaml
- generic [ref=e3]: Pesquisa não encontrada ou indisponível para respostas.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('a página de pesquisas carrega', async ({ page }) => {
  4  |   await page.goto('/pesquisas');
  5  |   await expect(page).toHaveURL(/pesquisas/);
  6  | });
  7  | test('mostra erro ao tentar enviar sem responder pergunta obrigatória', async ({ page }) => {
  8  |   await page.goto('/pesquisas');
  9  | 
  10 |   // Clica no primeiro botão "Responder" que encontrar na lista
  11 |   await page.getByRole('button', { name: 'Responder' }).first().click();
  12 | 
  13 |   // Tenta enviar sem preencher nada
> 14 |   await page.getByRole('button', { name: 'Enviar resposta' }).click();
     |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  15 | 
  16 |   // Verifica se a mensagem de erro aparece
  17 |   await expect(page.getByText('Resposta obrigatória.')).toBeVisible();
  18 | });
  19 | 
```