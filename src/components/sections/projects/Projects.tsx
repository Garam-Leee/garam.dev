"use client";

import { GlassChip } from "@/components/ui/Glass";
import { projects } from "@/lib/portfolio";
import { SECTION_KICKER } from "@/lib/section-styles";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export type Project = (typeof projects)[number];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 py-24 sm:px-8 md:px-12"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <header className="mx-auto mb-12 max-w-[760px] text-center">
          <GlassChip className={`mx-auto px-3 py-1.5 ${SECTION_KICKER}`}>
            Projects
          </GlassChip>

          <h2 className="mt-3 text-[34px] font-bold leading-[1.18] tracking-[-0.04em] text-[#191f28] md:text-[48px]">
          문제를 정의하고, 구현하고, 운영하며 개선했던 경험을 정리했습니다.
          </h2>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.title}>
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal
        open={selectedProject !== null}
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
