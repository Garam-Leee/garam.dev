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
        <div className="border-t border-heading">
          {experiences.map((experience, index) => (
            <details key={experience.company} open={index === 0} className="group border-b border-border py-7 sm:py-9">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_24px] gap-y-3 sm:grid-cols-[180px_1fr_24px] sm:gap-x-8 [&::-webkit-details-marker]:hidden">
                <p className="col-span-2 font-mono text-[11px] leading-6 text-muted sm:col-span-1">{experience.period}</p>
                <div>
                  <h3 className="text-[23px] font-semibold tracking-[-0.04em] text-heading">{experience.company}</h3>
                  <p className="mt-1 text-xs text-muted">{experience.role}</p>
                  <p className="mt-3 max-w-[650px] break-keep text-sm leading-7 text-body">{experience.summary}</p>
                </div>
                <span aria-hidden="true" className="text-2xl font-light leading-8 text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-8 grid gap-8 sm:ml-[212px] lg:grid-cols-2 lg:gap-10">
                <div>
                  <h4 className="text-xs font-semibold text-blue">주요 성과</h4>
                  <ul className="mt-4 space-y-3 text-[13px] leading-7 text-body">
                    {experience.achievements.map((item) => <li key={item} className="border-l-2 border-[#d7e4ff] pl-4">{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-heading">기술 구현과 담당 업무</h4>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-[13px] leading-7 text-body">
                    {experience.responsibilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <p className="text-[11px] leading-6 text-muted lg:col-span-2">{experience.tools.join(" / ")}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
