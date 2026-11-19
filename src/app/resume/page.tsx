import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Nav from "@/components/ui/Nav";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/resume.css";

export const metadata: Metadata = pageMetadata({
  title: "이력서",
  description: "프론트엔드 개발자 이가람의 경력, 기술, 주요 성과를 정리한 이력서입니다.",
  path: "/resume",
});

const highlights = [
  { value: "약 2초", label: "웹툰 주요 화면 초기 로딩 단축" },
  { value: "62 → 91", label: "비대면 진료 랜딩 페이지 SEO 점수" },
  { value: "+27%", label: "콘텐츠 편성 개선 후 전 분기 대비 매출 증가 기여" },
];

const capabilities = [
  { title: "Frontend", tools: "React · Next.js · TypeScript · SSR · SSG" },
  { title: "Data & Quality", tools: "SWR · SQL · GA4 · Elastic · Datadog RUM" },
  { title: "UI & Workflow", tools: "Storybook · Atomic Design · Monorepo · React Hook Form · Canvas" },
];

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="resume-page">
        <div className="resume-container">
          <header className="resume-header">
            <div className="resume-heading">
              <div className="resume-photo"><Image src={profile.imageUrl} alt="이가람 프로필 사진" fill sizes="(max-width: 640px) 96px, 144px" priority /></div>
              <div>
                <p className="resume-eyebrow">GARAM LEE / FRONTEND ENGINEER</p>
                <h1>이가람<span>Garam Lee</span></h1>
                <p className="resume-summary">복잡한 서비스의 구조를 설계하고, 성능과 안정성을 개선하는 프론트엔드 개발자입니다.</p>
              </div>
            </div>
            <div className="resume-actions">
              <a className="resume-download" href={profile.resumePdfUrl} download="garam-lee-product-frontend-engineer.pdf">PDF 다운로드 <ArrowDownToLine size={17} aria-hidden="true" /></a>
              <Link className="resume-detail-link" href="/experience">상세 경력기술서 <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </header>

          <div className="resume-contact" aria-label="연락처와 링크">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>{profile.location}</span>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>

          <section className="resume-section" aria-labelledby="resume-highlights">
            <div className="resume-section-heading"><p>01 / IMPACT</p><h2 id="resume-highlights">주요 성과</h2></div>
            <div className="resume-highlights">{highlights.map((item) => <div className="resume-highlight" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
          </section>

          <section className="resume-section" aria-labelledby="resume-experience">
            <div className="resume-section-heading"><p>02 / EXPERIENCE</p><h2 id="resume-experience">경력</h2></div>
            <div className="resume-career-list">{experiences.map((experience) => (
              <article className="resume-career" key={experience.company}>
                <div><p className="resume-period">{experience.period}</p><h3>{experience.company}</h3><p className="resume-role">{experience.role}</p></div>
                <div><p className="resume-career-summary">{experience.summary}</p><ul>{experience.achievements.slice(0, 2).map((achievement) => <li key={achievement}>{achievement}</li>)}</ul></div>
              </article>
            ))}</div>
          </section>

          <section className="resume-section" aria-labelledby="resume-skills">
            <div className="resume-section-heading"><p>03 / SKILLS</p><h2 id="resume-skills">기술</h2></div>
            <div className="resume-skills">{capabilities.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.tools}</p></div>)}</div>
          </section>
        </div>
      </main>
    </>
  );
}
