import { AccordionItem } from "@/components/ui/Primitives";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="section-container">
        <header className="section-heading">
          <div>
            <p className="section-label">03 / EXPERIENCE</p>
            <h2 className="section-title">개발하고, 운영하며.</h2>
          </div>
          <p className="section-intro">웹툰, 헬스케어, 건축 ERP, 클라우드.<br />서로 다른 서비스에서 쌓은 경험입니다.</p>
        </header>
        <div className="career-list">
          {experiences.map((experience, index) => (
            <AccordionItem key={experience.company} open={index === 0} summary={<>
                <p className="col-span-2 font-mono text-ds-12 leading-6 text-muted sm:col-span-1">{experience.period}</p>
                <div>
                  <h3 className="text-ds-24 font-semibold tracking-[-0.04em] text-heading">{experience.company}</h3>
                  <p className="mt-1 text-ds-14 text-muted">{experience.role}</p>
                  <p className="mt-3 max-w-[650px] break-keep text-ds-14 leading-7 text-body">{experience.summary}</p>
                </div>
              </>}>
              <div className="mt-8 grid gap-8 sm:ml-[212px] lg:grid-cols-2 lg:gap-10">
                <div>
                  <h4 className="text-ds-14 font-semibold text-blue">주요 성과</h4>
                  <ul className="mt-4 space-y-3 text-ds-13 leading-7 text-body">
                    {experience.achievements.map((item) => <li key={item} className="border-l-2 border-blue/30 pl-4">{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-ds-14 font-semibold text-heading">기술 구현과 담당 업무</h4>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-ds-13 leading-7 text-body">
                    {experience.responsibilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <p className="text-ds-12 leading-6 text-muted lg:col-span-2">{experience.tools.join(" / ")}</p>
              </div>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
