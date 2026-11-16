import { CaseStudyBlock } from "./CaseStudyBlock";
import { glassStyles } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import { ProjectInfo } from "./ProjectInfo";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <ProjectInfo project={project} />

      {project.caseStudy?.length ? (
        <div className="mt-10">
          {project.caseStudy.map((block) => <CaseStudyBlock key={block.title} block={block} />)}
        </div>
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <ProjectSummaryCard title="문제" content={project.problem} />
          <ProjectSummaryCard title="결과" content={project.result} />
        </div>
      )}

      <section className="mt-6">
        <h2 className="px-1 text-ds-18 font-bold tracking-[-0.035em] text-heading">
          상세 내용
        </h2>

        <div className="mt-4 space-y-3">
          {project.detailSections.map((section) => (
            <section
              key={section.title}
              className={cn(
                glassStyles.panel,
                "rounded-xl p-4 sm:p-5"
              )}
            >
              <h3 className="text-ds-15 font-bold text-heading">
                {section.title}
              </h3>

              <ul className="mt-3 space-y-2 text-ds-14 leading-[1.68] text-body">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[6px_1fr] gap-3"
                  >
                    <span className="mt-[0.7em] h-1.5 w-1.5 rounded-full bg-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
