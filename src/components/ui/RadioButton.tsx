import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import "@/styles/radio-button.css";

type RadioButtonProps = Omit<ComponentProps<"input">, "type"> & { label: string };

export function RadioButton({ label, className, ...props }: RadioButtonProps) {
  return <label className={cn("ui-radio", props.disabled && "ui-radio--disabled", className)}>
    <input {...props} type="radio" />
    <span className="ui-radio-mark" aria-hidden="true" />
    <span>{label}</span>
  </label>;
}

type RadioOption = { value: string; label: string; disabled?: boolean };
type RadioGroupProps = { label: string; name: string; options: RadioOption[]; value: string; onValueChange: (value: string) => void; className?: string };

export function RadioGroup({ label, name, options, value, onValueChange, className }: RadioGroupProps) {
  return <fieldset className={cn("ui-radio-group", className)}>
    <legend>{label}</legend>
    {options.map((option) => <RadioButton key={option.value} name={name} value={option.value} label={option.label} checked={value === option.value} disabled={option.disabled} onChange={() => onValueChange(option.value)} />)}
  </fieldset>;
}
