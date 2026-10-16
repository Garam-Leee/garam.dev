"use client";

import { GlassChip } from "@/components/ui/Glass";
import { careerProjects as projects } from "@/data/projects";
import { SECTION_KICKER } from "@/lib/section-styles";
import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { filterProjects } from "@/lib/project-filters";

const domains = [...new Set(projects.map((project) => project.domain))];
const tools = [...new Set(projects.flatMap((project) => project.tools))].sort();
const filterClass = "mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-heading";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [domain, setDomain] = useState("");
  const [tool, setTool] = useState("");
  const visibleProjects = filterProjects(projects, { domain, tool });

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 py-24 sm:px-8 md:px-12"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <header className="mx-auto mb-12 max-w-[760px] text-center">
          <GlassChip className={`mx-auto px-3 py-1.5 ${SECTION_KICKER}`}>
            기술 사례
          </GlassChip>

          <h2 className="mt-3 text-[34px] font-bold leading-[1.18] tracking-[-0.04em] text-[#191f28] md:text-[48px]">
            경력에서 마주한 기술 과제와 해결 과정
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-body">구조 설계, 데이터 흐름, 성능과 운영 안정성에 기여한 내용을 정리했습니다.</p>
        </header>

        <div className="mb-6 flex flex-wrap items-end gap-4">
          <label htmlFor="project-domain" className="min-w-[160px] flex-1 text-sm font-semibold text-body">
            도메인
            <select id="project-domain" value={domain} onChange={(event) => setDomain(event.target.value)} className={filterClass}>
              <option value="">전체 도메인</option>
              {domains.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label htmlFor="project-tool" className="min-w-[160px] flex-1 text-sm font-semibold text-body">
            기술
            <select id="project-tool" value={tool} onChange={(event) => setTool(event.target.value)} className={filterClass}>
              <option value="">전체 기술</option>
              {tools.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          {(domain || tool) && (
            <button type="button" onClick={() => { setDomain(""); setTool(""); }} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue">
              필터 초기화
            </button>
          )}
        </div>
        <p role="status" className="mb-4 text-sm text-body">{visibleProjects.length}개의 프로젝트 · 대표 프로젝트 우선</p>

        {visibleProjects.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </li>
          ))}
        </ul>
        ) : (
          <p className="rounded-2xl border border-border bg-white p-8 text-center text-body">
            조건에 맞는 프로젝트가 없습니다. 필터를 초기화해 전체 프로젝트를 확인해 주세요.
          </p>
        )}
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
