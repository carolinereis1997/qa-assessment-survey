import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { CSSProperties } from "react";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const accent = {
  "--rdp-accent-color": "#059669",
  "--rdp-accent-background-color": "#d1fae5",
} as CSSProperties;

export function Calendar(props: CalendarProps) {
  return (
    <div style={accent}>
      <DayPicker locale={ptBR} {...props} />
    </div>
  );
}
