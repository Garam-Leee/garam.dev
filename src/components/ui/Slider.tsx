"use client";

import { useId, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "@/styles/slider.css";

type SliderProps = { label: string; value: number; onValueChange: (value: number) => void; min?: number; max?: number; step?: number; variant?: "basic" | "popover"; disabled?: boolean; className?: string };

export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 1, variant = "basic", disabled, className }: SliderProps) {
  const id = useId();
  const [active, setActive] = useState(false);
  const percent = Math.max(0, Math.min(100, ((value - min) / Math.max(1, max - min)) * 100));
  return <div className={cn("ui-slider", className)}>
    <div className="ui-slider-header"><label htmlFor={id}>{label}</label><output>{value}</output></div>
    <div className="ui-slider-track-wrap" style={{ "--slider-start": "0%", "--slider-end": `${percent}%` } as CSSProperties}>
      {variant === "popover" && active && <span className="ui-slider-popover" style={{ left: `${percent}%` }} aria-hidden="true">{value}</span>}
      <input id={id} type="range" min={min} max={max} step={step} value={value} disabled={disabled} aria-label={label} onChange={(event) => onValueChange(Number(event.target.value))} onPointerDown={() => setActive(true)} onPointerUp={() => setActive(false)} onBlur={() => setActive(false)} onFocus={() => setActive(true)} />
    </div>
    <div className="ui-slider-bounds"><span>{min}</span><span>{max}</span></div>
  </div>;
}

type RangeSliderProps = { label: string; value: [number, number]; onValueChange: (value: [number, number]) => void; min?: number; max?: number; step?: number; disabled?: boolean; className?: string };

export function RangeSlider({ label, value, onValueChange, min = 0, max = 100, step = 1, disabled, className }: RangeSliderProps) {
  const start = Math.max(0, Math.min(100, ((value[0] - min) / Math.max(1, max - min)) * 100));
  const end = Math.max(0, Math.min(100, ((value[1] - min) / Math.max(1, max - min)) * 100));
  return <div className={cn("ui-slider", className)}>
    <div className="ui-slider-header"><span>{label}</span><output>{value[0]}–{value[1]}</output></div>
    <div className="ui-slider-track-wrap ui-slider-range" style={{ "--slider-start": `${start}%`, "--slider-end": `${end}%` } as CSSProperties}>
      <input type="range" min={min} max={max} step={step} value={value[0]} disabled={disabled} aria-label={`${label} 시작`} onChange={(event) => onValueChange([Math.min(Number(event.target.value), value[1]), value[1]])} />
      <input type="range" min={min} max={max} step={step} value={value[1]} disabled={disabled} aria-label={`${label} 끝`} onChange={(event) => onValueChange([value[0], Math.max(Number(event.target.value), value[0])])} />
    </div>
    <div className="ui-slider-bounds"><span>{min}</span><span>{max}</span></div>
  </div>;
}
