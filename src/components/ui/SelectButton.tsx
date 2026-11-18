import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "@/styles/select-button.css";

export type SelectButtonOption = { value: string; title: string; description?: string; image?: ReactNode; disabled?: boolean };

type SelectButtonGroupProps = {
  label: string;
  options: SelectButtonOption[];
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  multiple?: boolean;
  direction?: "vertical" | "horizontal";
  className?: string;
};

export function SelectButtonGroup({ label, options, value, onValueChange, multiple = false, direction = "horizontal", className }: SelectButtonGroupProps) {
  const selected = Array.isArray(value) ? value : [value];
  function toggle(next: string) {
    if (!multiple) { onValueChange(next); return; }
    onValueChange(selected.includes(next) ? selected.filter((item) => item !== next) : [...selected, next]);
  }

  return <fieldset className={cn("ui-select-button-group", `ui-select-button-group--${direction}`, className)}>
    <legend>{label}</legend>
    <div className="ui-select-button-options">{options.map((option) => <button key={option.value} type="button" className="ui-select-button" aria-pressed={selected.includes(option.value)} disabled={option.disabled} onClick={() => toggle(option.value)}>
      {option.image && <span className="ui-select-button-image">{option.image}</span>}
      <span className="ui-select-button-copy"><strong>{option.title}</strong>{option.description && <span>{option.description}</span>}</span>
    </button>)}</div>
  </fieldset>;
}
