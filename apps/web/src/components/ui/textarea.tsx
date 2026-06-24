import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

type TTextarea<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  "data-test-id"?: string;
};

export function Textarea<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  placeholder,
  rows = 3,
  maxLength,
  "data-test-id": dataTestId,
}: TTextarea<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          {label && (
            <label className="text-sm font-medium text-zinc-700">{label}</label>
          )}
          <textarea
            {...field}
            value={field.value ?? ""}
            data-test-id={dataTestId}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            className={cn(
              "w-full rounded-md border bg-white px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
              helperText ? "border-red-400" : "border-zinc-300",
            )}
          />
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
