"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import type { GitHubStats } from "@/lib/github";

const IMPACT_METRICS = [
  {
    value: "−2s",
    label: "LCP 단축",
    detail: "4.2s → 2.1s, 주요 랜딩 페이지",
    color: "#e8ff47",
  },
  {
    value: "+27%",
    label: "매출 기여",
    detail: "KPI 대시보드 구축 후 서비스 매출",
    color: "#47b8ff",
  },
  {
    value: "98",
    label: "Lighthouse",
    detail: "Performance 점수 (desktop)",
    color: "#b847ff",
  },
  {
    value: "91",
    label: "협업 점수",
    detail: "조직 내 이타성 점수 (100점 만점)",
    color: "#ff6b47",
  },
];

// 애니메이션 카운터
function AnimatedNumber({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span
      ref={ref}
      className="text-5xl md:text-6xl font-bold leading-none"
      style={{ color }}
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      >
        {value}
      </motion.span>
    </span>
  );
}

// 언어 분포 바 차트
function LanguageBar({ name, percentage, color }: { name: string; percentage: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-xs text-[#555] font-mono w-24 shrink-0">{name}</span>
      <div className="flex-1 h-px bg-[#1a1a1a] relative">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          style={{
            background: color,
            height: "2px",
            width: `${percentage}%`,
            transformOrigin: "left",
          }}
        />
      </div>
      <span className="text-xs text-[#444] font-mono w-8 text-right">{percentage}%</span>
    </div>
  );
}

// 스킬 태그 클라우드
const TECH_STACK = [
  { name: "Next.js", level: 5 },
  { name: "TypeScript", level: 5 },
  { name: "React", level: 5 },
  { name: "SWR", level: 4 },
  { name: "GA4", level: 4 },
  { name: "Datadog", level: 3 },
  { name: "Canvas API", level: 4 },
  { name: "SQL", level: 3 },
  { name: "R3F", level: 3 },
  { name: "Framer Motion", level: 4 },
  { name: "Tailwind", level: 5 },
  { name: "Atomic Design", level: 4 },
];

interface DataStoryProps {
  githubStats: GitHubStats;
}

export default function DataStory({ githubStats }: DataStoryProps) {
  return (
    <section id="data" className="py-32 md:py-40 border-t border-[#111]">
      <div className="container-main">
        {/* 섹션 헤더 */}
        <div className="mb-20">
          <p className="text-xs font-mono text-[#444] tracking-[0.2em] mb-4">03 — DATA STORY</p>
          <TextReveal
            text="숫자가 증명하는 역량"
            className="text-heading text-[#f0f0f0] mb-4"
          />
          <p className="text-body max-w-md">
            주장보다 데이터로 말합니다. 매 프로젝트마다 측정 가능한 지표를 설정하고 개선합니다.
          </p>
        </div>

        {/* 임팩트 메트릭 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#111] border border-[#111] rounded-2xl overflow-hidden mb-20">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 bg-[#0a0a0a] flex flex-col gap-2"
            >
              <AnimatedNumber value={metric.value} color={metric.color} />
              <div className="text-sm font-medium text-[#f0f0f0] mt-2">{metric.label}</div>
              <div className="text-xs text-[#444] leading-relaxed">{metric.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* GitHub 언어 분포 */}
          <div>
            <h3 className="text-sm font-mono text-[#444] tracking-[0.15em] mb-6">
              GITHUB LANGUAGE DISTRIBUTION
            </h3>
            <div className="flex flex-col gap-4">
              {githubStats.topLanguages.length > 0 ? (
                githubStats.topLanguages.map((lang) => (
                  <LanguageBar
                    key={lang.name}
                    name={lang.name}
                    percentage={lang.percentage}
                    color={lang.color}
                  />
                ))
              ) : (
                // fallback
                [
                  { name: "TypeScript", percentage: 62, color: "#3178c6" },
                  { name: "JavaScript", percentage: 20, color: "#f1e05a" },
                  { name: "CSS", percentage: 12, color: "#563d7c" },
                  { name: "Other", percentage: 6, color: "#444" },
                ].map((lang) => (
                  <LanguageBar key={lang.name} {...lang} />
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-[#111] flex gap-8">
              <div>
                <div className="text-2xl font-bold text-[#e8ff47]">
                  {githubStats.totalCommits.toLocaleString()}
                </div>
                <div className="text-xs text-[#444] mt-1">최근 365일 커밋</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#47b8ff]">
                  {githubStats.totalStars}
                </div>
                <div className="text-xs text-[#444] mt-1">총 GitHub Stars</div>
              </div>
            </div>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="text-sm font-mono text-[#444] tracking-[0.15em] mb-6">
              TECH STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="px-3 py-1.5 border border-[#1e1e1e] rounded-full text-xs font-mono"
                  style={{
                    color: tech.level >= 5 ? "#f0f0f0" : tech.level >= 4 ? "#888" : "#555",
                    borderColor: tech.level >= 5 ? "#333" : "#1e1e1e",
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>

            {/* 일하는 방식 */}
            <div className="mt-8 pt-8 border-t border-[#111]">
              <h4 className="text-xs font-mono text-[#444] tracking-[0.15em] mb-4">WORK VALUES</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "주도적 문제 해결", desc: "코드 리뷰 · 온보딩 가이드 주도" },
                  { label: "데이터 드리븐", desc: "GA4 · Datadog 기반 의사결정" },
                  { label: "이타적 협업", desc: "이타성 91점 — 팀 화합 중시" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-start">
                    <span className="w-1 h-1 rounded-full bg-[#e8ff47] mt-2 shrink-0" />
                    <div>
                      <span className="text-sm text-[#f0f0f0]">{item.label}</span>
                      <span className="text-xs text-[#555] ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
