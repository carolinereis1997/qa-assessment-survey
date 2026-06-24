import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./headless/popover";

type TDatePicker<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  "data-test-id"?: string;
};

export function DatePicker<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  placeholder = "dd/mm/aaaa",
  "data-test-id": dataTestId,
}: TDatePicker<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = field.value ? new Date(field.value) : undefined;
        return (
          <div className="flex flex-col gap-1.5">
            {label && (
              <label className="text-sm font-medium text-zinc-700">
                {label}
              </label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  data-test-id={dataTestId}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
                    helperText ? "border-red-400" : "border-zinc-300",
                    !selected && "text-zinc-400",
                  )}
                >
                  {selected ? formatDate(selected) : placeholder}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18M8 2v4M16 2v4" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={(date) => {
                    field.onChange(date ?? null);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {helperText && (
              <span
                data-test-id={`${dataTestId}-helper-text`}
                className="text-xs text-red-600"
              >
                {helperText}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
