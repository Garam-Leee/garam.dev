export const profile = {
  name: "Garam Lee",
  initials: "GR",
  role: "Product Engineer",
  location: "Seoul, South Korea",
  email: "hello@garam.dev",
  bookingUrl: "mailto:hello@garam.dev",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com/Garam-Leee",
  linkedinUrl: "https://www.linkedin.com/in/lucylee0806",
  writingsUrl: "/posts",
};

export const navLinks = [
  { label: "소개", href: "#about" },
  { label: "경력", href: "#experience" },
  { label: "프로젝트", href: "#projects" },
  { label: "이력서", href: profile.resumeUrl, external: true },
  { label: "GitHub", href: profile.githubUrl, external: true },
  { label: "LinkedIn", href: profile.linkedinUrl, external: true },
  { label: "기술 블로그", href: profile.writingsUrl },
];

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
  }
> = {
  developer: {
    text: "저는 사용자 경험과 비즈니스 가치를 함께 고민하는 프론트엔드 개발자입니다. 콘텐츠 플랫폼, 헬스케어 플랫폼, ERP 시스템 등 다양한 서비스를 개발하며 성능 최적화, 데이터 분석, 서비스 성장 경험을 쌓아왔습니다.",
  },

  work: {
    text: "웹툰 플랫폼 쇼츠, 비대면 진료 플랫폼 올라케어, 건축 ERP, Private Cloud 대시보드 등 다양한 서비스의 개발과 운영을 경험했습니다. 단순 구현보다 사용자 문제를 해결하고 서비스 성장을 만드는 데 집중해왔습니다.",
    actionLabel: "프로젝트 보기",
    actionHref: "#projects",
  },

  growth: {
    text: "서비스 로그, 사용자 행동 데이터, 광고 클릭 데이터, KPI 지표를 분석해 개선 과제를 발굴합니다. 콘텐츠 편성, 추천 영역, 광고 배치 전략을 개선해 서비스 매출 약 27% 증가에 기여했고, 이미지·API·캐싱 최적화로 초기 로딩 시간을 약 2초 단축한 경험이 있습니다.",
  },

  tools: {
    text: "React, Next.js, TypeScript를 중심으로 개발합니다. 상태와 데이터 패칭에는 SWR, React Query를 사용했고, 스타일링에는 Emotion, Tailwind CSS를 활용했습니다. Datadog, Elastic, GA4, SQL을 통해 서비스 지표 분석과 성능 모니터링도 수행했습니다.",
  },

  chat: {
    text: "새로운 기회, 프로젝트, 기술 이야기 모두 환영합니다. 편하게 연락 주세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },

  resume: {
    text: "이력서에서 프로젝트 경험과 기술 역량을 자세히 확인하실 수 있습니다.",
    actionLabel: "이력서 보기",
    actionHref: profile.resumeUrl,
    external: true,
  },

  linkedin: {
    text: "LinkedIn에서 경력 이력과 프로젝트 경험을 더 자세히 확인하실 수 있습니다.",
    actionLabel: "LinkedIn 보기",
    actionHref: profile.linkedinUrl,
    external: true,
  },

  fallback: {
    text: "아직 준비되지 않은 질문입니다. 프로젝트 경험, 서비스 개선, 기술 스택, 이력서에 대해 물어보시거나 이메일로 연락 주세요.",
    actionLabel: "메일 보내기",
    actionHref: `mailto:${profile.email}`,
    external: true,
  },
};

export const experiences = [
  {
    company: "(주)재담미디어",
    role: "전략사업본부 플랫폼팀 / 웹툰 플랫폼 개발 및 운영",
    period: "2023.08 ~ 2024.12",
    summary:
      "Next.js 기반 사용자 서비스, 콘텐츠 운영 화면, 성능 개선, 데이터 기반 서비스 고도화를 담당했습니다.",
    tools: ["Next.js", "TypeScript", "SWR", "GA4", "Datadog", "Elastic", "SQL"],
    accent: "#FF6B35",
    highlights: [
      "메인 화면, 콘텐츠 상세, 이벤트 페이지 등 주요 사용자 접점 화면을 설계하고 구현했습니다.",
      "Atomic Design 기반 공통 컴포넌트 체계를 정리해 UI 일관성과 유지보수성을 개선했습니다.",
      "Lighthouse, 네트워크 분석을 기반으로 API 호출 구조, 캐싱, 렌더링 흐름을 개선했습니다.",
      "Datadog, WATAP, Elastic, GA4, SQL을 활용해 사용자 행동과 서비스 지표를 분석했습니다.",
      "일일 리포트와 KPI 대시보드를 통해 데이터 기반 의사결정 체계 정착에 기여했습니다.",
    ],
  },
  {
    company: "주식회사 블루앤트",
    role: "Development Unit 프론트엔드 파트 / 헬스케어 서비스 개발",
    period: "2022.03 ~ 2023.07",
    summary:
      "비대면 진료, 심리상담, 커뮤니티, 운영 어드민 등 헬스케어 서비스의 사용자 흐름을 개발했습니다.",
    tools: ["React", "TypeScript", "SWR", "Agora", "React Hook Form"],
    accent: "#2F80ED",
    highlights: [
      "진료 예약, 병원 조회, 후기, 상담 신청 등 사용자 핵심 여정을 구현하고 운영했습니다.",
      "SWR 기반 캐싱과 재검증 전략으로 반복 API 호출을 줄이고 화면 응답성을 개선했습니다.",
      "Agora 기반 실시간 음성·영상 상담 기능과 연결 상태, 권한, 예외 처리를 구현했습니다.",
      "병원, 상담사, 파트너사, 운영자를 위한 관리자 기능과 역할별 권한 흐름을 개발했습니다.",
      "이미지·폰트 최적화와 데이터 전송량 개선을 통해 모바일 로딩 성능 개선에 기여했습니다.",
    ],
  },
  {
    company: "(주)하이컴텍",
    role: "개발부 / 건축 ERP 시스템 프론트엔드 개발",
    period: "2021.09 ~ 2022.02",
    summary:
      "삼익가구 건축 ERP의 자재, 견적, 프로젝트 관리 기능과 Canvas 기반 도면 화면을 개발했습니다.",
    tools: ["React", "Canvas", "JavaScript"],
    accent: "#111111",
    highlights: [
      "React 기반 ERP 화면에서 자재 관리, 견적 관리, 프로젝트 관리 기능을 개발했습니다.",
      "사용자 입력 데이터의 정합성을 확보하기 위한 Validation과 예외 처리 로직을 구현했습니다.",
      "Canvas 도면 화면에서 드래그 앤 드롭과 좌표 계산 로직을 구현해 창호 배치 기능을 개발했습니다.",
      "운영 요구사항을 반영한 기능 개선과 UI 고도화 작업을 수행했습니다.",
    ],
  },
  {
    company: "(주)재담미디어",
    role: "SW 개발 및 엔지니어링팀 / Private Cloud 대시보드 개발",
    period: "2021.03 ~ 2021.08",
    summary:
      "Private Cloud 운영 대시보드의 공통 UI, 리스트 화면, 협업 프로세스 개선을 담당했습니다.",
    tools: ["React", "TypeScript", "Notion", "GitHub"],
    accent: "#7B61FF",
    highlights: [
      "공통 UI 컴포넌트 구조를 설계해 재사용성과 유지보수성을 고려한 개발 환경을 구축했습니다.",
      "API 중복 호출 제거와 리스트 렌더링 최적화를 통해 대시보드 응답 성능을 개선했습니다.",
      "Notion 기반 업무 관리 체계와 코드 리뷰 프로세스를 제안·도입했습니다.",
      "협업 과정의 가시성을 높이고 반복 업무를 줄이는 개발 문화를 만드는 데 기여했습니다.",
    ],
  },
];

export const projects = [
  {
    title: "재담미디어 공식 홈페이지",
    description: "콘텐츠 중심 기업 홈페이지 단독 개발",
    problem:
      "브랜드 소개뿐 아니라 WORK, NEWS, CAREER, CONTACT 등 콘텐츠 탐색과 사용자 액션이 있는 서비스형 홈페이지가 필요했습니다.",
    result:
      "Next.js 기반 공식 홈페이지를 단독 개발하고, 콘텐츠 탐색 상태 복원, SVG 캐싱, Elastic 이벤트 수집, 전역 피드백 UI를 적용해 사용자 경험과 운영성을 개선했습니다.",
    role: "프론트엔드 단독 개발, UI 설계, 콘텐츠 탐색 UX, 이벤트 트래킹",
    tools: [
      "Next.js",
      "TypeScript",
      "Emotion",
      "Zustand",
      "Framer Motion",
      "GA4",
      "Elastic",
    ],
    accent: "#FF6B35",
    team: "1명",
    period: "2024.12 ~ 2025.03",
    relatedLinks: [
      { label: "재담미디어 홈페이지", href: "https://www.jaedam.com/" },
    ],
    summary:
      "재담미디어 공식 홈페이지를 단독 개발하며 브랜드 사이트를 넘어 콘텐츠 탐색과 사용자 경험을 고려한 서비스형 웹사이트로 설계했습니다.",
    detailSections: [
      {
        title: "콘텐츠 탐색 경험 설계",
        items: [
          "WORK 목록에서 데스크톱은 Pagination, 모바일은 Load More 패턴을 적용해 디바이스별 콘텐츠 소비 방식에 맞는 탐색 경험을 설계했습니다.",
          "상세 페이지 진입 후 목록으로 복귀할 때 스크롤 위치, 필터, 페이지 상태를 복원해 사용자의 탐색 맥락이 끊기지 않도록 구현했습니다.",
          "Skeleton UI, Empty State, 검색 결과 수 요약을 분리해 비동기 상태를 사용자에게 명확하게 전달했습니다.",
        ],
      },
      {
        title: "성능과 운영성 개선",
        items: [
          "동적으로 색상과 크기가 변경되는 SVG 아이콘 렌더러에 TTL 기반 메모리 캐시를 적용해 반복 렌더링 비용을 줄였습니다.",
          "PAGE_VIEW, CONTENT_VIEW, NEWS_VIEW 이벤트를 구분해 Elastic 로그 체계를 구성하고 콘텐츠 소비 흐름을 분석할 수 있는 기반을 만들었습니다.",
          "전역 Alert, Confirm, Spinner 레이어와 Error Boundary를 구성해 사용자 피드백과 예외 대응 흐름을 공통화했습니다.",
        ],
      },
    ],
  },

  {
    title: "웹툰런 공모전 플랫폼",
    description: "전국 대학생 웹툰 경연 플랫폼 개발 및 운영",
    problem:
      "전국 24개 대학 216명의 학생이 참여하고, 사전 심사를 통과한 128개 작품을 대상으로 조회수, 하트, 응원, 댓글 지표가 반영되는 공개 경연 플랫폼이 필요했습니다.",
    result:
      "React Query 기반 SSR Hydration, 무한스크롤, 이미지 우선 로딩 전략을 적용해 작품 탐색과 웹툰 뷰어 경험을 개선하고 공모전 기간 동안 안정적으로 서비스를 운영했습니다.",
    role: "프론트엔드 개발, 웹툰 뷰어 개발, 공모전 목록 UX, 운영 대응",
    tools: [
      "Next.js",
      "TypeScript",
      "React Query",
      "Emotion",
      "Turborepo",
      "GA4",
    ],
    accent: "#2F80ED",
    team: "PM, Design, FE, BE 협업",
    period: "2024.01 ~ 2024.12",
    relatedLinks: [
      {
        label: "웹툰런 공모전",
        href: "https://www.webtoonrun.com/stadium?page=0&sort=id,desc",
      },
    ],
    summary:
      "총 1억 원 규모의 웹툰런 공모전 플랫폼을 개발하며 작품 목록, 사용자 참여, 웹툰 뷰어, 평가 흐름을 안정적으로 제공했습니다.",
    detailSections: [
      {
        title: "공모전 목록과 참여형 탐색 경험",
        items: [
          "React Query의 prefetchQuery, prefetchInfiniteQuery, HydrationBoundary를 활용해 서버 프리패치 데이터와 클라이언트 캐시를 연결했습니다.",
          "IntersectionObserver와 useInfiniteQuery를 결합한 무한스크롤 구조를 공통화해 페이지 단위 데이터 로딩과 중복 요청 방지를 구현했습니다.",
          "GA4 스크립트를 운영 HTTPS 도메인에서만 로드하도록 제한해 실제 사용자 데이터 품질을 관리했습니다.",
        ],
      },
      {
        title: "웹툰 뷰어와 사용자 피드백",
        items: [
          "웹툰 뷰어에서 초반 컷은 priority, fetchPriority로 우선 로드하고 이후 이미지는 캐시 여부에 따라 순차 로딩하도록 구성했습니다.",
          "뷰어 스크롤 위치 저장 API를 타이머 기반으로 합쳐 빠른 스크롤 중 발생할 수 있는 연속 저장 요청을 줄였습니다.",
          "Alert, Confirm, Toast, Spinner를 전역 레이아웃과 store 기반 API로 통합해 평가, 댓글, 작품 탐색 과정에서 일관된 피드백을 제공했습니다.",
        ],
      },
    ],
  },

  {
    title: "쇼츠 웹툰 어드민",
    description: "콘텐츠, 회원, 결제, 댓글, 정산 운영 백오피스 구축",
    problem:
      "웹툰 플랫폼 운영자가 콘텐츠, 회원, 결제, 댓글, 정산, 뉴스레터 등을 직접 관리할 수 있는 안정적인 백오피스가 필요했습니다.",
    result:
      "도메인별 관리자 화면, 공통 테이블, SWR 기반 상태 관리, Presigned URL 업로드, Elastic 로그 수집 구조를 적용해 운영 효율과 유지보수성을 개선했습니다.",
    role: "백오피스 프론트엔드 개발, 운영 도구 설계, 공통 컴포넌트 구축",
    tools: [
      "Next.js",
      "TypeScript",
      "SWR",
      "Zustand",
      "Emotion",
      "Elastic",
      "S3",
    ],
    accent: "#111111",
    team: "PM, Design, FE, BE 협업",
    period: "2023.06 ~ 2024.12",
    relatedLinks: [{ label: "내부 운영 어드민" }],
    summary:
      "웹툰 플랫폼 운영을 위한 관리자 백오피스를 개발하며 회원, 콘텐츠, 결제, 댓글, 정산 업무를 처리할 수 있는 운영 도구를 구축했습니다.",
    detailSections: [
      {
        title: "운영 데이터 관리 구조",
        items: [
          "SWR 기반 전역 사용자 상태와 재검증 구조를 구성해 인증 상태와 운영 데이터 수정 이후의 최신 상태를 안정적으로 관리했습니다.",
          "공통 테이블 컴포넌트에 페이지네이션, 조회 건수 변경, 빈 상태, 엑셀 다운로드 액션을 통합해 대량 운영 데이터 조회 화면의 재사용성을 높였습니다.",
          "권한 메뉴 데이터를 localStorage와 전역 상태로 캐싱해 관리자 화면 진입 시 반복 호출을 줄였습니다.",
        ],
      },
      {
        title: "운영 안정성과 유지보수성",
        items: [
          "공통 API 유틸을 통해 토큰 전달, 로딩 표시, 에러 메시지, 인증 만료 처리를 표준화했습니다.",
          "Presigned URL 기반 S3 업로드와 Sharp 기반 WebP 변환 API를 구성해 콘텐츠 이미지 업로드와 최적화 흐름을 지원했습니다.",
          "콘텐츠 관리 주요 요청과 이미지 변환 실패를 Elastic 로그로 남기는 구조를 통해 운영 이슈 추적 기반을 마련했습니다.",
        ],
      },
    ],
  },

  {
    title: "디자인 에셋 관리 어드민",
    description: "S3 기반 디자인 이미지 관리 어드민 구축",
    problem:
      "디자이너가 이미지 리소스를 변경할 때마다 개발자에게 요청해야 했고, 단순 리소스 교체에도 개발 작업과 배포가 필요한 비효율이 있었습니다.",
    result:
      "S3 이미지 업로드, 목록 조회, 삭제가 가능한 디자인 운영 어드민을 구축해 디자이너가 직접 이미지를 관리할 수 있는 Self-Service 환경을 제공했습니다.",
    role: "어드민 개발, S3 업로드 구조 설계, 운영 프로세스 개선",
    tools: ["Next.js", "TypeScript", "S3", "MUI", "XLSX"],
    accent: "#A234C7",
    team: "FE, Design 협업",
    period: "2024.03 ~ 2024.06",
    relatedLinks: [{ label: "내부 디자인 어드민" }],
    summary:
      "디자인 이미지 리소스를 개발자 요청 없이 직접 관리할 수 있도록 S3 기반 이미지 운영 어드민을 구축했습니다.",
    detailSections: [
      {
        title: "Self-Service 이미지 관리",
        items: [
          "Next.js App Router 기반으로 S3 이미지 업로드, 목록 조회, 삭제가 가능한 디자인 운영 어드민을 구현했습니다.",
          "업로드 전 로컬 미리보기와 고정 크기 썸네일 UI를 제공해 운영자가 업로드 대상 이미지를 사전에 검수할 수 있도록 개선했습니다.",
          "업로드, 삭제 성공·실패 피드백과 빈 상태 처리를 제공해 운영 중 이슈를 쉽게 파악할 수 있도록 구성했습니다.",
        ],
      },
      {
        title: "운영 확장성을 고려한 구조",
        items: [
          "S3 prefix 설정과 디자인 카테고리 타입을 분리해 이미지 리소스 관리 범위를 확장하기 쉬운 구조로 설계했습니다.",
          "신규 이미지 카테고리 추가 시 화면, API, S3 prefix 간 매핑을 일관되게 관리할 수 있도록 구성했습니다.",
          "마케팅 가입, 구독 데이터와 웹툰런 통계를 조회하고 엑셀로 다운로드할 수 있는 운영 리포트 기능을 함께 구현했습니다.",
        ],
      },
    ],
  },

  {
    title: "KPI 대시보드 구축",
    description: "운영 지표를 실시간 웹 대시보드로 전환",
    problem:
      "운영자가 엑셀로 관리하던 매출, 광고 클릭, 로그인 사용자, 트래픽 데이터를 더 빠르게 확인하고 의사결정에 활용할 수 있어야 했습니다.",
    result:
      "Datadog, WATAP, Elastic, GA4, SQL 데이터를 활용해 KPI 대시보드와 일일 리포트 체계를 만들고 데이터 기반 서비스 개선 루프를 구축했습니다.",
    role: "데이터 시각화, KPI 분석, 서비스 개선",
    tools: ["Next.js", "TypeScript", "SWR", "GA4", "SQL", "Datadog", "Elastic"],
    accent: "#03B26C",
    team: "플랫폼팀, 운영, 마케팅 협업",
    period: "2025.01 ~ 2025.06",
    relatedLinks: [{ label: "내부 운영 대시보드" }],
    summary:
      "흩어져 있던 운영 지표를 웹 대시보드로 전환하고, 데이터 기반 서비스 개선 루프를 만드는 데 참여했습니다.",
    detailSections: [
      {
        title: "지표 수집과 대시보드 화면 구성",
        items: [
          "로그인 사용자, 광고 클릭, 매출, 트래픽 데이터를 기준으로 운영자가 매일 확인해야 할 지표를 정리했습니다.",
          "SWR 기반 데이터 캐싱과 재검증 전략을 적용해 대시보드 조회 효율을 개선했습니다.",
          "데이터의 로딩, 실패, 빈 상태를 분리해 운영자가 지표 신뢰도를 파악하기 쉽게 만들었습니다.",
        ],
      },
      {
        title: "데이터 기반 서비스 개선",
        items: [
          "광고 클릭 데이터와 콘텐츠 소비 패턴을 분석해 광고 배치, 콘텐츠 편성, 추천 영역 개선에 참여했습니다.",
          "일일 리포트 체계를 구축해 기획, 운영, 마케팅 조직이 같은 지표를 기준으로 논의할 수 있게 했습니다.",
          "Datadog RUM 도입 검토와 POC를 주도해 사용자 행동 기반 성능 분석 환경을 점검했습니다.",
        ],
      },
    ],
  },

  {
    title: "올라케어 커뮤니티 운영",
    description: "헬스케어 커뮤니티와 사용자 문의 흐름 개선",
    problem:
      "코로나 시기 증가한 사용자 유입 환경에서 커뮤니티 콘텐츠 조회, 사용자 피드백, CS 문의로 이어지는 불편 요소를 안정적으로 관리해야 했습니다.",
    result:
      "SWR 기반 데이터 패칭과 상태 UI 개선을 통해 반복 API 호출을 줄이고, 빈 상태·에러 상태·로딩 상태를 정리해 사용자 문의 대응에 유리한 화면 흐름을 구성했습니다.",
    role: "프론트엔드 개발, 커뮤니티 운영, 모바일 UX 개선",
    tools: ["React", "TypeScript", "SWR", "Styled-components"],
    accent: "#7B61FF",
    team: "PM, Design, FE, BE 협업",
    period: "2022.05 ~ 2023.06",
    relatedLinks: [{ label: "KB 올라케어", href: "https://m.kbollacare.com/" }],
    summary:
      "블루앤트 시절 올라케어 서비스 운영 경험을 바탕으로, 모바일 커뮤니티와 사용자 피드백 흐름을 개선했습니다.",
    detailSections: [
      {
        title: "대규모 사용자 유입 환경에서의 화면 안정성",
        items: [
          "모바일 환경에서 커뮤니티 콘텐츠 조회, 후기 확인, 사용자 피드백 등 핵심 흐름을 개발하고 유지보수했습니다.",
          "SWR 기반 데이터 패칭과 캐싱 전략으로 반복 요청을 줄이고 화면 응답성을 개선했습니다.",
          "사용자가 콘텐츠를 탐색하는 과정에서 불필요한 화면 이동과 상태 초기화를 줄이는 데 집중했습니다.",
        ],
      },
      {
        title: "CS 대응을 고려한 상태 처리",
        items: [
          "사용자 문의와 운영 이슈를 바탕으로 상태 표시, 빈 화면, 에러 안내 UI를 보완했습니다.",
          "로딩 중, 데이터 없음, 요청 실패 상태를 구분해 사용자가 현재 상황을 이해할 수 있도록 화면을 정리했습니다.",
          "기획·디자인 조직과 협업해 로딩 애니메이션과 사용자 피드백 UI를 개선했습니다.",
        ],
      },
    ],
  },

  {
    title: "포트폴리오 사이트 개발",
    description: "Next.js App Router 기반 SSG 웹사이트 제작",
    problem:
      "프로젝트와 경력 데이터를 분리해 관리하면서, 빠르게 로딩되고 유지보수하기 쉬운 개인 포트폴리오 사이트가 필요했습니다.",
    result:
      "Next.js App Router, Tailwind CSS, Framer Motion, Vercel 배포를 사용해 반응형 SSG 포트폴리오를 구축했습니다.",
    role: "기획, 디자인, 프론트엔드 개발, 배포",
    tools: [
      "Figma",
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    accent: "#3182F6",
    team: "1명",
    period: "2023.12 ~",
    relatedLinks: [
      { label: "사이트", href: "https://garam.dev" },
      { label: "GitHub", href: "https://github.com/Garam-Leee" },
    ],
    summary:
      "데이터를 분리해 관리하고 빌드 시점에 렌더링하는 SSG 방식의 포트폴리오 사이트를 제작했습니다.",
    detailSections: [
      {
        title: "Next.js App Router와 데이터 구조",
        items: [
          "Server Component와 App Router 구조를 활용해 정적 생성에 적합한 화면 흐름을 구성했습니다.",
          "프로젝트, 경력, 블로그 데이터를 분리해 콘텐츠 수정이 코드 구조에 과하게 섞이지 않도록 설계했습니다.",
          "Markdown 기반 블로그와 프로젝트 데이터를 함께 관리해 포트폴리오와 글 작성 흐름을 통합했습니다.",
        ],
      },
      {
        title: "반응형 UI, 애니메이션, 운영",
        items: [
          "Tailwind CSS로 375px부터 데스크톱까지 반응형 레이아웃을 구성했습니다.",
          "Framer Motion을 활용해 섹션 진입, 카드 인터랙션, 모달 전환 애니메이션을 구현했습니다.",
          "Vercel CI/CD를 통해 main push 시 자동 배포되도록 운영했습니다.",
        ],
      },
    ],
  },
];

export const strengths = [
  "사용자 경험과 비즈니스 목표를 함께 고려하며 문제를 해결합니다.",
  "데이터 기반 의사결정을 통해 서비스 개선 방향을 도출합니다.",
  "성능 최적화와 유지보수성을 고려해 프론트엔드 구조를 개선합니다.",
  "기획, 디자인, 운영 조직과 긴밀하게 협업하며 서비스를 성장시킵니다.",
];
