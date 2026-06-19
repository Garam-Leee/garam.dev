import { profile } from "@/data/profile";

export const quickQuestions = [
  { label: "About Me", intent: "developer" },
  { label: "My Work", intent: "work" },
  { label: "How I Improve Products", intent: "growth" },
  { label: "Tech Stack", intent: "tools" },
  { label: "Let's Talk", intent: "chat" },
  { label: "Resume", intent: "resume" },
  { label: "LinkedIn", intent: "linkedin" },
] as const;

export type ChatIntent = (typeof quickQuestions)[number]["intent"] | "fallback";

export const chatAnswers: Record<
  ChatIntent,
  {
    text: string;
    actionLabel?: string;
    actionHref?: string;
    external?: boolean;
    download?: string;
  }
> = {
  developer: {
    text: "프론트엔드 개발을 중심으로 사용자 경험과 비즈니스 가치를 함께 고민합니다. 웹툰 플랫폼, 헬스케어 서비스, 운영 도구를 개발하며 성능 최적화, 데이터 기반 개선, 디자인 시스템 구축 경험을 쌓아왔습니다.",
  },

  work: {
    text: "콘텐츠 플랫폼, 결제 시스템, 운영 백오피스, KPI 대시보드, 헬스케어 서비스 등 다양한 제품을 개발했습니다. 단순 기능 구현보다 사용자의 문제를 해결하고 서비스 성장을 만드는 과정에 집중합니다.",
    actionLabel: "프로젝트 보기",
    actionHref: "#projects",
  },

  growth: {
    text: "Datadog, Elastic, GA4, SQL 등을 활용해 사용자 행동과 서비스 지표를 분석합니다. 데이터 기반으로 개선 과제를 도출하고 콘텐츠 노출, 광고 영역, 사용자 흐름을 개선해 실제 매출 성장과 성능 개선으로 연결한 경험이 있습니다.",
  },

  tools: {
    text: "React, Next.js, TypeScript를 중심으로 개발하며 SWR, Zustand, Storybook을 활용해 유지보수 가능한 구조를 만듭니다. 성능 최적화와 운영 효율을 고려한 아키텍처 설계에도 관심이 많습니다.",
  },

  chat: {
    text: "서비스 개발, 프론트엔드 아키텍처, 데이터 기반 개선, 협업 문화에 대한 이야기를 좋아합니다. 편하게 연락 주세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },

  resume: {
    text: "경력 기술서와 주요 프로젝트 경험, 기술 역량을 확인할 수 있습니다.",
    actionLabel: "이력서 보기",
    actionHref: profile.resumeUrl,
    external: true,
    download: "garam-lee-product-frontend-engineer.pdf",
  },

  linkedin: {
    text: "경력 이력과 프로젝트 경험을 LinkedIn에서도 확인할 수 있습니다.",
    actionLabel: "LinkedIn 보기",
    actionHref: profile.linkedinUrl,
    external: true,
  },

  fallback: {
    text: "프로젝트 경험, 기술 스택, 서비스 개선 사례, 데이터 분석 경험에 대해 질문해보세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },
};
