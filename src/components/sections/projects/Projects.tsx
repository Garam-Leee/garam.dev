import { careerProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="section-container">
        <header className="section-heading">
          <div>
            <p className="section-label">01 / SELECTED WORK</p>
            <h2 className="section-title">문제를 해결한 기록.</h2>
          </div>
          <p className="section-intro">구조 설계부터 성능 개선, 실시간 연결까지.<br />경력에서 직접 다룬 7가지 기술 과제입니다.</p>
        </header>
        <ol className="border-t border-heading">
          {careerProjects.map((project, index) => (
            <li key={project.slug}><ProjectCard project={project} index={index} /></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
