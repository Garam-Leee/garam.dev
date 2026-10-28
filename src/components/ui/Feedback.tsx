import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loading({ size = "medium", label = "불러오는 중" }: { size?: "small" | "medium" | "large"; label?: string }) {
  return <div role="status" className={cn("ui-loading", `ui-loading--${size}`)}><span className="ui-loading-spinner" aria-hidden="true" /><span>{label}</span></div>;
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
