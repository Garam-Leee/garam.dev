"use client";

import { GlassChip, GlassIcon, GlassPanel } from "@/components/ui/Glass";
import {
  SECTION_DESC,
  SECTION_KICKER,
  SECTION_MAX_WIDTH,
  SECTION_TITLE,
} from "@/lib/section-styles";
import { motion, useInView } from "framer-motion";
import { BarChart3, Code2, Gauge, MessagesSquare } from "lucide-react";
import { useRef } from "react";

const ease = [0.4, 0, 0.2, 1] as const;

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
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const strengths = [
  {
    title: "프론트엔드 제품 개발",
    description:
      "React, Next.js, TypeScript 기반으로 사용자 서비스와 운영 도구를 개발하며 실제 서비스 흐름에 맞는 화면 구조를 설계했습니다.",
    icon: Code2,
    metric: "React / Next.js",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "성능 개선과 운영 안정화",
    description:
      "API 호출 구조, 캐싱 전략, 이미지 최적화를 개선해 초기 로딩 시간을 줄이고 운영 중 발생하는 사용자 불편을 줄였습니다.",
    icon: Gauge,
    metric: "Performance",
    tags: ["Caching", "Lazy Loading", "WebP"],
  },
  {
    title: "데이터 기반 서비스 개선",
    description:
      "GA4, Datadog, Elastic, SQL 데이터를 바탕으로 콘텐츠 노출, 광고 배치, 사용자 흐름 개선 과제를 도출했습니다.",
    icon: BarChart3,
    metric: "Data Driven",
    tags: ["GA4", "Datadog", "Elastic", "SQL"],
  },
  {
    title: "협업과 구조화",
    description:
      "기획, 디자인, 운영, 백엔드와 협업하며 요구사항을 화면과 기능으로 정리하고 공통 컴포넌트와 개발 규칙을 개선했습니다.",
    icon: MessagesSquare,
    metric: "Collaboration",
    tags: ["Storybook", "Notion", "Code Review"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className={`mx-auto ${SECTION_MAX_WIDTH}`}>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className={SECTION_KICKER}>핵심 역량</p>

          <h2 className={`mt-3 ${SECTION_TITLE}`}>
            서비스를 이해하고,
            <br />
            필요한 구조를 만듭니다.
          </h2>

          <p className={SECTION_DESC}>
            사용자 경험, 운영 효율, 성능, 데이터 흐름을 함께 고려하며
            프론트엔드 관점에서 제품을 개선해왔습니다.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2">
          {strengths.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeUp key={item.title} delay={index * 0.04}>
                <GlassPanel
                  as="article"
                  interactive
                  className="group h-full rounded-[20px] p-5 duration-200 hover:-translate-y-0.5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <GlassIcon className="h-11 w-11 shrink-0 rounded-[14px]">
                      <Icon size={22} strokeWidth={2.2} />
                    </GlassIcon>

                    <div className="min-w-0 flex-1">
                      <GlassChip className="mb-2 px-2.5 py-1 text-[12px] font-semibold leading-4 text-[#4e5968]">
                        {item.metric}
                      </GlassChip>

                      <h3 className="text-[18px] font-bold leading-[26px] tracking-[-0.02em] text-[#191f28] sm:text-[20px] sm:leading-7">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[14px] font-normal leading-[22px] text-[#6b7684] sm:text-[15px] sm:leading-7">
                        {item.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <GlassChip
                            key={tag}
                            className="px-2.5 py-1 text-[12px] font-semibold leading-4 text-[#4e5968]"
                          >
                            {tag}
                          </GlassChip>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}