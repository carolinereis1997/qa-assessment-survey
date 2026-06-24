import { differenceInCalendarDays } from "date-fns";
import { normalizeDateToStartOfDay } from "../../../shared/helpers/normalize-date";

export function getStatusFromPeriod(
  dataLancamento: Date,
  dataEncerramento: Date | null,
): boolean {
  const hoje = normalizeDateToStartOfDay(new Date());
  const normalizedDataLancamento = normalizeDateToStartOfDay(dataLancamento);
  const normalizedDataEncerramento = dataEncerramento
    ? normalizeDateToStartOfDay(dataEncerramento)
    : null;

  if (differenceInCalendarDays(hoje, normalizedDataLancamento) < 0) {
    return false;
  }

  if (
    normalizedDataEncerramento &&
    differenceInCalendarDays(normalizedDataEncerramento, hoje) < 0
  ) {
    return false;
  }

  return true;
}
