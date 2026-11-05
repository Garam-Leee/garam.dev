import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="section-container">
        <header className="section-heading">
          <div>
            <p className="section-label">03 / EXPERIENCE</p>
            <h2 className="section-title">함께 만든 서비스와 역할.</h2>
          </div>
          <p className="section-intro">기술 과제의 해결 과정은 위에서,<br />전체 경력은 별도 페이지에서 볼 수 있습니다.</p>
        </header>
        <ol className="experience-overview">
          {experiences.map((experience) => (
            <li className="experience-overview-row" key={experience.company}>
              <span className="experience-overview-period">{experience.period}</span>
              <div>
                <h3 className="experience-overview-company">{experience.company}</h3>
                <p className="experience-overview-role">{experience.role}</p>
              </div>
              <div className="experience-overview-highlights"><p>{experience.homeRole}</p><strong>{experience.homeOutcome}</strong></div>
            </li>
          ))}
        </ol>
        <Link className="experience-more" href="/experience">전체 경력 보기 <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
