import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/ui/Nav";
import { Breadcrumb } from "@/components/ui/Primitives";
import { experiences } from "@/data/experience";
import { experienceProjects } from "@/data/experience-projects";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "경력기술서",
  description: "이가람의 프론트엔드 개발 경력과 주요 성과입니다.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main className="detail-page experience-page">
        <div className="section-container">
          <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "경력" }]} />
          <header className="experience-page-header">
            <p className="section-label">EXPERIENCE</p>
            <h1 className="page-title">경력기술서</h1>
            <p className="section-intro">서비스의 구조를 설계하고, 성능과 안정성을 개선하며 쌓은 경험입니다.</p>
          </header>
          <div className="experience-detail-list">
            {experiences.map((experience, index) => (
              <section className="experience-detail-company" key={experience.company} aria-labelledby={`company-${index}`}>
                <header className="experience-detail-header">
                  <div>
                    <p className="experience-overview-period">{experience.period}</p>
                    <h2 id={`company-${index}`}>{experience.company}</h2>
                    <p className="experience-overview-role">{experience.role}</p>
                  </div>
                  <p>{experience.summary}</p>
                </header>
                <div className="experience-detail-projects">
                  {experienceProjects[index].map((project) => (
                    <article className="experience-detail-project" key={project.title}>
                      <h3>{project.title}</h3>
                      <div className="experience-detail-columns">
                        <div>
                          <h4>담당 업무</h4>
                          <ul>{project.responsibilities.map((item) => <li key={item}>{experience.responsibilities[item]}</li>)}</ul>
                        </div>
                        <div>
                          <h4>주요 성과</h4>
                          <ul>{project.achievements.map((item) => <li key={item}>{experience.achievements[item]}</li>)}</ul>
                        </div>
                      </div>
                      <Link className="experience-project-link" href={`/projects/${project.slug}`}>관련 기술 사례 <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </article>
                  ))}
                </div>
                <p className="experience-detail-tools">{experience.tools.join(" · ")}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
