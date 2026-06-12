"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const strengths = [
  {
    title: "모던 프론트엔드 개발",
    description:
      "React, Next.js, TypeScript 기반으로 사용자 서비스와 운영 시스템을 개발하고 유지보수했습니다.",
    image: "frontend",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "서비스 개선 및 최적화",
    description:
      "이미지 최적화, API 호출 구조 개선, 캐싱 전략 적용을 통해 초기 로딩 시간을 약 2초 단축했습니다.",
    image: "performance",
    tags: ["-2.0s", "Lazy Loading", "Caching"],
  },
  {
    title: "데이터 기반 의사결정",
    description:
      "GA4, Datadog, Elastic, SQL 데이터를 활용해 콘텐츠 편성, 추천 영역, 광고 배치 전략을 개선했습니다.",
    image: "data",
    tags: ["GA4", "Datadog", "Elastic", "SQL"],
  },
  {
    title: "커뮤니케이션 및 협업",
    description:
      "기획, 디자인, 운영 조직과 협업하며 사용자 문의와 운영 이슈를 개발 과제로 연결했습니다.",
    image: "collaboration",
    tags: ["Notion", "Jira", "Code Review"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1024px]">
        <FadeUp className="text-center">
          <p className="text-sm font-bold text-[#2663f2]">핵심 역량</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.7rem)] font-semibold leading-[1.2] tracking-[-0.04em] text-[#111111]">
            서비스를 이해하고, 데이터를 보고,
            <br className="hidden sm:block" /> 사용자 경험을 개선합니다.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {strengths.map((item, index) => (
            <FadeUp key={item.title} delay={index * 0.06}>
              <article className="group h-full overflow-hidden rounded-[28px] border border-[#e5e8eb] bg-white shadow-[0_10px_34px_rgba(25,31,40,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(25,31,40,0.1)]">
                <div className="relative h-[220px] overflow-hidden bg-[#f5f6f8]">
                  <MockVisual type={item.image} />

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0),rgba(245,246,248,0.88)_76%)]" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#111111]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6b7684]">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#d9e1ec] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#4e5968]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockVisual({ type }: { type: string }) {
  if (type === "frontend") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-24 w-24 place-items-center rounded-[28px] bg-white shadow-[0_14px_34px_rgba(25,31,40,0.12)]"
        >
          <span className="text-5xl text-[#00d8ff]">⚛</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="absolute bottom-10 left-20 grid h-14 w-14 place-items-center rounded-xl bg-[#f7df1e] text-xl font-black text-[#111111] shadow-md"
        >
          JS
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute bottom-10 left-40 grid h-14 w-14 place-items-center rounded-xl bg-[#3178c6] text-xl font-black text-white shadow-md"
        >
          TS
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute bottom-10 right-24 grid h-14 w-14 place-items-center rounded-xl bg-[#111111] text-lg font-black text-white shadow-md"
        >
          N
        </motion.div>
      </div>
    );
  }

  if (type === "performance") {
    return (
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-8">
        <MetricCard title="FCP" value="0.59s" color="#2663f2" />
        <MetricCard title="LCP" value="1.81s" color="#03b26c" />
        <MetricCard title="INP" value="64ms" color="#2663f2" />
      </div>
    );
  }

  if (type === "data") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[260px] rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_16px_40px_rgba(25,31,40,0.1)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-[#8b95a1]">Daily Report</p>
            <span className="rounded-full bg-[#e7f8f0] px-2 py-1 text-[10px] font-bold text-[#03b26c]">
              +27%
            </span>
          </div>

          <ChartLine color="#2663f2" />
          <ChartLine color="#03b26c" delay={0.2} />
          <ChartLine color="#ff8a00" delay={0.4} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[190px] w-[300px]">
        <motion.div
          animate={{ rotate: [-4, -2, -4], y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-4 h-28 w-56 rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_14px_34px_rgba(25,31,40,0.1)]"
        >
          <p className="text-xs font-bold text-[#111111]">Notion 업무 정리</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-36 rounded-full bg-[#e5e8eb]" />
            <div className="h-2 w-28 rounded-full bg-[#e5e8eb]" />
            <div className="h-2 w-40 rounded-full bg-[#e5e8eb]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: [5, 2, 5], y: [0, 5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 right-0 h-32 w-52 rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_14px_34px_rgba(25,31,40,0.1)]"
        >
          <p className="text-xs font-bold text-[#2663f2]">Jira</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-32 rounded-full bg-[#dbeafe]" />
            <div className="h-2 w-24 rounded-full bg-[#dbeafe]" />
            <div className="h-2 w-36 rounded-full bg-[#dbeafe]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-28 rounded-2xl border border-[#e5e8eb] bg-white p-4 shadow-[0_14px_34px_rgba(25,31,40,0.1)]"
    >
      <p className="text-xs text-[#6b7684]">{title}</p>
      <p className="mt-2 text-lg font-black" style={{ color }}>
        {value}
      </p>
      <div className="mt-3 h-1 rounded-full bg-[#e5e8eb]">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "78%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}

function ChartLine({
  color,
  delay = 0,
}: {
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ width: "20%" }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease }}
      className="mb-3 h-2 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}