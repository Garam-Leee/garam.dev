import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const panelClass =
  "border border-[#e6ebf3] bg-white";

export const glassStyles = {
  panel: panelClass,
  panelInteractive:
    `${panelClass} transition-colors duration-300 hover:border-blue/30`,
  chip:
    "inline-flex items-center rounded-full border border-[#e8edf5] bg-[#f3f6fb]",
  icon:
    "grid place-items-center border border-border bg-white text-blue",
} as const;

type GlassPanelProps<T extends ElementType> = {
  as?: T;
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function GlassPanel<T extends ElementType = "div">({
  as,
  interactive = false,
  className,
  ...props
}: GlassPanelProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        interactive ? glassStyles.panelInteractive : glassStyles.panel,
        className
      )}
      {...props}
    />
  );
}

export function GlassChip({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return <span className={cn(glassStyles.chip, className)} {...props} />;
}

export function GlassIcon({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn(glassStyles.icon, className)} {...props} />;
}
