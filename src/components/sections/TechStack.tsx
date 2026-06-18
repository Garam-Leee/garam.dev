"use client";

import { GlassPanel, glassStyles } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";
import {
  SECTION_KICKER,
  SECTION_TITLE,
} from "@/lib/section-styles";
import { motion } from "framer-motion";
import { useState } from "react";

type Category = "frontend" | "library" | "deploy" | "design";

type TechItem = {
  name: string;
  category: Category;
  icon?: string;
  fallback?: string;
};

const ease = [0.4, 0, 0.2, 1] as const;
const iconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const categories: { key: Category; label: string }[] = [
  { key: "frontend", label: "프론트엔드" },
  { key: "library", label: "라이브러리" },
  { key: "deploy", label: "환경 및 배포" },
  { key: "design", label: "디자인" },
];

const techItems: TechItem[] = [
  {
    name: "JavaScript",
    category: "frontend",
    icon: `${iconBase}/javascript/javascript-original.svg`,
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: `${iconBase}/typescript/typescript-original.svg`,
  },
  {
    name: "React",
    category: "frontend",
    icon: `${iconBase}/react/react-original.svg`,
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: `${iconBase}/nextjs/nextjs-original.svg`,
  },
  {
    name: "SWR",
    category: "library",
    fallback: "SWR",
  },
  {
    name: "React Query",
    category: "library",
    fallback: "RQ",
  },
  {
    name: "Emotion",
    category: "library",
    fallback: "EM",
  },
  {
    name: "Styled Components",
    category: "library",
    icon: "/icons/styled-components.png",
  },
  {
    name: "Tailwind CSS",
    category: "library",
    icon: `${iconBase}/tailwindcss/tailwindcss-original.svg`,
  },
  {
    name: "Zustand",
    category: "library",
    icon: "/icons/zustand.png",
  },
  {
    name: "React Hook Form",
    category: "library",
    fallback: "RHF",
  },
  {
    name: "GitHub",
    category: "deploy",
    icon: `${iconBase}/github/github-original.svg`,
  },
  {
    name: "Vercel",
    category: "deploy",
    icon: `${iconBase}/vercel/vercel-original.svg`,
  },
  {
    name: "AWS",
    category: "deploy",
    icon: `${iconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  },
  {
    name: "Datadog",
    category: "deploy",
    fallback: "DD",
  },
  {
    name: "Elastic",
    category: "deploy",
    icon: `${iconBase}/elasticsearch/elasticsearch-original.svg`,
  },
  {
    name: "Figma",
    category: "design",
    icon: `${iconBase}/figma/figma-original.svg`,
  },
  {
    name: "Notion",
    category: "design",
    icon: `${iconBase}/notion/notion-original.svg`,
  },
];

export default function TechStack() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <motion.section
      id="skills"
      className="relative overflow-hidden bg-transparent px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="mx-auto max-w-[1024px] text-center">
        <p className={SECTION_KICKER}>기술 스택 및 도구</p>

        <h2 className={`mx-auto mt-3 max-w-[720px] ${SECTION_TITLE}`}>
          아래의 기술을 사용할 수 있습니다.
        </h2>

        <GlassPanel className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-[20px] p-1.5 sm:mt-10 sm:inline-flex sm:flex-nowrap sm:rounded-full sm:p-1">
          {categories.map((category) => {
            const isActive = active === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() =>
                  setActive((current) =>
                    current === category.key ? null : category.key
                  )
                }
                className={[
                  "relative h-8 rounded-full px-3 text-[12px] font-bold transition sm:h-auto sm:px-4 sm:py-2 sm:text-sm",
                  isActive
                    ? "text-[#191f28]"
                    : "text-[#8b95a1] hover:text-[#4e5968]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tech-tab"
                    className={cn(glassStyles.chip, "absolute inset-0")}
                    transition={{ duration: 0.25, ease }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </GlassPanel>

        <div className="relative mx-auto mt-10 min-h-[250px] max-w-[720px] sm:mt-12 sm:min-h-[320px]">
          <div className="absolute inset-0 -z-0 overflow-hidden blur-2xl">
            <div className="mx-auto grid max-w-fit grid-cols-4 gap-4 opacity-25 sm:grid-cols-5 sm:gap-6">
              {techItems.map((item, index) => (
                <div
                  key={`${item.name}-ghost-${index}`}
                  className="h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#ffffff,#f8fbff,#f3f6fa)] sm:h-14 sm:w-14"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-fit grid-cols-4 justify-items-center gap-3 sm:grid-cols-5 sm:gap-4">
            {techItems.map((item, index) => {
              const isDimmed = active !== null && active !== item.category;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.86, y: 10 }}
                  animate={{
                    opacity: isDimmed ? 0.14 : 1,
                    scale: 1,
                    y: 0,
                    filter: isDimmed ? "blur(6px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.02,
                    ease,
                  }}
                  className="group relative"
                >
                  <div
                    className={cn(
                      glassStyles.panelInteractive,
                      "grid h-12 w-12 place-items-center rounded-xl transition sm:h-14 sm:w-14",
                      isDimmed
                        ? "pointer-events-none"
                        : "group-hover:-translate-y-1"
                    )}
                  >
                    {item.icon ? (
                      <span
                        aria-label={item.name}
                        role="img"
                        className="h-7 w-7 bg-contain bg-center bg-no-repeat sm:h-8 sm:w-8"
                        style={{ backgroundImage: `url(${item.icon})` }}
                      />
                    ) : (
                      <span className="text-[12px] font-black tracking-[-0.03em] text-[#191f28] sm:text-sm">
                        {item.fallback}
                      </span>
                    )}
                  </div>

                  {!isDimmed && (
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#191f28] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 sm:block">
                      {item.name}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
