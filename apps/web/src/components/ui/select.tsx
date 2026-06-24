import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select as Root,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./headless/select";

type TOption = {
  value: string;
  label: string;
};

type TSelect<T extends FieldValues> = {
  "data-test-id"?: string;
  options: TOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  name: Path<T>;
  control: Control<T>;
  clearable?: boolean;
  onChangeCapture?: (value: string) => void;
};

export default function Select<T extends FieldValues>({
  options,
  placeholder,
  label,
  helperText,
  name,
  control,
  clearable = true,
  onChangeCapture,
  "data-test-id": dataTestId,
}: TSelect<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="flex w-full flex-col gap-1.5">
          {label && (
            <label className="text-sm font-medium text-zinc-700">{label}</label>
          )}
          <div className="relative flex items-center w-full">
          <Root
            value={value ?? ""}
            onValueChange={(next) => {
              onChange(next);
              onChangeCapture?.(next);
            }}
          >
            <SelectTrigger
              data-test-id={dataTestId}
              className={cn(clearable && value && "pr-10")}
            >
              <SelectValue placeholder={placeholder ?? "Selecione..."} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  data-test-id={`${dataTestId}-option-${index}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Root>

          {clearable && value && (
            <button
              type="button"
              data-test-id={`${dataTestId}-clear`}
              aria-label="Limpar filtro"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                onChangeCapture?.("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          </div>
          {helperText && (
            <span
              data-test-id={`${dataTestId}-helper-text`}
              className="text-xs text-red-600"
            >
              {helperText}
            </span>
          )}
        </div>
      )}
    />
  );
}