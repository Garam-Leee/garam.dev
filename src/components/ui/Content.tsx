import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Divider({ variant = "inset", className, ...props }: ComponentProps<"hr"> & { variant?: "inset" | "full" }) {
  return <hr {...props} className={cn("ui-divider", `ui-divider--${variant}`, className)} />;
}

export function ItemList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  const Element = ordered ? "ol" : "ul";
  return <Element className="content-list">{children}</Element>;
}
export function ListRow({ headline, description, trailing, className }: { headline: ReactNode; description?: ReactNode; trailing?: ReactNode; className?: string }) {
  return <div className={cn("ui-list-row", className)}><div><strong>{headline}</strong>{description && <p>{description}</p>}</div>{trailing && <span className="ui-list-row-trailing">{trailing}</span>}</div>;
}
export function ListItem({ children }: { children: ReactNode }) {
  return <li className="content-list-item">{children}</li>;
}
export function ListItemLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={cn("content-row", className)} />;
}

export function AccordionItem({ summary, children, showIcon = true, ...props }: ComponentProps<"details"> & { summary: ReactNode; showIcon?: boolean }) {
  return <details {...props} className={cn("career-entry", props.className)}>
    <summary className="career-summary">
      {summary}
      {showIcon && <span aria-hidden="true" className="career-toggle">+</span>}
    </summary>
    {children}
  </details>;
}

export function Card({ variant = "outline", className, ...props }: ComponentProps<"article"> & { variant?: "outline" | "filled" }) {
  return <article {...props} className={cn("ui-card", `ui-card--${variant}`, className)} />;
}

export function Breadcrumb({ items, label = "현재 위치" }: { items: { label: string; href?: string }[]; label?: string }) {
  return <nav aria-label={label} className="ui-breadcrumb"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>
    {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
    {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
  </li>)}</ol></nav>;
}

export function TopNavLink({ mobile = false, className, ...props }: ComponentProps<typeof Link> & { mobile?: boolean }) {
  return <Link {...props} className={cn(mobile ? "mobile-nav-link" : "nav-link", className)} />;
}

export function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: { label: string; cells: ReactNode[] }[] }) {
  return <div className="ui-table-scroll" role="region" aria-label={label} tabIndex={0}><table className="ui-table"><caption className="sr-only">{label}</caption><thead><tr><th scope="col">항목</th>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{columns.map((column, index) => <td key={column}>{row.cells[index]}</td>)}</tr>)}</tbody></table></div>;
}
