export type Order = "asc" | "desc";

export type OrderBy = "nome" | "dataLancamento";

export type StatusBadge = {
  label: string;
  color: "green" | "gray";
};

export const PERGUNTA_TIPOS = [
  "texto_grande",
  "multipla_escolha",
  "opcoes_diversas",
  "pontuacao_0_a_5",
  "pontuacao_0_a_10",
  "nivel_satisfacao",
  "qualidade_percebida",
] as const;

export type PerguntaTipo = (typeof PERGUNTA_TIPOS)[number];

export const PERGUNTA_TIPO_OPTIONS: { value: PerguntaTipo; label: string }[] = [
  { value: "texto_grande", label: "Texto longo" },
  { value: "multipla_escolha", label: "Múltipla escolha" },
  { value: "opcoes_diversas", label: "Opções diversas (várias respostas)" },
  { value: "pontuacao_0_a_5", label: "Pontuação (0 a 5)" },
  { value: "pontuacao_0_a_10", label: "Pontuação (0 a 10)" },
  { value: "nivel_satisfacao", label: "Nível de satisfação" },
  { value: "qualidade_percebida", label: "Qualidade percebida" },
];

export const TIPOS_COM_OPCOES: PerguntaTipo[] = [
  "multipla_escolha",
  "opcoes_diversas",
];

export function tipoExigeOpcoes(tipo?: PerguntaTipo): boolean {
  return !!tipo && TIPOS_COM_OPCOES.includes(tipo);
}
