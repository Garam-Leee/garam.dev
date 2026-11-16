import { Tag, TagLink } from "@/components/ui/Primitives";
import { GlassPanel } from "@/components/ui/Glass";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <GlassPanel
      as="dl"
      className="mt-5 grid gap-4 rounded-xl p-4 sm:grid-cols-2 sm:p-5"
    >
      {project.company && <Info label="회사" value={project.company} />}
      <Info label="역할" value={project.role} />
      <Info label="참여" value={project.team} />
      <Info label={project.periodLabel ?? "기간"} value={project.period} />

      <div>
        <dt className="text-ds-12 font-bold text-muted">링크</dt>

        <dd className="mt-2 flex flex-wrap gap-2">
          {project.relatedLinks.map((link) =>
            "href" in link && link.href ? (
              <TagLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <ExternalLink size={13} strokeWidth={2.3} />
              </TagLink>
            ) : (
              <Tag
                key={link.label}
                className="px-3 py-1.5 text-ds-13 font-bold text-muted"
              >
                {link.label}
              </Tag>
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
      <dt className="text-ds-12 font-bold text-muted">{label}</dt>
      <dd className="mt-1 text-ds-14 font-semibold leading-[1.55] text-heading">
        {value}
      </dd>
    </div>
  );
}
