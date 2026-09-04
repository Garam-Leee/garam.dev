"use client";

import { experiences } from "@/lib/portfolio";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Experience = (typeof experiences)[number];

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

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#f8fafc] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1024px]">
        <FadeUp className="text-center">
          <p className="text-sm font-bold text-[#2663f2]">경력사항</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.7rem)] font-semibold leading-[1.2] tracking-normal text-[#111111]">
            다양한 서비스에서
            <br className="hidden sm:block" /> 제품 경험을 쌓아왔습니다.
          </h2>
        </FadeUp>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="mb-8 text-center text-xs font-bold text-[#8b95a1]">
            업무 경험
          </p>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <FadeUp key={experience.company+index} delay={index * 0.06}>
                <ExperienceItem
                  experience={experience}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((current) => (current === index ? -1 : index))
                  }
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
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
  return (
    <article className="grid gap-4 md:grid-cols-[128px_28px_1fr]">
      <div className="pt-1 text-sm font-semibold text-[#8b95a1] md:text-right">
        {experience.period}
      </div>

      <div className="relative hidden justify-center md:flex">
        <span
          className="mt-2 h-3 w-3 rounded-full ring-4 ring-white"
          style={{ backgroundColor: experience.accent }}
        />
        <span className="absolute bottom-[-2rem] top-8 w-px bg-[#d9e1ec]" />
      </div>

      <div className="rounded-[28px] border border-[#e5e8eb] bg-white p-6 shadow-[0_10px_34px_rgba(25,31,40,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(25,31,40,0.1)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-2xl text-sm font-black text-white"
                style={{ backgroundColor: experience.accent }}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-normal text-[#111111]">
                  {experience.company}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#8b95a1]">
                  {experience.role}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#6b7684]">
              {experience.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="w-fit shrink-0 whitespace-nowrap rounded-full border border-[#d9e1ec] bg-[#f8fafc] px-3 py-1.5 text-xs font-bold text-[#2663f2] transition hover:bg-[#eef4ff] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
            aria-expanded={isOpen}
          >
            {isOpen ? "주요 업무 내용 가리기" : "주요 업무 내용 보기"}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {experience.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[#d9e1ec] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#4e5968]"
            >
              {tool}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-2.5 rounded-2xl bg-[#f5f6f8] p-5 text-sm leading-7 text-[#4e5968]">
                {experience.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b95a1]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
