"use client";

import { GlassChip, GlassIcon, GlassPanel } from "@/components/ui/Glass";
import { motion, useInView } from "framer-motion";
import { BarChart3, Code2, Gauge, MessagesSquare } from "lucide-react";
import { useRef } from "react";

const ease = [0.4, 0, 0.2, 1] as const;
const SECTION_MAX_WIDTH = "max-w-[1080px]";

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
    title: "모던 프론트엔드 개발",
    description:
      "React, Next.js, TypeScript 기반으로 사용자 서비스와 운영 시스템을 개발하고 유지보수했습니다.",
    icon: Code2,
    metric: "React / Next.js",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "서비스 개선 및 최적화",
    description:
      "이미지 최적화, API 호출 구조 개선, 캐싱 전략 적용으로 초기 로딩 시간을 약 2초 단축했습니다.",
    icon: Gauge,
    metric: "초기 로딩 -2.0s",
    tags: ["Performance", "Lazy Loading", "Caching"],
  },
  {
    title: "데이터 기반 의사결정",
    description:
      "GA4, Datadog, Elastic, SQL 데이터를 활용해 콘텐츠 편성, 추천 영역, 광고 배치 전략을 개선했습니다.",
    icon: BarChart3,
    metric: "GA4 / SQL",
    tags: ["GA4", "Datadog", "Elastic", "SQL"],
  },
  {
    title: "커뮤니케이션 및 협업",
    description:
      "기획, 디자인, 운영 조직과 협업하며 사용자 문의와 운영 이슈를 개발 과제로 연결했습니다.",
    icon: MessagesSquare,
    metric: "Cross-functional",
    tags: ["Notion", "Jira", "Code Review"],
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
          <p className="text-[13px] font-bold leading-5 text-[#3182f6]">
            핵심 역량
          </p>

          <h2 className="mt-3 text-[clamp(1.75rem,6.8vw,2.65rem)] font-bold leading-[1.18] tracking-[-0.035em] text-[#191f28]">
            서비스를 이해하고,
            <br />
            사용자 경험을 개선합니다.
          </h2>

          <p className="mt-4 text-[15px] font-normal leading-7 text-[#6b7684] sm:text-[16px]">
            기능 구현에 머물지 않고 성능, 데이터, 협업 흐름까지 함께 개선하는
            프론트엔드 개발을 지향합니다.
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
