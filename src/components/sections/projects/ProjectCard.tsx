import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={"/projects/" + project.slug} className="group grid gap-4 border-b border-border py-7 transition-colors hover:bg-[#f7f8fa] sm:grid-cols-[160px_1fr_32px] sm:gap-8 sm:py-9">
      <div className="flex items-center gap-4 sm:block">
        <span className="font-mono text-[12px] text-muted">{String(index + 1).padStart(2, "0")}</span>
        <p className="text-[12px] font-medium text-body sm:mt-4">{project.company}</p>
        <p className="text-[11px] text-muted sm:mt-1">{project.domain}</p>
      </div>
      <div>
        <h3 className="break-keep text-[21px] font-semibold leading-[1.5] tracking-[-0.035em] text-heading group-hover:text-blue sm:text-[25px]">{project.title}</h3>
        <p className="mt-2 max-w-[650px] break-keep text-[14px] leading-7 text-body">{project.description}</p>
        <p className="mt-4 text-[11px] font-medium leading-6 text-muted">{project.tools.slice(0, 5).join(" / ")}</p>
      </div>
      <ArrowUpRight className="hidden text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue sm:block" size={24} aria-hidden="true" />
    </Link>
  );
}
