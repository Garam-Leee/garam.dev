"use client";

import { ChevronDown, Check, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import "@/styles/dropdown.css";

export type DropdownOption = { value: string; label: string; description?: string };

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: "basic" | "line-info" | "text";
  disabled?: boolean;
  className?: string;
};

export function Dropdown({ label, options, value, onValueChange, variant = "basic", disabled, className }: DropdownProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const mobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  function choose(next: string) {
    onValueChange(next);
    dialogRef.current?.close();
    setOpen(false);
  }

  return <div className={cn("ui-dropdown", `ui-dropdown--${variant}`, className)}>
    <label className="ui-dropdown-label" htmlFor={id}>{label}</label>
    <div className="ui-dropdown-control">
      <select id={id} aria-label={label} value={value} disabled={disabled} onChange={(event) => onValueChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <ChevronDown size={20} aria-hidden="true" />
      <button type="button" className="ui-dropdown-mobile-trigger" disabled={disabled} aria-label={`${label}: ${selected?.label ?? "선택"}`} aria-expanded={open} onClick={() => { if (mobile()) { dialogRef.current?.showModal(); setOpen(true); } }}>
        <span>{selected?.label ?? "선택"}</span><ChevronDown size={20} aria-hidden="true" />
      </button>
    </div>
    {variant === "line-info" && selected?.description && <p className="ui-dropdown-info">{selected.description}</p>}
    <dialog ref={dialogRef} className="ui-dropdown-sheet" aria-label={`${label} 선택`} onClose={() => setOpen(false)}>
      <div className="ui-dropdown-sheet-header"><strong>{label}</strong><button type="button" aria-label="닫기" onClick={() => dialogRef.current?.close()}><X size={20} /></button></div>
      <div className="ui-dropdown-sheet-options">{options.map((option) => <button key={option.value} type="button" aria-current={option.value === value ? "true" : undefined} onClick={() => choose(option.value)}><span>{option.label}{option.description && <small>{option.description}</small>}</span>{option.value === value && <Check size={20} aria-hidden="true" />}</button>)}</div>
    </dialog>
  </div>;
}
