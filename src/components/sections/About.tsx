"use client";

import { ease } from "@/lib/motion";

import { strengths } from "@/data/strengths";
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



const strengthIcons = { Code2, Gauge, BarChart3, MessagesSquare };

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
            const Icon = strengthIcons[item.icon];

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