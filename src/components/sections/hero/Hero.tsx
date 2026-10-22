import Link from "next/link";
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
          <h1 className="break-keep text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.2] tracking-[-0.065em] text-heading">
            구조를 설계하고,<br />
            성능과 안정성을<br className="hidden lg:block" /> 개선합니다.
          </h1>
          <div className="pb-1">
            <p className="max-w-[460px] break-keep text-[15px] leading-[1.9] text-body sm:text-base">{profile.introduction}</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link href="#projects" className="action-link action-link-primary">
                기술 사례 보기 <ArrowDown size={15} aria-hidden="true" />
              </Link>
              <a href={profile.resumeUrl} download className="action-link action-link-secondary">
                이력서 다운로드 <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <dl className="outcomes-grid">
          {outcomes.map((outcome) => (
            <div key={outcome.value}>
              <dt className="min-h-10 break-keep text-[11px] font-medium leading-5 text-body sm:min-h-0 sm:text-[13px]">{outcome.label}</dt>
              <dd className="mt-2 whitespace-nowrap text-[26px] font-semibold leading-tight tracking-[-0.055em] text-heading sm:text-[42px]">{outcome.value}</dd>
              <dd className="mt-2 hidden max-w-[280px] break-keep text-[12px] leading-6 text-muted sm:block">{outcome.context}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
