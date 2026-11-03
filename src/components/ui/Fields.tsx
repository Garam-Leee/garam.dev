import type { ComponentProps } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchField({ className, variant = "outline", ...props }: Omit<ComponentProps<"input">, "type"> & { variant?: "outline" | "underline" }) {
  return <span className={cn("ui-search", `ui-search--${variant}`)}><input {...props} type="search" className={cn("form-control", className)} /><Search aria-hidden="true" size={20} /></span>;
}
export function TextField({ label, helper, error, id, className, ...props }: Omit<ComponentProps<"input">, "type" | "id"> & { id: string; label: string; helper?: string; error?: string }) {
  const helperId = error || helper ? `${id}-helper` : undefined;
  return <span className="ui-text-field"><label htmlFor={id}>{label}</label><input {...props} id={id} type="text" aria-invalid={Boolean(error) || undefined} aria-describedby={helperId} className={cn("form-control", className)} />{(error || helper) && <span id={helperId} className="ui-text-field-helper">{error || helper}</span>}</span>;
}
export function Select({ className, ...props }: ComponentProps<"select">) {
  return <span className="ui-select"><select {...props} className={cn("form-control", className)} /><ChevronDown size={20} aria-hidden="true" /></span>;
}
