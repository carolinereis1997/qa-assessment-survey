import { ConflictException } from "@nestjs/common";

interface PesquisaExistente {
  id: string;
}

export function validateNameAvailability(
  existing: PesquisaExistente | null,
  idAtual: string | null,
): void {
  if (existing && existing.id !== idAtual) {
    throw new ConflictException(
      "Já existe uma pesquisa com este nome para esta empresa.",
    );
  }
}
