"use client";

import { Info, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onPointerDown = (event: PointerEvent) => { if (root.current && !root.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); };
  }, [open]);

  return <span className="ui-tooltip-root" ref={root}>
    <button type="button" className="ui-tooltip-trigger" aria-label={label} aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen((value) => !value)}><Info size={18} aria-hidden="true" /></button>
    {open && <span className="ui-tooltip" role="status" id={id}><span>{children}</span><button type="button" aria-label="도움말 닫기" onClick={() => setOpen(false)}><X size={16} aria-hidden="true" /></button></span>}
  </span>;
}
