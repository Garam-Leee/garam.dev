import { GlassPanel } from "@/components/ui/Glass";

export function ProjectSummaryCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <GlassPanel className="rounded-[26px] p-4 sm:p-5">
      <p className="text-[13px] font-bold text-[#2272eb]">{title}</p>
      <p className="mt-2 text-[14px] leading-[1.68] text-[#4e5968]">
        {content}
      </p>
    </GlassPanel>
  );
}
