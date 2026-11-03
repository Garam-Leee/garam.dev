"use client";

import { Check, Minus } from "lucide-react";
import { useEffect, useRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import "@/styles/checkbox.css";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  variant?: "icon" | "square" | "circle";
  indeterminate?: boolean;
};

export function Checkbox({ label, variant = "square", indeterminate = false, className, ...props }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate; }, [indeterminate]);

  return <label className={cn("ui-checkbox", `ui-checkbox--${variant}`, className, props.disabled && "ui-checkbox--disabled")}>
    <input {...props} ref={inputRef} type="checkbox" aria-label={label} />
    <span className="ui-checkbox-box" aria-hidden="true">{indeterminate ? <Minus size={14} strokeWidth={3} /> : <Check size={14} strokeWidth={3} />}</span>
    <span className="ui-checkbox-label">{label}</span>
  </label>;
}
