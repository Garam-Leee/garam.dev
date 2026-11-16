import type { CaseBlock, CaseNode } from "@/types/case-study";
import { DataTable } from "@/components/ui/Primitives";

const listStyle = "list-disc space-y-2 pl-5 text-body marker:text-blue";
const panelStyle = "case-study-panel rounded-lg border border-border bg-surface p-4";

export function CaseStudyBlock({ block }: { block: CaseBlock }) {
  return (
    <section className="border-t border-border py-8 sm:py-10">
      <h2 className="mb-5 break-keep text-ds-24 font-semibold tracking-tight text-heading">{block.title}</h2>
      <BlockContent block={block} />
    </section>
  );
}

function BlockContent({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case "statement":
      return <p className="max-w-[66ch] break-keep leading-8 text-body">{block.text}</p>;
    case "list":
      return <ul className={block.columns === 2 ? "grid list-disc gap-x-10 gap-y-3 pl-5 text-body marker:text-blue sm:grid-cols-2" : listStyle}>
        {block.items.map((item) => <li key={item} className="break-keep leading-7">{item}</li>)}
      </ul>;
    case "metrics":
      return <dl className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        {block.items.map(({ label, value }) => <div key={label} className={panelStyle}>
          <dt className="text-ds-14 text-body">{label}</dt>
          <dd className="mt-1 text-ds-32 font-semibold tracking-tight text-blue">{value}</dd>
        </div>)}
      </dl>;
    case "flow":
      return <ol className="case-flow">
        {block.steps.map((step, index) => <li key={step.label} className="case-flow-step"><span className="case-flow-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div className="case-flow-content"><NodeContent node={step} /></div></li>)}
      </ol>;
    case "causes":
      return <NodeList nodes={block.roots} />;
    case "table":
      return <DataTable label={block.title} columns={block.columns} rows={block.rows} />;
    case "matrix":
      return <div className="grid gap-3 sm:grid-cols-2">
        {block.cells.map(({ items }, index) => {
          const label = ["중요하고 긴급함", "중요하지만 긴급하지 않음", "긴급하지만 중요하지 않음", "중요하지도 긴급하지도 않음"][index];
          return <div key={label} className={panelStyle}>
            <h3 className="mb-2 font-semibold text-heading">{label}</h3>
            <ul className={listStyle}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>;
        })}
      </div>;
  }
}

function NodeList({ nodes }: { nodes: CaseNode[] }) {
  return <ul className="space-y-3 border-l border-border pl-4">
    {nodes.map((node) => <li key={node.label}><NodeContent node={node} /></li>)}
  </ul>;
}

function NodeContent({ node }: { node: CaseNode }) {
  return <>
    <p className="font-semibold text-heading">{node.label}</p>
    {node.detail && <p className="mt-1 break-keep leading-7 text-body">{node.detail}</p>}
    {Boolean(node.children?.length) && <div className="mt-3"><NodeList nodes={node.children!} /></div>}
  </>;
}
