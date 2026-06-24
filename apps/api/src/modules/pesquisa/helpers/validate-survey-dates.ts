import { BadRequestException } from "@nestjs/common";
import { differenceInCalendarDays } from "date-fns";
import { normalizeDateToStartOfDay } from "../../../shared/helpers/normalize-date";

export function validateSurveyDates(
  dataLancamento: Date,
  dataEncerramento: Date | null,
): void {
  const hoje = normalizeDateToStartOfDay(new Date());
  const normalizedDataLancamento = normalizeDateToStartOfDay(dataLancamento);
  const normalizedDataEncerramento = dataEncerramento
    ? normalizeDateToStartOfDay(dataEncerramento)
    : null;

  if (differenceInCalendarDays(normalizedDataLancamento, hoje) < 0) {
    throw new BadRequestException(
      "A data de lançamento não pode ser anterior a hoje.",
    );
  }

  if (normalizedDataEncerramento) {
    if (
      differenceInCalendarDays(
        normalizedDataEncerramento,
        normalizedDataLancamento,
      ) < 0
    ) {
      throw new BadRequestException(
        "A data de encerramento não pode ser anterior à data de lançamento.",
      );
    }

    if (differenceInCalendarDays(normalizedDataEncerramento, hoje) < 0) {
      throw new BadRequestException(
        "A data de encerramento não pode ser anterior a hoje.",
      );
    }
  }
}
