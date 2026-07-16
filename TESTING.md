# Estratégia de Testes — Pesquisa de Clima

## Critério geral

O app é um CRUD sem autenticação, com dois fluxos principais: **admin cria pesquisa** e **respondente responde pelo link público**. A complexidade real está em `pergunta` e `resposta`: existem 7 tipos de pergunta (`texto_grande`, `multipla_escolha`, `opcoes_diversas`, `pontuacao_0_a_5`, `pontuacao_0_a_10`, `nivel_satisfacao`, `qualidade_percebida`), cada um exigindo um campo diferente preenchido em `resposta` (`valorOpcaoTexto`, `opcaoId`, `valorNumerico`, `valorOpcaoPadronizada`), mais três flags por pergunta (`respostaObrigatoria`, `justificarResposta`, `permitirOutro`) que mudam o que é uma resposta válida. Essa combinação tipo × flag × valor é o maior risco do sistema, e é barata de testar sem navegador — por isso o orçamento pesa em unitário/integração, com e2e enxuto cobrindo só os caminhos críticos ponta a ponta.

## Orçamento (30 testes)

| Camada       | Qtde | %   |
|--------------|------|-----|
| Unitário     | 16   | 53% |
| Integração   | 9    | 30% |
| E2E          | 5    | 17% |

### Unitário (16)

**API (domain/service) — 12, validação por tipo de pergunta e por flag**
- `texto_grande` aceita `valorOpcaoTexto` e rejeita `valorNumerico`/`opcaoId` preenchidos
- `multipla_escolha`/`opcoes_diversas` exige `opcaoId` válido e pertencente à própria pergunta
- `pontuacao_0_a_5` aceita `valorNumerico` entre 0 e 5, rejeita fora do intervalo
- `pontuacao_0_a_10` aceita `valorNumerico` entre 0 e 10, rejeita fora do intervalo
- `nivel_satisfacao` só aceita o subconjunto correto do enum (`muito_satisfeito`...`muito_insatisfeito`), rejeita valores de `qualidade_percebida`
- `qualidade_percebida` só aceita seu subconjunto (`excelente`...`pessimo`), rejeita valores de `nivel_satisfacao`
- `respostaObrigatoria = true` sem resposta é rejeitada
- `respostaObrigatoria = false` sem resposta é aceita (pergunta pulada)
- `justificarResposta = true` exige `justificativaTexto` preenchido
- `permitirOutro = true` aceita `outroTexto` sem `opcaoId`
- `permitirOutro = false` rejeita `outroTexto` preenchido
- Criação de pesquisa com nome duplicado para a mesma empresa é rejeitada (`@@unique([empresaId, nome])`)

**Web (service/container) — 4**
- Montagem do payload de resposta varia conforme o tipo da pergunta (o campo certo é preenchido)
- Habilitar/desabilitar submit conforme perguntas com `respostaObrigatoria` preenchidas
- Exibir campo de justificativa somente quando `justificarResposta = true`
- Exibir campo "outro" somente quando `permitirOutro = true`

### Integração (9) — API + banco real, camada HTTP
- `POST /pesquisas` cria pesquisa com perguntas aninhadas de tipos variados (happy path)
- `POST /pesquisas` retorna erro com nome duplicado para a mesma empresa
- `GET /pesquisas` lista pesquisas existentes
- `GET /public/:idPublico` retorna pesquisa pelo link público
- `GET /public/:idPublico` com id inexistente retorna 404
- `POST /public/:idPublico/respostas` grava respostas completas cobrindo pelo menos 3 tipos de pergunta diferentes (happy path)
- `POST /public/:idPublico/respostas` rejeita quando falta resposta a pergunta com `respostaObrigatoria = true`
- `POST /public/:idPublico/respostas` rejeita quando `pesquisa.estaAtiva = false` ou `dataEncerramento` já passou, retornando "Pesquisa não encontrada ou indisponível para respostas" (confirmado via teste exploratório)
- `GET /pesquisas` reflete estado correto após criação (consistência API+DB)

### E2E (5) — Playwright, app completo
- Admin cria uma pesquisa do zero pela UI, com pelo menos 2 tipos de pergunta, e ela aparece na listagem
- Respondente acessa o link público e envia respostas com sucesso (fluxo feliz completo)
- Respondente tenta enviar sem responder pergunta obrigatória e vê erro (confirmado via exploração: campo mostra "Resposta obrigatória." e rodapé mostra "Responda todas as perguntas obrigatórias.")
- Pesquisa cobrindo os principais tipos (texto, escolha, pontuação, satisfação) é respondida corretamente ponta a ponta
- Listagem reflete pesquisa recém-criada (fluxo criar → listar)

## Infraestrutura dos testes de integração — isolamento e reprodutibilidade
- Banco de teste dedicado (`survey_db_test`), separado do de desenvolvimento.
- Schema aplicado via `prisma migrate deploy` antes da suíte rodar.
- Não depende do seed padrão da aplicação: cada teste cria seus próprios dados no `beforeEach` e faz `truncate` das tabelas relevantes entre execuções, garantindo estado limpo.
- API instanciada em memória via `NestJS TestingModule`, conectada ao MySQL de teste real — evita subir a stack docker inteira para esses testes, mantendo velocidade.
- Specs rodam sem paralelismo (ou com banco isolado por worker) para evitar concorrência no truncate.

## Pipeline de CI (GitLab)

Estágios: `install` → `lint` → `unit` → `integration` → `e2e`.

- **unit**: sem dependências externas, roda em paralelo ao lint.
- **integration**: usa `services: mysql:8`, roda `prisma migrate deploy` contra o MySQL do serviço, depois os specs de `tests/integration`.
- **e2e**: sobe a stack com `docker compose up -d` (api + web + mysql), aguarda health-check da API, roda Playwright, publica o relatório como artifact e derruba a stack no `after_script`.
- Relatórios (JUnit/Playwright HTML) publicados como `artifacts` para visualização no MR.
- Cache de `node_modules` entre jobs.

## Trade-offs
- Dos 7 tipos de pergunta, nem todos aparecem em e2e — cobrimos 3-4 representativos ali; a combinação completa tipo × flag fica no unitário, que é muito mais barato de manter e de rodar em cada commit.
- Preferimos truncate a transação com rollback porque a API pode rodar em processo/conexão separada da suíte de teste.
- Orçamento enxuto de e2e (5) reflete que a superfície de UI é pequena (2 telas principais) e o risco maior está na validação de tipo/flag, não na navegação.
- Multi-tenant (`empresa`) e soft delete (`deletedAt`) existem no schema mas não têm regra de negócio visível no enunciado ainda — não alocamos orçamento específico até confirmar o comportamento explorando a API.

## Achado adicional (via seed)
O seed revela um terceiro estado de bloqueio além de "inativa" e "encerrada": uma pesquisa com `dataLancamento` no futuro (`Pesquisa Futura`, ainda não começou). Os três estados — inativa, encerrada, futura — precisam ser cobertos separadamente nos testes de integração, pois representam motivos de negócio distintos mesmo retornando resposta parecida ao usuário.

## Nota sobre o CI
O `.gitlab-ci.yml` foi preenchido com os três jobs (`test:unit`, `test:integration`, `test:e2e`), mas não foi executado num GitLab real por falta de acesso a um runner — só validado localmente, rodando os comandos individualmente. Pode precisar de ajustes finos de sintaxe/timing (ex: tempo de espera do `wait-on`) na primeira execução real.