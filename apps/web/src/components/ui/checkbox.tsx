import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

type TCheckbox<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  "data-test-id"?: string;
};

export function Checkbox<T extends FieldValues>({
  name,
  control,
  label,
  "data-test-id": dataTestId,
}: TCheckbox<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
          <CheckboxPrimitive.Root
            data-test-id={dataTestId}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            className={cn(
              "grid h-4 w-4 place-items-center rounded border border-zinc-300 bg-white",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
              "data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white",
            )}
          >
            <CheckboxPrimitive.Indicator>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          {label}
        </label>
      )}
    />
  );
}
