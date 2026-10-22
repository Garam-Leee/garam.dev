import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={"/projects/" + project.slug} className="work-card">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:block">
        <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="text-[14px] font-medium text-body sm:mt-4">{project.company}</p>
        <p className="text-[13px] text-muted sm:mt-1">{project.domain}</p>
      </div>
      <div>
        <h3 className="work-title">{project.title}</h3>
        <p className="mt-2 max-w-[650px] break-keep text-[16px] leading-7 text-body">{project.description}</p>
        <p className="mt-3 text-[13px] font-medium leading-6 text-muted">{project.tools.slice(0, 5).join(" / ")}</p>
      </div>
      <span className="work-action" aria-hidden="true"><ArrowUpRight size={21} /></span>
    </Link>
  );
}
