import { GlassChip, glassStyles } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ProjectInfo } from "./ProjectInfo";
import type { Project } from "./Projects";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

export function ProjectModal({
  open,
  project,
  onOpenChange,
}: {
  open: boolean;
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[999] overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.40),rgba(248,252,255,0.26)_46%,rgba(255,255,255,0.34))] backdrop-blur-[18px]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(49,130,246,0.045)_48%,rgba(255,255,255,0.26))]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28)_50%,transparent)] opacity-80" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.94),transparent)]" />
        </Dialog.Overlay>

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[1000] w-[calc(100vw-28px)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/74 bg-white/52 shadow-[0_28px_90px_rgba(25,31,40,0.18),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl focus:outline-none sm:w-[calc(100vw-96px)]">
          {project && (
            <div className="relative flex h-[min(800px,calc(100dvh-40px))] max-h-[calc(100dvh-40px)] flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(244,248,252,0.50)_46%,rgba(255,255,255,0.62))] sm:h-[min(800px,calc(100dvh-88px))] sm:max-h-[calc(100dvh-88px)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(248,252,255,0.24)_58%,transparent)]" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,1),transparent)]" />
              <div className="pointer-events-none absolute bottom-0 left-10 right-10 h-px bg-[linear-gradient(90deg,transparent,rgba(49,130,246,0.34),transparent)]" />

              <Dialog.Close
                type="button"
                aria-label="프로젝트 상세 닫기"
                className={cn(
                  glassStyles.chip,
                  "absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center text-[#6b7684] transition hover:bg-white/80 hover:text-[#191f28] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20 sm:right-7 sm:top-7"
                )}
              >
                <X size={19} strokeWidth={2.3} />
              </Dialog.Close>

              <div
                className="modal-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 [scrollbar-width:thin] [scrollbar-color:#b0b8c1_transparent] sm:px-7 sm:pb-7 sm:pt-7 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b0b8c1]"
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
                onWheel={(event) => event.stopPropagation()}
              >
                <header className="pr-12">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    <GlassChip className="px-3 py-1.5 text-[12px] font-semibold text-[#6b7684]">
                      {project.period}
                    </GlassChip>
                  </div>

                  <Dialog.Title className="text-[28px] font-bold leading-[1.12] tracking-[-0.045em] text-[#191f28] sm:text-[38px]">
                    {project.title}
                  </Dialog.Title>

                  <Dialog.Description className="mt-3 max-w-[760px] text-[14px] leading-[1.75] text-[#4e5968] sm:text-[15px]">
                    {project.summary}
                  </Dialog.Description>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <GlassChip
                        key={tool}
                        className="px-3 py-1 text-[12px] font-semibold leading-4 text-[#2272eb]"
                      >
                        {tool}
                      </GlassChip>
                    ))}
                  </div>
                </header>

                <ProjectInfo project={project} />

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <ProjectSummaryCard title="문제" content={project.problem} />
                  <ProjectSummaryCard title="결과" content={project.result} />
                </div>

                <section className="mt-6">
                  <h4 className="px-1 text-[18px] font-bold tracking-[-0.035em] text-[#191f28]">
                    상세 내용
                  </h4>

                  <div className="mt-4 space-y-3">
                    {project.detailSections.map((section) => (
                      <section
                        key={section.title}
                        className={cn(
                          glassStyles.panel,
                          "rounded-[26px] p-4 sm:p-5"
                        )}
                      >
                        <h5 className="text-[15px] font-bold text-[#191f28]">
                          {section.title}
                        </h5>

                        <ul className="mt-3 space-y-2 text-[14px] leading-[1.68] text-[#4e5968]">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="grid grid-cols-[6px_1fr] gap-3"
                            >
                              <span className="mt-[0.7em] h-1.5 w-1.5 rounded-full bg-[#3182f6] shadow-[0_0_12px_rgba(49,130,246,0.30)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
