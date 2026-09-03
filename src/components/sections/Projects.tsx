"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  year: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

// TODO: 실제 프로젝트 데이터로 교체
const PROJECTS: Project[] = [
  {
    id: "kpi-dashboard",
    title: "실시간 KPI 대시보드",
    description: "운영자 엑셀 → 실시간 시각화로 전환, 매출 27% 기여",
    longDescription:
      "GA4, Datadog, SQL 데이터를 연동해 운영팀이 엑셀로 관리하던 KPI를 실시간 인터랙티브 대시보드로 시각화했습니다. Canvas API 기반 차트 렌더링으로 수만 건 데이터를 매끄럽게 처리합니다.",
    tags: ["Next.js", "TypeScript", "Canvas API", "GA4", "SQL"],
    metrics: [
      { label: "매출 증가", value: "+27%" },
      { label: "운영 시간 단축", value: "−4h/day" },
    ],
    year: "2024",
    featured: true,
  },
  {
    id: "perf-optimization",
    title: "Core Web Vitals 최적화",
    description: "주요 화면 LCP 2초 단축, Lighthouse 98점",
    longDescription:
      "네트워크 분석, 번들 최적화, 이미지 최적화, 코드 스플리팅을 통해 주요 랜딩 페이지의 LCP를 4.2s → 2.1s로 단축했습니다. SWR 캐싱 전략으로 API 비용도 절감했습니다.",
    tags: ["Next.js", "SWR", "Bundle Analysis", "Image Optimization"],
    metrics: [
      { label: "LCP 개선", value: "−2.1s" },
      { label: "Lighthouse", value: "98점" },
    ],
    year: "2024",
    featured: true,
  },
  {
    id: "design-system",
    title: "Atomic Design System",
    description: "컴포넌트 시스템 구축 및 온보딩 가이드 제작",
    longDescription:
      "Atomic Design 방법론을 도입해 재사용 가능한 컴포넌트 라이브러리를 구축했습니다. 신규 입사자 온보딩 가이드를 함께 작성해 팀 생산성을 향상시켰습니다.",
    tags: ["React", "Storybook", "TypeScript", "Atomic Design"],
    metrics: [
      { label: "컴포넌트 재사용률", value: "78%" },
      { label: "온보딩 시간 단축", value: "−3days" },
    ],
    year: "2023",
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
  isSelected: boolean;
  index: number;
}

function ProjectCard({ project, onClick, isSelected: _isSelected, index }: ProjectCardProps) {
  return (
    <motion.article
      layoutId={`project-${project.id}`}
      onClick={() => onClick(project.id)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -4 }}
      className="group relative border border-[#1a1a1a] rounded-2xl p-6 md:p-8 cursor-pointer bg-[#0c0c0c] hover:border-[#2a2a2a] transition-colors duration-300 overflow-hidden"
    >
      {/* 호버 그라데이션 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(232, 255, 71, 0.04) 0%, transparent 70%)"
        }}
      />

      {/* 헤더 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          {project.featured && (
            <span className="inline-block text-[10px] font-mono tracking-[0.15em] text-[#e8ff47] mb-2">
              FEATURED
            </span>
          )}
          <h3 className="text-lg font-semibold text-[#f0f0f0]">{project.title}</h3>
        </div>
        <span className="text-xs text-[#444] font-mono">{project.year}</span>
      </div>

      <p className="text-sm text-[#888] mb-6 leading-relaxed">{project.description}</p>

      {/* 메트릭 배지 */}
      <div className="flex gap-3 mb-6">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col">
            <span className="text-base font-semibold text-[#e8ff47]">{m.value}</span>
            <span className="text-[10px] text-[#555]">{m.label}</span>
          </div>
        ))}
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[11px] rounded-full border border-[#1e1e1e] text-[#555] font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 화살표 */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-[#e8ff47] text-lg">→</span>
      </div>
    </motion.article>
  );
}

// 프로젝트 상세 모달 — Framer Motion layoutId Shared Element
function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[#080808]/90" />

        <motion.div
          layoutId={`project-${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#222] rounded-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#444] hover:text-[#f0f0f0] transition-colors text-xl"
          >
            ✕
          </button>

          <span className="text-[10px] font-mono tracking-[0.15em] text-[#e8ff47]">
            {project.year}
          </span>
          <h2 className="text-2xl font-semibold text-[#f0f0f0] mt-2 mb-4">{project.title}</h2>

          <p className="text-[#888] leading-relaxed mb-8">{project.longDescription}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-4 border border-[#1a1a1a] rounded-xl">
                <div className="text-2xl font-bold text-[#e8ff47]">{m.value}</div>
                <div className="text-xs text-[#555] mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs rounded-full border border-[#222] text-[#666] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#e8ff47] text-[#080808] text-sm font-semibold rounded-full hover:opacity-80 transition-opacity"
              >
                라이브 보기 ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[#333] text-[#888] text-sm rounded-full hover:border-[#555] transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <section id="projects" className="py-32 md:py-40">
      <div className="container-main">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-mono text-[#444] tracking-[0.2em] mb-4">02 — PROJECTS</p>
            <TextReveal
              text="결과로 말하는 프로젝트"
              className="text-heading text-[#f0f0f0]"
            />
          </div>
          <a
            href="https://github.com/garamdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-sm text-[#555] hover:text-[#888] transition-colors"
          >
            GitHub에서 더 보기 →
          </a>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedId}
              isSelected={selectedId === project.id}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* 상세 모달 */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
