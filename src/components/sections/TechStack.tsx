"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Category = "frontend" | "library" | "deploy" | "design";

type TechItem = {
  name: string;
  category: Category;
  icon?: string;
  fallback?: string;
};

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
    <section
      id="skills"
      className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1024px] text-center">
        <p className="text-sm font-bold text-[#2663f2]">기술 스택 및 도구</p>

        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#111111]">
          아래의 기술을 사용할 수 있습니다.
        </h2>

        <div className="mx-auto mt-10 inline-flex rounded-full bg-[#f2f4f7] p-1">
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
                  "relative rounded-full px-4 py-2 text-sm font-bold transition",
                  isActive
                    ? "text-[#111111]"
                    : "text-[#9aa4b2] hover:text-[#4e5968]",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tech-tab"
                    className="absolute inset-0 rounded-full border border-[#2663f2] bg-white shadow-sm"
                    transition={{ duration: 0.28 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mx-auto mt-12 min-h-[320px] max-w-[720px]">
          <div className="absolute inset-0 -z-0 blur-2xl">
            <div className="grid grid-cols-5 gap-6 opacity-25">
              {techItems.map((item, index) => (
                <div
                  key={`${item.name}-ghost-${index}`}
                  className="h-14 w-14 rounded-2xl bg-[linear-gradient(135deg,#f3edff,#dff1ff,#fff7cc)]"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-fit grid-cols-5 justify-items-center gap-4">
            {techItems.map((item, index) => {
              const isDimmed = active !== null && active !== item.category;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.86, y: 10 }}
                  animate={{
                    opacity: isDimmed ? 0.16 : 1,
                    scale: 1,
                    y: 0,
                    filter: isDimmed ? "blur(8px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.025,
                  }}
                  className="group relative"
                >
                  <div
                    className={[
                      "grid h-14 w-14 place-items-center rounded-xl bg-white shadow-[0_8px_22px_rgba(25,31,40,0.12)] ring-1 ring-[#e5e8eb] transition",
                      isDimmed
                        ? "pointer-events-none"
                        : "group-hover:-translate-y-1 group-hover:shadow-[0_14px_30px_rgba(25,31,40,0.16)]",
                    ].join(" ")}
                  >
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="h-8 w-8 object-contain"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-sm font-black tracking-[-0.03em] text-[#111111]">
                        {item.fallback}
                      </span>
                    )}
                  </div>

                  {!isDimmed && (
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#111111] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition group-hover:opacity-100">
                      {item.name}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}