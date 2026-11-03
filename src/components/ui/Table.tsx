import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "@/styles/table.css";

type TableProps = {
  label: string;
  columns: string[];
  rows: { label: string; cells: ReactNode[] }[];
  variant?: "text" | "data";
};

export function Table({ label, columns, rows, variant = "text" }: TableProps) {
  return <div className="ui-info-table-scroll" role="region" aria-label={label} tabIndex={0}>
    <table className={cn("ui-info-table", `ui-info-table--${variant}`)}>
      <caption className="sr-only">{label}</caption>
      <thead><tr><th scope="col">항목</th>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{columns.map((column, index) => <td key={column}>{row.cells[index]}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
