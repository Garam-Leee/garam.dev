import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonStyle = { variant?: "primary" | "secondary" | "text"; size?: 24 | 32 | 40 | 44 | 48 | 52 | 56; fullWidth?: boolean };
function buttonClass({ variant = "primary", size = 48, fullWidth = false }: ButtonStyle, className?: string) {
  return cn("ui-button", `ui-button--${variant}`, `ui-button--${size}`, fullWidth && "ui-button--full", className);
}

export function Button({ variant, size, fullWidth, type = "button", className, ...props }: ComponentProps<"button"> & ButtonStyle) {
  return <button {...props} type={type} className={buttonClass({ variant, size, fullWidth }, className)} />;
}
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link {...props} className={buttonClass({ variant, size, fullWidth }, className)} />;
}
export function IconButton({ className, ...props }: ComponentProps<"button"> & { "aria-label": string }) {
  return <Button {...props} variant="secondary" size={44} className={cn("ui-icon-button", className)} />;
}

type TagStyle = { size?: 18 | 20 | 24; tone?: "neutral" | "blue" | "green" };
export function Tag({ className, size = 24, tone = "neutral", ...props }: ComponentProps<"span"> & TagStyle) {
  return <span {...props} className={cn("ui-tag", `ui-tag--${size}`, `ui-tag--${tone}`, className)} />;
}
export function TagLink({ className, size = 24, tone = "neutral", ...props }: ComponentProps<typeof Link> & TagStyle) {
  return <Link {...props} className={cn("ui-tag", `ui-tag--${size}`, `ui-tag--${tone}`, className)} />;
}

export function Chip({ selected = false, className, ...props }: ComponentProps<"button"> & { selected?: boolean }) {
  return <button {...props} type={props.type ?? "button"} aria-pressed={selected} className={cn("ui-chip", selected && "ui-chip--selected", className)} />;
}
