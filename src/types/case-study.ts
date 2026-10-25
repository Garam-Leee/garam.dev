export interface CaseNode {
  label: string;
  detail?: string;
  children?: CaseNode[];
}

export type CaseBlock = { title: string } & (
  | { kind: "statement"; text: string }
  | { kind: "list"; items: string[]; columns?: 1 | 2 }
  | { kind: "metrics"; items: { value: string; label: string }[] }
  | { kind: "flow"; steps: CaseNode[] }
  | { kind: "causes"; roots: CaseNode[] }
  | { kind: "table"; columns: string[]; rows: { label: string; cells: string[] }[] }
  | { kind: "matrix"; cells: [
      { items: string[] }, { items: string[] }, { items: string[] }, { items: string[] },
    ] }
);
