import type { ChatIntent } from "@/lib/portfolio";

export const ease = [0.4, 0, 0.2, 1] as const;
export const CONTENT_MAX_WIDTH = "max-w-[1080px]";
export const CHAT_MAX_WIDTH = "max-w-3xl";

export const assistantBubbleClass =
  "max-w-[82%] rounded-[18px] border border-[#e5e8eb]/70 bg-white/58 px-5 py-4 text-left text-[15px] font-normal leading-7 text-[#333d4b] backdrop-blur-2xl sm:max-w-[720px] sm:px-6";

export const userBubbleClass =
  "max-w-[82%] rounded-[18px] border border-[#191f28]/8 bg-[#191f28]/86 px-5 py-3 text-[15px] font-normal leading-7 text-white shadow-[0_10px_28px_rgba(25,31,40,0.12)] backdrop-blur-xl sm:max-w-[70%]";

export const questionButtonClass =
  "group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#e5e8eb]/70 bg-white/48 px-3.5 py-2 text-[13px] font-semibold text-[#4e5968] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(25,31,40,0.045)] backdrop-blur-xl transition-all duration-150 hover:-translate-y-0.5 hover:border-[#3182f6]/24 hover:bg-white/72 hover:text-[#2272eb] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_rgba(25,31,40,0.07)] focus:outline-none focus:ring-2 focus:ring-[#3182f6]/30 disabled:cursor-not-allowed disabled:opacity-40";

export const chatInputShellClass =
  "flex min-w-0 items-center gap-1.5 rounded-[18px] border border-[#e5e8eb]/72 bg-white/54 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_12px_30px_rgba(25,31,40,0.06)] backdrop-blur-2xl transition duration-150 focus-within:border-[#3182f6]/30 focus-within:bg-white/70 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_14px_34px_rgba(25,31,40,0.075)] sm:gap-2 sm:px-4 sm:py-3";

export function detectIntent(question: string): ChatIntent {
  const value = question.toLowerCase();

  if (
    value.includes("프로젝트") ||
    value.includes("서비스") ||
    value.includes("work") ||
    value.includes("project")
  ) {
    return "work";
  }

  if (
    value.includes("개선") ||
    value.includes("성과") ||
    value.includes("growth") ||
    value.includes("impact")
  ) {
    return "growth";
  }

  if (
    value.includes("기술") ||
    value.includes("스택") ||
    value.includes("react") ||
    value.includes("next")
  ) {
    return "tools";
  }

  if (
    value.includes("개발자") ||
    value.includes("소개") ||
    value.includes("about")
  ) {
    return "developer";
  }

  if (
    value.includes("연락") ||
    value.includes("메일") ||
    value.includes("chat") ||
    value.includes("contact")
  ) {
    return "chat";
  }

  if (
    value.includes("resume") ||
    value.includes("이력서") ||
    value.includes("cv")
  ) {
    return "resume";
  }

  if (value.includes("linkedin")) {
    return "linkedin";
  }

  return "fallback";
}

export function openTarget(href: string, external?: boolean) {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = href;
}
