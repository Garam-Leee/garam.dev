"use client";

import { projects } from "@/lib/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Project = (typeof projects)[number];

const ease = [0.16, 1, 0.3, 1] as const;

function useLockBodyScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [enabled]);
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useLockBodyScroll(Boolean(selectedProject));

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="bg-white px-5 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto mb-12 max-w-[760px] text-center">
          <p className="text-[13px] font-bold text-[#3182f6]">Projects</p>

          <h2 className="mt-3 text-[34px] font-bold leading-[1.18] tracking-[-0.04em] text-[#191f28] md:text-[48px]">
            서비스를 이해하고, 데이터를 보고,
            <br className="hidden sm:block" />
            사용자 경험을 개선합니다.
          </h2>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.title}>
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, delay: index * 0.035, ease }}
      className="group flex h-full min-h-[280px] w-full flex-col rounded-[20px] border border-[#e5e8eb] bg-white p-5 text-left shadow-[0px_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-[#3182f6] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="">
         
        </span>

        <span className="text-right text-[12px] font-semibold leading-[1.4] text-[#8b95a1]">
          {project.period}
        </span>
      </div>

      <h3 className="text-[22px] font-bold leading-[1.28] tracking-[-0.035em] text-[#191f28] transition-colors group-hover:text-[#3182f6]">
        {project.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-[14px] leading-[1.75] text-[#6b7684]">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-[#f2f4f6] px-2.5 py-1 text-[12px] font-semibold text-[#4e5968]"
          >
            {tool}
          </span>
        ))}

        {project.tools.length > 3 && (
          <span className="rounded-full bg-[#f2f4f6] px-2.5 py-1 text-[12px] font-semibold text-[#8b95a1]">
            +{project.tools.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#f2f4f6] pt-5">
        <span className="text-[13px] font-bold text-[#8b95a1] transition-colors group-hover:text-[#3182f6]">
          자세히 보기
        </span>

        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#3182f6] text-[15px] font-bold text-white transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </motion.button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#191f28]/45 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="프로젝트 상세 닫기"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.25, ease }}
            className="relative z-10 flex max-h-[calc(100dvh-32px)] w-full max-w-[760px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.16)]"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-[#e5e8eb] bg-white px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#3182f6]">
                  Project
                </p>
                <p className="mt-0.5 truncate text-[13px] font-semibold text-[#8b95a1]">
                  {project.period}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[24px] font-light text-[#8b95a1] transition hover:bg-[#f2f4f6] hover:text-[#191f28] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
                aria-label="프로젝트 상세 닫기"
              >
                ×
              </button>
            </header>

            <div
              className="min-h-0 flex-1 overflow-y-scroll overscroll-contain px-5 py-7 sm:px-7 md:px-9"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-[#e8f3ff] px-3 py-1 text-[13px] font-semibold text-[#2272eb]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <h3
                id="project-modal-title"
                className="text-[30px] font-bold leading-[1.2] tracking-[-0.045em] text-[#191f28] md:text-[42px]"
              >
                {project.title}
              </h3>

              <p className="mt-5 text-[16px] leading-[1.85] text-[#4e5968]">
                {project.summary}
              </p>

              <dl className="mt-8 grid gap-4 rounded-2xl bg-[#f9fafb] p-5 sm:grid-cols-2">
                <Info label="역할" value={project.role} />
                <Info label="참여" value={project.team} />
                <Info label="기간" value={project.period} />

                <div>
                  <dt className="text-[12px] font-bold text-[#8b95a1]">
                    링크
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.relatedLinks.map((link) =>
                      "href" in link && link.href ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-[#3182f6] px-3 py-1.5 text-[13px] font-bold text-white transition hover:bg-[#2272eb]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="rounded-full bg-[#f2f4f6] px-3 py-1.5 text-[13px] font-bold text-[#6b7684]"
                        >
                          {link.label}
                        </span>
                      )
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <SummaryCard title="문제" content={project.problem} />
                <SummaryCard title="결과" content={project.result} />
              </div>

              <section className="mt-10">
                <h4 className="text-[20px] font-bold tracking-[-0.03em] text-[#191f28]">
                  상세 내용
                </h4>

                <div className="mt-5 space-y-4">
                  {project.detailSections.map((section) => (
                    <section
                      key={section.title}
                      className="rounded-2xl border border-[#e5e8eb] bg-white p-5"
                    >
                      <h5 className="text-[16px] font-bold text-[#191f28]">
                        {section.title}
                      </h5>

                      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-[#4e5968]">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </section>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] font-bold text-[#8b95a1]">{label}</dt>
      <dd className="mt-1 text-[14px] font-semibold leading-[1.55] text-[#333d4b]">
        {value}
      </dd>
    </div>
  );
}

function SummaryCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl border border-[#e5e8eb] bg-white p-5">
      <p className="text-[13px] font-bold text-[#3182f6]">{title}</p>
      <p className="mt-2 text-[15px] leading-[1.75] text-[#4e5968]">
        {content}
      </p>
    </div>
  );
}