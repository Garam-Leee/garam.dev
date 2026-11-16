import { ButtonLink } from "@/components/ui/Primitives";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const outcomes = [
  { value: "약 2초", label: "초기 로딩 시간 단축", context: "웹툰 플랫폼 · API 중복 요청 및 데이터 구조 개선" },
  { value: "62 → 91", label: "Lighthouse SEO 점수", context: "비대면 진료 · SSG 전환과 메타데이터 개선" },
  { value: "+27%", label: "전 분기 대비 매출 증가에 기여", context: "KPI 분석 · 콘텐츠 노출과 편성 전략 개선" },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="mx-auto max-w-[1080px]">
        <p className="section-label">GARAM LEE / FRONTEND ENGINEER</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h1 className="break-keep text-[clamp(var(--ds-font-36),5vw,var(--ds-font-60))] font-semibold leading-[1.2] tracking-[-0.04em] text-heading">
            복잡한 서비스를,<br />
            빠르고 안정적인<br /> 사용자 경험으로.
          </h1>
          <div className="pb-1">
            <p className="max-w-[460px] break-keep text-ds-17 leading-[1.8] text-body">{profile.introduction}</p>
            <p className="mt-4 text-ds-14 leading-6 text-muted">React · Next.js · TypeScript를 기반으로<br />구조 설계부터 성능 개선, 운영 안정화까지 함께합니다.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects">
                기술 사례 보기 <ArrowDown size={15} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} download variant="secondary">
                이력서 다운로드 <ArrowUpRight size={15} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
        <dl className="outcomes-grid">
          {outcomes.map((outcome) => (
            <div key={outcome.value}>
              <dt className="min-h-10 break-keep text-ds-14 font-medium leading-5 text-body sm:min-h-0 sm:text-ds-13">{outcome.label}</dt>
              <dd className="mt-2 whitespace-nowrap text-ds-24 font-semibold leading-tight tracking-[-0.055em] text-heading sm:text-ds-40">{outcome.value}</dd>
              <dd className="mt-2 hidden max-w-[280px] break-keep text-ds-12 leading-6 text-muted sm:block">{outcome.context}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
