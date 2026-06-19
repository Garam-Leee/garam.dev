import { GlassChip, glassStyles } from "@/components/ui/Glass";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "./Projects";

const ease = [0.4, 0, 0.2, 1] as const;

export function ProjectCard({
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
      className={cn(
        glassStyles.panelInteractive,
        "group relative flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-[24px] p-5 text-left transition-all focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0))]" />

      <div className="relative mb-5 flex items-center justify-end">
        <GlassChip className="px-2.5 py-1 text-right text-[12px] font-semibold leading-[1.4] text-[#8b95a1]">
          {project.period}
        </GlassChip>
      </div>

      <h3 className="relative text-[22px] font-bold leading-[1.28] tracking-[-0.035em] text-[#191f28] transition-colors group-hover:text-[#3182f6]">
        {project.title}
      </h3>

      <p className="relative mt-3 line-clamp-3 text-[14px] leading-[1.75] text-[#6b7684]">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tools.slice(0, 3).map((tool) => (
          <GlassChip
            key={tool}
            className="px-2.5 py-1 text-[12px] font-semibold text-[#4e5968]"
          >
            {tool}
          </GlassChip>
        ))}

        {project.tools.length > 3 && (
          <GlassChip className="px-2.5 py-1 text-[12px] font-semibold text-[#8b95a1]">
            +{project.tools.length - 3}
          </GlassChip>
        )}
      </div>

      <div className="relative mt-auto flex items-center justify-between border-t border-white/58 pt-5">
        <span className="text-[13px] font-bold text-[#8b95a1] transition-colors group-hover:text-[#3182f6]">
          자세히 보기
        </span>

        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#3182f6] text-white transition-transform group-hover:translate-x-1">
          <ArrowRight size={16} strokeWidth={2.4} />
        </span>
      </div>
    </motion.button>
  );
}
