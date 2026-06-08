"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 마퀴 ── */
const SKILLS = [
  "Next.js", "React", "TypeScript", "Framer Motion",
  "Tailwind CSS", "GA4", "Datadog", "SQL",
  "Canvas API", "SWR", "Atomic Design",
  "Figma", "Core Web Vitals", "Lighthouse",
];

function Marquee() {
  const items = [...SKILLS, ...SKILLS];
  return (
    <div className="overflow-hidden border-y border-[#e5e8eb] bg-[#f7f8fa] py-4 select-none">
      <motion.div
        className="flex gap-6 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-6 shrink-0">
            <span className="text-[13px] font-semibold text-[#9ca3af] tracking-wide">{s}</span>
            <span className="text-[#d1d5db]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── 스킬 카드 ── */
const SKILL_GROUPS = [
  {
    category: "개발",
    icon: "⚡",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "SWR", "Canvas API"],
  },
  {
    category: "디자인",
    icon: "🎨",
    skills: ["Figma", "Framer Motion", "Tailwind CSS", "Atomic Design", "반응형 UI"],
  },
  {
    category: "데이터 & 성능",
    icon: "📊",
    skills: ["GA4", "Datadog", "SQL", "Lighthouse", "Core Web Vitals", "Bundle Analysis"],
  },
];

/* ── 타임라인 ── */
const TIMELINE = [
  {
    period: "2024 — 현재",
    role: "시니어 프론트엔드 엔지니어",
    place: "핀테크 스타트업",
    desc: "KPI 대시보드 구축, 성능 최적화, 디자인 시스템 설계",
    color: "#4f46e5",
  },
  {
    period: "2022 — 2024",
    role: "프론트엔드 엔지니어",
    place: "커머스 플랫폼",
    desc: "주요 화면 LCP 2초 단축, Atomic Design 도입, 코드 리뷰 문화 구축",
    color: "#10b981",
  },
  {
    period: "2020 — 2022",
    role: "주니어 개발자",
    place: "디자인 에이전시",
    desc: "UI 개발 및 퍼블리싱, Figma-to-Code 워크플로우 정립",
    color: "#f59e0b",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white">
      {/* 마퀴 */}
      <Marquee />

      {/* 소개 텍스트 */}
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* 왼쪽 */}
          <div>
            <FadeUp delay={0}>
              <p className="t-label mb-5">About me</p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h2 className="t-section text-[#111827] mb-6 leading-[1.15]">
                코드와 디자인,<br />
                두 언어를 씁니다.
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="t-body mb-5">
                5년 차 프론트엔드 엔지니어이자 UI 디자이너입니다.
                Figma에서 시작한 아이디어를 Next.js로 구현하고,
                GA4와 Datadog으로 결과를 측정합니다.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="t-body mb-8">
                단순히 화면을 만드는 것에 그치지 않습니다.
                엑셀로 관리되던 KPI를 실시간 대시보드로 전환해 매출을 27% 끌어올렸고,
                주요 화면의 LCP를 4.2s → 2.1s로 단축했습니다.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {["주도적 문제해결", "데이터 드리븐", "팀 친화적", "이타성 91점"].map((v) => (
                  <span key={v} className="badge">{v}</span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* 오른쪽 — 숫자 카드 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "−2s", label: "LCP 단축", sub: "4.2s → 2.1s", color: "#4f46e5", bg: "#eef2ff" },
              { value: "+27%", label: "매출 기여", sub: "KPI 대시보드", color: "#10b981", bg: "#ecfdf5" },
              { value: "98점", label: "Lighthouse", sub: "Performance", color: "#f59e0b", bg: "#fffbeb" },
              { value: "5년", label: "실무 경력", sub: "2020 — 현재", color: "#6366f1", bg: "#eef2ff" },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 border border-[#e5e8eb] hover:shadow-md transition-shadow"
                  style={{ background: s.bg }}
                >
                  <div
                    className="text-3xl font-extrabold tracking-[-0.03em] mb-1"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold text-[#111827]">{s.label}</div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">{s.sub}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* 스킬 섹션 */}
      <div id="skills" className="bg-[#f7f8fa] border-y border-[#e5e8eb]">
        <div className="container py-16 md:py-20">
          <FadeUp>
            <p className="t-label mb-3">Skills</p>
            <h2 className="t-section text-[#111827] mb-12">사용하는 기술</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((g, i) => (
              <FadeUp key={g.category} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <span className="text-2xl mb-3 block">{g.icon}</span>
                  <h3 className="font-bold text-[#111827] mb-4">{g.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-[#f7f8fa] border border-[#e5e8eb] text-[#374151] text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* 경력 타임라인 */}
      <div className="container py-16 md:py-20">
        <FadeUp>
          <p className="t-label mb-3">Experience</p>
          <h2 className="t-section text-[#111827] mb-12">경력</h2>
        </FadeUp>
        <div className="flex flex-col gap-0">
          {TIMELINE.map((item, i) => (
            <FadeUp key={item.period} delay={i * 0.08}>
              <div className="flex gap-6 py-7 border-b border-[#e5e8eb] group">
                {/* 컬러 바 */}
                <div
                  className="w-1 rounded-full shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-opacity"
                  style={{ background: item.color, minHeight: "100%" }}
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div>
                      <span className="font-bold text-[#111827]">{item.role}</span>
                      <span className="text-[#9ca3af] mx-2">@</span>
                      <span className="text-[#374151] font-medium">{item.place}</span>
                    </div>
                    <span className="t-label shrink-0">{item.period}</span>
                  </div>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
