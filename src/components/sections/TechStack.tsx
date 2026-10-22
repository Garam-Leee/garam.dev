"use client";

import { ease } from "@/lib/motion";

import { categories, techItems, type Category, type TechItem } from "@/data/tech-stack";
import { GlassPanel, glassStyles } from "@/components/ui/Glass";
import {
  SECTION_KICKER,
  SECTION_TITLE,
} from "@/lib/section-styles";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

function TechIcon({ name, icon, fallback }: TechItem) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      role="img"
      aria-label={name}
      className="grid h-7 w-7 place-items-center text-[12px] font-black tracking-[-0.03em] text-heading sm:h-8 sm:w-8 sm:text-sm"
    >
      {icon && !failed ? (
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        fallback ?? name.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}


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
        <p className={SECTION_KICKER}>기술과 적용 영역</p>

        <h2 className={`mx-auto mt-3 max-w-[720px] ${SECTION_TITLE}`}>
          경력에서 적용한 기술을 과제별로 정리했습니다.
        </h2>

        <GlassPanel className="mx-auto mt-8 flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-[20px] p-1.5 sm:mt-10 sm:inline-flex sm:flex-nowrap sm:rounded-full sm:p-1">
          {categories.map((category) => {
            const isActive = active === category.key;

            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={isActive}
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
                  className="group relative flex w-[64px] flex-col items-center sm:w-[84px]"
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
                    <TechIcon {...item} />
                  </div>

                  <span className="mt-2 text-center text-[11px] font-semibold leading-4 text-body">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
