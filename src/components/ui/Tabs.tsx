"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import "@/styles/tabs.css";

type TabItem = { value: string; label: string; content: ReactNode };
type TabsProps = { items: TabItem[]; label: string; variant?: "fixed" | "fluid" | "scrollable"; defaultValue?: string };

export function Tabs({ items, label, variant = "fixed", defaultValue }: TabsProps) {
  const id = useId();
  const [selected, setSelected] = useState(defaultValue ?? items[0]?.value);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(0, items.findIndex((item) => item.value === selected));

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % items.length
      : event.key === "ArrowLeft" ? (index - 1 + items.length) % items.length
      : event.key === "Home" ? 0
      : event.key === "End" ? items.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    setSelected(items[next].value);
    buttons.current[next]?.focus();
  }

  if (items.length === 0) return null;

  return <div className={`ui-tabs ui-tabs--${variant}`}>
    <div className="ui-tabs-list" role="tablist" aria-label={label}>
      {items.map((item, index) => <button
        key={item.value}
        ref={(node) => { buttons.current[index] = node; }}
        id={`${id}-tab-${index}`}
        role="tab"
        type="button"
        aria-selected={index === selectedIndex}
        aria-controls={`${id}-panel-${index}`}
        tabIndex={index === selectedIndex ? 0 : -1}
        onClick={() => setSelected(item.value)}
        onKeyDown={(event) => handleKeyDown(event, index)}
      >{item.label}</button>)}
    </div>
    {items.map((item, index) => <div key={item.value} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={index !== selectedIndex} className="ui-tabs-panel">{item.content}</div>)}
  </div>;
}
