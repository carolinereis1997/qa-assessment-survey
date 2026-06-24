import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

type TInput<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  autoFocus?: boolean;
  "data-test-id"?: string;
};

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  placeholder,
  type = "text",
  maxLength,
  autoFocus,
  "data-test-id": dataTestId,
}: TInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          {label && (
            <label className="text-sm font-medium text-zinc-700">{label}</label>
          )}
          <input
            {...field}
            value={field.value ?? ""}
            data-test-id={dataTestId}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            autoFocus={autoFocus}
            className={cn(
              "h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
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
