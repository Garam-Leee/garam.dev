"use client";

import { experiences } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { GlassChip, GlassPanel, glassStyles } from "@/components/ui/Glass";
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
        <header className="mb-14 max-w-[720px] sm:mb-16">
          <p className="text-[13px] font-bold leading-5 text-[#3182f6]">
            경력사항
          </p>

          <h2 className="mt-3 text-[clamp(2rem,7vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.055em] text-[#191f28]">
            문제를 발견하고,
            <br />
            제품 경험으로 바꿔왔습니다.
          </h2>

          <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#6b7684] sm:text-[16px]">
            운영 이슈, 사용자 데이터, 성능 병목을 프론트엔드 관점에서 해석하고
            실제 서비스 개선으로 연결한 흐름입니다.
          </p>
        </header>

        <div className="relative">
          <div className="absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-[#3182f6] via-[#e5e8eb] to-transparent sm:left-[180px]" />

          <div className="space-y-11 sm:space-y-12">
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
      <div
        className={[
          "absolute left-0 top-[6px] z-10 h-[18px] w-[18px] rounded-full border-[5px] border-white transition",
          isOpen
            ? "bg-[#3182f6] shadow-[0_0_0_5px_rgba(49,130,246,0.12)]"
            : "bg-[#b0b8c1] shadow-[0_0_0_1px_#e5e8eb]",
          "sm:left-[171px]",
        ].join(" ")}
      />

      <div className="sm:text-right">
        <p
          className={[
            "text-[13px] font-bold leading-5 transition",
            isOpen ? "text-[#3182f6]" : "text-[#8b95a1]",
          ].join(" ")}
        >
          {experience.period}
        </p>
      </div>

      <div className="min-w-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group w-full text-left"
        >
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="mb-1.5 text-[13px] font-semibold leading-5 text-[#8b95a1]">
                {experience.role}
              </p>

              <h3 className="text-[25px] font-bold leading-[31px] tracking-[-0.04em] text-[#191f28] sm:text-[30px] sm:leading-[38px]">
                {experience.company}
              </h3>

              <p className="mt-3.5 max-w-[640px] text-[15px] leading-7 text-[#4e5968]">
                {experience.summary}
              </p>
            </div>

            <span
              className={cn(
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full transition",
                isOpen
                  ? "border-[#3182f6]/20 bg-[#3182f6] text-white shadow-[0px_4px_12px_rgba(49,130,246,0.22)]"
                  : cn(glassStyles.chip, "text-[#8b95a1] group-hover:bg-white/62 group-hover:text-[#3182f6]")
              )}
            >
              <ChevronDown
                size={18}
                strokeWidth={2.3}
                className={isOpen ? "rotate-180 transition" : "transition"}
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
              <GlassPanel className="mt-6 rounded-[24px] px-5 py-5 sm:px-6">
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
                  <div className="mt-5 border-t border-white/58 pt-5">
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

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/58 pt-5">
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
