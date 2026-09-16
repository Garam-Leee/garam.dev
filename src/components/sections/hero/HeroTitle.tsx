import { profile } from "@/lib/portfolio";
import { CONTENT_MAX_WIDTH } from "./hero-utils";

export function HeroTitle() {
  return (
    <div className={`w-full ${CONTENT_MAX_WIDTH}`}>
      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="hidden sm:block">
          <Avatar size="lg" />
        </div>

        <h1 className="min-w-0 max-w-full text-left text-[clamp(2rem,8.5vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#191f28] break-words">
          <span>I&apos;m </span>
          <span className="relative inline-block px-1.5">
            <span className="absolute inset-0 border-l-2 border-r-2 border-[#3182f6]/45 bg-[#3182f6]/10" />
            <span className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3182f6]" />
            <span className="absolute bottom-0 right-0 h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#3182f6]" />
            <span className="relative">{profile.name}</span>
          </span>
          <span> — based in Seoul.</span>
          <br />
          <span>I build product experiences,&nbsp;</span>
          <span className="inline whitespace-normal font-serif italic tracking-[-0.03em]">
            end to end.
          </span>
        </h1>
      </div>
    </div>
  );
}

export function Avatar({ size = "md" }: { size?: "md" | "lg" }) {
  const sizeClass =
    size === "lg"
      ? "h-9 w-9 sm:h-10 sm:w-10"
      : "h-8 w-8 sm:h-9 sm:w-9";

  return (
    <span className="relative shrink-0">
      <span
        className={`grid ${sizeClass} place-items-center overflow-hidden rounded-full bg-[#191f28] text-[11px] font-bold text-white shadow-[0px_1px_3px_rgba(0,0,0,0.06)] ring-2 ring-white`}
      >
        {profile.initials}
      </span>
      <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-[#03b26c] ring-2 ring-white" />
    </span>
  );
}
