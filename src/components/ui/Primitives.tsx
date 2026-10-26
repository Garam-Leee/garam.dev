import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";

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

export function Chip({ selected = false, className, ...props }: ComponentProps<"button"> & { selected?: boolean }) {
  return <button {...props} type={props.type ?? "button"} aria-pressed={selected} className={cn("ui-chip", selected && "ui-chip--selected", className)} />;
}

export function Loading({ size = "medium", label = "불러오는 중" }: { size?: "small" | "medium" | "large"; label?: string }) {
  return <div role="status" className={cn("ui-loading", `ui-loading--${size}`)}><span className="ui-loading-spinner" aria-hidden="true" /><span>{label}</span></div>;
}

export function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: { label: string; cells: ReactNode[] }[] }) {
  return <div className="ui-table-scroll" role="region" aria-label={label} tabIndex={0}><table className="ui-table"><caption className="sr-only">{label}</caption><thead><tr><th scope="col">항목</th>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{columns.map((column, index) => <td key={column}>{row.cells[index]}</td>)}</tr>)}</tbody></table></div>;
}

export function SearchField({ className, ...props }: Omit<ComponentProps<"input">, "type">) {
  return <span className="ui-search"><input {...props} type="search" className={cn("form-control", className)} /><Search aria-hidden="true" size={20} /></span>;
}
export function TextField({ label, helper, error, id, className, ...props }: Omit<ComponentProps<"input">, "type" | "id"> & { id: string; label: string; helper?: string; error?: string }) {
  const helperId = error || helper ? `${id}-helper` : undefined;
  return <span className="ui-text-field"><label htmlFor={id}>{label}</label><input {...props} id={id} type="text" aria-invalid={Boolean(error) || undefined} aria-describedby={helperId} className={cn("form-control", className)} />{(error || helper) && <span id={helperId} className="ui-text-field-helper">{error || helper}</span>}</span>;
}
export function Select({ className, ...props }: ComponentProps<"select">) {
  return <span className="ui-select"><select {...props} className={cn("form-control", className)} /><ChevronDown size={20} aria-hidden="true" /></span>;
}
export function Pagination({ label, page, totalPages, hrefForPage, onPageChange }: {
  label: string; page: number; totalPages: number; hrefForPage: (page: number) => string; onPageChange?: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const action = (number: number, content: ReactNode, accessibleLabel: string) => page === number
    ? <span className="pagination-link pagination-link--disabled" aria-disabled="true" aria-label={accessibleLabel}>{content}</span>
    : <Link href={hrefForPage(number)} onClick={onPageChange ? (event) => { event.preventDefault(); onPageChange(number); } : undefined} className="pagination-link" aria-label={accessibleLabel}>{content}</Link>;
  return <nav aria-label={label} className="mt-8 flex flex-wrap justify-center gap-2">
    {action(1, <ChevronsLeft size={18} aria-hidden="true" />, "첫 페이지")}
    {action(Math.max(1, page - 1), <ChevronLeft size={18} aria-hidden="true" />, "이전 페이지")}
    {Array.from({ length: totalPages }, (_, index) => {
      const number = index + 1;
      return <Link key={number} href={hrefForPage(number)} onClick={onPageChange ? (event) => { event.preventDefault(); onPageChange(number); } : undefined} aria-current={number === page ? "page" : undefined}
        aria-label={`${number}페이지`} className="pagination-link">{number}</Link>;
    })}
    {action(Math.min(totalPages, page + 1), <ChevronRight size={18} aria-hidden="true" />, "다음 페이지")}
    {action(totalPages, <ChevronsRight size={18} aria-hidden="true" />, "마지막 페이지")}
  </nav>;
}
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="border-t border-border py-20 text-center">
    <h2 className="text-ds-17 font-semibold text-heading">{title}</h2>
    <p className="mt-2 text-ds-14 leading-6 text-muted">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>;
}
