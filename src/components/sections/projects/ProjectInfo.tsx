import { GlassChip, GlassPanel } from "@/components/ui/Glass";
import { ExternalLink } from "lucide-react";
import type { Project } from "./Projects";

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <GlassPanel
      as="dl"
      className="mt-5 grid gap-4 rounded-[26px] p-4 sm:grid-cols-2 sm:p-5"
    >
      <Info label="역할" value={project.role} />
      <Info label="참여" value={project.team} />
      <Info label="기간" value={project.period} />

      <div>
        <dt className="text-[12px] font-bold text-[#8b95a1]">링크</dt>

        <dd className="mt-2 flex flex-wrap gap-2">
          {project.relatedLinks.map((link) =>
            "href" in link && link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#3182f6]/20 bg-[#3182f6]/10 px-3 py-1.5 text-[13px] font-bold text-[#3182f6] transition hover:bg-[#3182f6]/20 hover:border-[#3182f6]/30"
              >
                <span>{link.label}</span>
                <ExternalLink size={13} strokeWidth={2.3} />
              </a>
            ) : (
              <GlassChip
                key={link.label}
                className="px-3 py-1.5 text-[13px] font-bold text-[#6b7684]"
              >
                {link.label}
              </GlassChip>
            )
          )}
        </dd>
      </div>
    </GlassPanel>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] font-bold text-[#8b95a1]">{label}</dt>
      <dd className="mt-1 text-[14px] font-semibold leading-[1.55] text-[#333d4b]">
        {value}
      </dd>
    </div>
  );
}
