"use client";

import { useState } from "react";
import { Chip, ItemList, ListItem } from "@/components/ui/Primitives";
import { careerProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const categories = ["전체", "구조", "성능", "안정성", "운영"] as const;
type Category = (typeof categories)[number];

const projectCategories: Record<string, Exclude<Category, "전체">> = {
  shortz: "구조",
  "webtoon-run": "안정성",
  "kpi-dashboard": "운영",
  ollacare: "성능",
  counseling: "안정성",
  "healthcare-admin": "안정성",
  "construction-erp": "구조",
  "private-cloud": "구조",
};

export default function Projects() {
  const [category, setCategory] = useState<Category>("전체");
  const visibleProjects = careerProjects.map((project, index) => ({ project, index })).filter(({ project }) => category === "전체" || projectCategories[project.slug] === category);
  return (
    <section id="projects" className="section-shell">
      <div className="section-container">
        <header className="section-heading">
          <div>
            <p className="section-label">01 / SELECTED WORK</p>
            <h2 className="section-title">문제를 해결한 기록.</h2>
          </div>
          <p className="section-intro">구조 설계부터 성능 개선, 실시간 연결까지.<br />경력에서 직접 다룬 {careerProjects.length}가지 기술 과제입니다.</p>
        </header>
        <div className="work-filters" role="group" aria-label="기술 사례 분류">
          {categories.map((item) => <Chip key={item} variant="filter" selected={category === item} onClick={() => setCategory(item)}>{item}</Chip>)}
          <span className="work-filter-count" aria-live="polite">{visibleProjects.length}개 사례</span>
        </div>
        <ItemList ordered>
          {visibleProjects.map(({ project, index }) => (
            <ListItem key={project.slug}><ProjectCard project={project} index={index} /></ListItem>
          ))}
        </ItemList>
      </div>
    </section>
  );
}
