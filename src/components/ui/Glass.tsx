import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export const glassStyles = {
  panel:
    "border border-white/72 bg-white/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_14px_36px_rgba(25,31,40,0.065)] backdrop-blur-2xl",
  panelInteractive:
    "border border-white/72 bg-white/46 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_14px_36px_rgba(25,31,40,0.065)] backdrop-blur-2xl transition hover:border-[#3182f6]/28 hover:bg-white/62 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_18px_44px_rgba(25,31,40,0.09)]",
  chip:
    "inline-flex items-center rounded-full border border-white/74 bg-white/44 shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_1px_3px_rgba(25,31,40,0.035)] backdrop-blur-xl",
  icon:
    "grid place-items-center border border-white/74 bg-white/44 text-[#3182f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_8px_18px_rgba(25,31,40,0.055)] backdrop-blur-xl",
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
