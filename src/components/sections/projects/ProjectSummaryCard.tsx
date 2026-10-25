import { GlassPanel } from "@/components/ui/Glass";

export function ProjectSummaryCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <GlassPanel className="rounded-xl p-4 sm:p-5">
      <p className="text-ds-13 font-bold text-blue">{title}</p>
      <p className="mt-2 text-ds-14 leading-[1.68] text-body">
        {content}
      </p>
    </GlassPanel>
  );
}
