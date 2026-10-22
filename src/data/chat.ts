import { profile } from "@/data/profile";

export const quickQuestions = [
  { label: "개발자 소개", intent: "developer" },
  { label: "기술 사례", intent: "work" },
  { label: "성능·개선 성과", intent: "growth" },
  { label: "사용 기술", intent: "tools" },
  { label: "연락하기", intent: "chat" },
  { label: "이력서", intent: "resume" },
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
    text: "React·Next.js·TypeScript 기반의 프론트엔드 개발자 이가람입니다. 웹툰 플랫폼과 헬스케어 서비스, 운영 시스템에서 공통 구조 설계, 렌더링·데이터 요청 최적화, 연결·권한·입력 검증을 담당했습니다.",
  },

  work: {
    text: "웹툰 플랫폼의 SSR·SWR 데이터 흐름, SQL 기반 KPI 대시보드, 비대면 진료 플랫폼의 SSG 전환, Agora 실시간 상담, 관리자 권한·폼 검증, Canvas 도면 편집을 개발했습니다. 기술 사례에서 구현 과정과 성과를 확인할 수 있습니다.",
    actionLabel: "기술 사례 보기",
    actionHref: "#projects",
  },

  growth: {
    text: "웹툰 플랫폼에서는 중복 API 요청 제거와 데이터 관리 구조 개선으로 주요 화면 초기 로딩을 약 2초 단축했습니다. 비대면 진료 랜딩 페이지는 SSG 전환·메타데이터 최적화로 Lighthouse SEO 62→91점을 달성했습니다. 콘텐츠 노출·편성 개선으로 전 분기 대비 서비스 매출 약 27% 증가에 기여했습니다.",
  },

  tools: {
    text: "React·Next.js·TypeScript를 중심으로 SSR·SSG와 SWR 캐싱·재검증을 적용했습니다. Atomic Design·모노레포·Storybook으로 공통 UI를 관리하고, Agora SDK·React Hook Form·Canvas로 연결·입력·도면 편집을 구현했습니다. SQL·Elastic·Datadog·GA4는 운영 지표와 오류 분석에 활용했습니다.",
  },

  chat: {
    text: "프론트엔드 구조 설계, 데이터 요청 최적화, 실시간 연결과 운영 안정성에 관한 이야기를 나누고 싶습니다. 메일로 연락 주세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },

  resume: {
    text: "회사별 담당 업무와 주요 성과는 경력 및 기술 사례에서 확인할 수 있습니다. PDF 이력서도 내려받을 수 있습니다.",
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
    text: "SSR·SWR 성능 개선, 프론트엔드 구조 설계, 실시간 상담, KPI 대시보드 등 기술 경험을 질문해 주세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },
};
