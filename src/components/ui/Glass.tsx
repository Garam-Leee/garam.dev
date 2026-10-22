import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const panelClass =
  "border border-border bg-white";

export const glassStyles = {
  panel: panelClass,
  panelInteractive:
    `${panelClass} transition-colors hover:border-blue/40`,
  chip:
    "inline-flex items-center rounded border border-transparent bg-[#f3f4f6]",
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
