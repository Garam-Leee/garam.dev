"use client";

import { GlassChip, GlassPanel, glassStyles } from "@/components/ui/Glass";
import { experiences } from "@/lib/portfolio";
import { SECTION_KICKER, SECTION_TITLE_LARGE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Experience = (typeof experiences)[number];

const ease = [0.4, 0, 0.2, 1] as const;

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      id="experience"
      className="relative overflow-hidden bg-transparent px-4 py-24 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="relative mx-auto max-w-[960px]">
        <header className="mx-auto mb-14 max-w-[720px] text-center sm:mb-16">
          <p className={SECTION_KICKER}>경력</p>

          <h2 className={`mt-3 ${SECTION_TITLE_LARGE}`}>
            서비스를 만들고,
            <br />
            개선해온 과정입니다.
          </h2>
        </header>

        <div className="relative">
          <div className="absolute left-[8px] top-1 h-[calc(100%-4px)] w-px bg-gradient-to-b from-[#3182f6]/70 via-[#d9e1ec] to-transparent sm:left-[180px]" />

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={`${experience.company}-${experience.period}`}
                experience={experience}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TimelineItem({
  experience,
  index,
  isOpen,
  onToggle,
}: {
  experience: Experience;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const visibleAchievements = experience.highlights.slice(0, 3);
  const details = experience.highlights.slice(3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.38, delay: index * 0.05, ease }}
      className="relative grid gap-4 pl-9 sm:grid-cols-[144px_1fr] sm:gap-16 sm:pl-0"
    >
      <span
        className={cn(
          "absolute left-0 top-[6px] z-10 h-[17px] w-[17px] rounded-full border-[4px] border-white transition",
          isOpen
            ? "bg-[#3182f6] shadow-[0_0_0_5px_rgba(49,130,246,0.12)]"
            : "bg-[#d1d6db] shadow-[0_0_0_1px_rgba(229,232,235,0.95)]",
          "sm:left-[172px]"
        )}
      />

      <div className="sm:text-right">
        <p
          className={cn(
            "text-[13px] font-bold leading-5 transition",
            isOpen ? "text-[#3182f6]" : "text-[#8b95a1]"
          )}
        >
          {experience.period}
        </p>
      </div>

      <div className="min-w-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group w-full text-left focus:outline-none"
        >
          <div className="flex items-start justify-between gap-4 sm:gap-5">
            <div className="min-w-0">
              <p className="mb-2 text-[13px] font-semibold leading-5 text-[#8b95a1]">
                {experience.role}
              </p>

              <h3 className="text-[24px] font-bold leading-[30px] tracking-[-0.04em] text-[#191f28] sm:text-[30px] sm:leading-[38px]">
                {experience.company}
              </h3>

              <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-[#4e5968]">
                {experience.summary}
              </p>
            </div>

            <span
              className={cn(
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full transition",
                isOpen
                  ? "bg-[#3182f6] text-white shadow-[0px_4px_12px_rgba(49,130,246,0.22)]"
                  : cn(
                      glassStyles.chip,
                      "text-[#8b95a1] group-hover:bg-white/70 group-hover:text-[#3182f6]"
                    )
              )}
            >
              <ChevronDown
                size={18}
                strokeWidth={2.3}
                className={cn("transition", isOpen && "rotate-180")}
              />
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -6 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease }}
              className="overflow-hidden"
            >
              <GlassPanel className="mt-5 rounded-[22px] px-5 py-5 sm:mt-6 sm:px-6">
                <div>
                  <p className="mb-3 text-[11px] font-bold leading-4 tracking-[0.08em] text-[#3182f6]">
                    IMPACT
                  </p>

                  <ul className="space-y-2">
                    {visibleAchievements.map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[6px_1fr] gap-3 text-[14px] leading-[22px] text-[#333d4b]"
                      >
                        <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#3182f6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {details.length > 0 && (
                  <div className="mt-5 border-t border-white/60 pt-5">
                    <p className="mb-3 text-[11px] font-bold leading-4 tracking-[0.08em] text-[#8b95a1]">
                      DETAILS
                    </p>

                    <ul className="space-y-2">
                      {details.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[6px_1fr] gap-3 text-[14px] leading-[22px] text-[#6b7684]"
                        >
                          <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-[#b0b8c1]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/60 pt-5">
                  {experience.tools.map((tool) => (
                    <GlassChip
                      key={tool}
                      className="px-3 py-1.5 text-[12px] font-semibold leading-4 text-[#4e5968]"
                    >
                      {tool}
                    </GlassChip>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}