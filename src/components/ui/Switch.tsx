import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import "@/styles/switch.css";

export function Switch({ label, className, ...props }: Omit<ComponentProps<"input">, "type"> & { label: string }) {
  return <label className={cn("ui-switch", props.disabled && "ui-switch--disabled", className)}>
    <span className="ui-switch-label">{label}</span>
    <input {...props} type="checkbox" role="switch" />
    <span className="ui-switch-track" aria-hidden="true"><span /></span>
  </label>;
}
