import { strengths } from "@/data/strengths";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-container surface-panel">
        <header className="section-heading">
          <div>
            <p className="section-label">02 / EXPERTISE</p>
            <h2 className="section-title">기술을 쓰는 기준.</h2>
          </div>
          <p className="section-intro">새로운 기능을 만드는 것만큼,<br />유지하고 개선할 수 있는 구조를 중요하게 생각합니다.</p>
        </header>
        <div className="grid gap-x-12 sm:grid-cols-2">
          {strengths.map((item, index) => (
            <article key={item.title} className="border-t border-[#e1e7f0] py-7 sm:py-9">
              <p className="font-mono text-[11px] tracking-wider text-muted">0{index + 1} / {item.metric.toUpperCase()}</p>
              <h3 className="mt-4 break-keep text-[21px] font-semibold tracking-[-0.035em] text-heading">{item.title}</h3>
              <p className="mt-3 break-keep text-[14px] leading-7 text-body">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
