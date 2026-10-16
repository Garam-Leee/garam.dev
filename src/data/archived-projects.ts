import type { Project } from "@/types/project";

// Preserve existing shared URLs; these are not shown in the current career summary.
export const archivedProjects: Project[] = [
  {
    "slug": "admin-suite",
    "domain": "운영 도구",
    "featured": false,
    "title": "모노레포 어드민 스위트",
    "description": "작가 정산, 작품 관리, 오픈마켓 운영 어드민 구축",
    "problem": "작가 정산, 작품 관리, 개인 작가 어드민, 오픈마켓 백오피스 등 여러 운영 도구를 각각 개발하면 UI와 개발 규칙이 쉽게 파편화될 수 있었습니다.",
    "result": "모노레포 기반으로 여러 어드민을 공통 구조 위에서 개발하고, Storybook 중심의 디자인 시스템과 공통 인터랙션 패턴을 적용해 확장성과 유지보수성을 높였습니다.",
    "role": "프론트엔드 구조 설계, 어드민 개발, 공통 UI 시스템 구축",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "Storybook",
      "SWR",
      "Zustand",
      "Monorepo"
    ],
    "accent": "#191F28",
    "team": "PM, Design, FE, BE 협업",
    "period": "2025.03 ~ 2026.07",
    "relatedLinks": [
      {
        "label": "내부 운영 어드민"
      }
    ],
    "summary": "여러 운영 도구를 하나의 개발 규칙과 공통 컴포넌트 체계 위에서 확장할 수 있도록 모노레포 기반 어드민 구조를 구축했습니다.",
    "detailSections": [
      {
        "title": "공통 구조와 디자인 시스템",
        "items": [
          "여러 어드민에서 반복되는 레이아웃, 테이블, 모달, 폼, 피드백 UI를 공통 컴포넌트로 정리했습니다.",
          "Figma 기준의 UI를 Storybook 컴포넌트로 문서화해 화면 개발 전 컴포넌트 단위로 검증할 수 있도록 구성했습니다.",
          "alert, confirm, modal, drawer, loading 등 공통 인터랙션 패턴을 표준화했습니다."
        ]
      },
      {
        "title": "운영 도구 확장성",
        "items": [
          "작가 정산, 작품 관리, 개인 작가, 오픈마켓 운영 어드민을 동일한 개발 규칙 위에서 확장할 수 있도록 구성했습니다.",
          "운영 데이터 조회와 수정 이후 최신 상태가 유지되도록 SWR 기반 재검증 흐름을 적용했습니다.",
          "도메인별 어드민이 늘어나도 공통 UI와 API 처리 방식을 재사용할 수 있도록 구조를 정리했습니다."
        ]
      }
    ]
  },
  {
    "slug": "shortz-payments",
    "domain": "웹툰",
    "featured": false,
    "title": "쇼츠 웹툰 대여권 결제 시스템",
    "description": "회차별 대여권 구매를 지원하는 웹툰 결제 플로우 구축",
    "problem": "기존 구독권과 이용권 중심의 결제 구조 외에, 사용자가 원하는 작품의 특정 회차를 개별로 구매할 수 있는 대여권 결제 흐름이 필요했습니다.",
    "result": "회차별 대여권 구매 플로우를 설계하고 결제 상태, 실패 케이스, 사용자 피드백을 정리해 웹툰 콘텐츠 소비 방식 확장에 기여했습니다.",
    "role": "프론트엔드 개발, 결제 플로우 설계, 예외 상태 처리",
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "SWR",
      "Zustand",
      "REST API"
    ],
    "accent": "#3182F6",
    "team": "PM, Design, FE, BE 협업",
    "period": "2025.03 ~ 2026.07",
    "relatedLinks": [
      {
        "label": "쇼츠 웹툰",
        "href": "https://www.shortz.net/"
      }
    ],
    "summary": "기존 구독 모델 외에 회차 단위 구매 모델을 도입해 콘텐츠 소비 방식을 확장하고, 결제 과정의 다양한 상태와 예외 흐름을 사용자 경험 중심으로 정리했습니다.",
    "detailSections": [
      {
        "title": "결제 플로우 설계",
        "items": [
          "작품, 회차, 보유 이용권, 대여권 구매 가능 여부를 기준으로 사용자 결제 진입 조건을 정리했습니다.",
          "구매 전 확인, 결제 진행, 성공, 실패, 중복 요청 방지 등 결제 단계별 화면 상태를 분리했습니다.",
          "API 응답에 따른 오류 메시지와 사용자 피드백을 명확히 전달할 수 있도록 공통 처리 흐름을 구성했습니다."
        ]
      },
      {
        "title": "운영 안정성 개선",
        "items": [
          "결제 실패와 예외 케이스를 화면 상태로 분리해 운영 중 이슈를 빠르게 파악할 수 있도록 구성했습니다.",
          "반복되는 confirm, alert, loading 패턴을 공통 UI로 연결해 결제 화면의 일관성을 높였습니다.",
          "결제 흐름 확장에 대비해 구독권, 이용권, 대여권 조건을 분리 가능한 구조로 정리했습니다."
        ]
      }
    ]
  },
  {
    "slug": "webtoon-run",
    "domain": "웹툰",
    "title": "웹툰런 공모전 플랫폼",
    "description": "전국 대학생 웹툰 경연 플랫폼 개발 및 운영",
    "problem": "전국 대학생 웹툰 경연에서 작품 제출, 작품 탐색, 조회수, 하트, 응원, 댓글 등 사용자 참여 지표를 안정적으로 제공해야 했습니다.",
    "result": "React Query 기반 SSR Hydration, 무한스크롤, 이미지 우선 로딩 전략을 적용해 작품 탐색과 웹툰 뷰어 경험을 개선하고 공모전 기간 동안 안정적으로 서비스를 운영했습니다.",
    "role": "프론트엔드 개발, 웹툰 뷰어 개발, 공모전 목록 UX, 운영 대응",
    "tools": [
      "Next.js",
      "TypeScript",
      "React Query",
      "Emotion",
      "Turborepo",
      "GA4"
    ],
    "accent": "#2F80ED",
    "team": "PM, Design, FE, BE 협업",
    "period": "2024.01 ~ 2024.12",
    "relatedLinks": [
      {
        "label": "웹툰런",
        "href": "https://webtoonrun.com/"
      }
    ],
    "summary": "웹툰런 공모전 플랫폼을 개발하며 작품 목록, 사용자 참여, 웹툰 뷰어, 평가 흐름을 안정적으로 제공했습니다.",
    "detailSections": [
      {
        "title": "공모전 목록과 참여형 탐색 경험",
        "items": [
          "React Query의 prefetchQuery, prefetchInfiniteQuery, HydrationBoundary를 활용해 서버 프리패치 데이터와 클라이언트 캐시를 연결했습니다.",
          "IntersectionObserver와 useInfiniteQuery를 결합한 무한스크롤 구조를 공통화해 페이지 단위 데이터 로딩과 중복 요청 방지를 구현했습니다.",
          "GA4 스크립트를 운영 HTTPS 도메인에서만 로드하도록 제한해 실제 사용자 데이터 품질을 관리했습니다."
        ]
      },
      {
        "title": "웹툰 뷰어와 사용자 피드백",
        "items": [
          "웹툰 뷰어에서 초반 컷은 priority, fetchPriority로 우선 로드하고 이후 이미지는 캐시 여부에 따라 순차 로딩하도록 구성했습니다.",
          "뷰어 스크롤 위치 저장 API를 타이머 기반으로 합쳐 빠른 스크롤 중 발생할 수 있는 연속 저장 요청을 줄였습니다.",
          "Alert, Confirm, Toast, Spinner를 전역 레이아웃과 store 기반 API로 통합해 평가, 댓글, 작품 탐색 과정에서 일관된 피드백을 제공했습니다."
        ]
      }
    ],
    "featured": false
  },
  {
    "slug": "jaedam-website",
    "domain": "기업 사이트",
    "title": "재담미디어 공식 홈페이지",
    "description": "콘텐츠 중심 기업 홈페이지 단독 개발",
    "problem": "브랜드 소개뿐 아니라 WORK, NEWS, CAREER, CONTACT 등 콘텐츠 탐색과 사용자 액션이 있는 서비스형 홈페이지가 필요했습니다.",
    "result": "Next.js 기반 공식 홈페이지를 단독 개발하고, 콘텐츠 탐색 상태 복원, SVG 캐싱, Elastic 이벤트 수집, 전역 피드백 UI를 적용해 사용자 경험과 운영성을 개선했습니다.",
    "role": "프론트엔드 단독 개발, UI 설계, 콘텐츠 탐색 UX, 이벤트 트래킹",
    "tools": [
      "Next.js",
      "TypeScript",
      "Emotion",
      "Zustand",
      "Framer Motion",
      "GA4",
      "Elastic"
    ],
    "accent": "#A234C7",
    "team": "1명",
    "period": "2024.12 ~ 2025.03",
    "relatedLinks": [
      {
        "label": "재담미디어 홈페이지",
        "href": "https://www.jaedam.com/"
      }
    ],
    "summary": "재담미디어 공식 홈페이지를 단독 개발하며 브랜드 사이트를 넘어 콘텐츠 탐색과 사용자 경험을 고려한 서비스형 웹사이트로 설계했습니다.",
    "detailSections": [
      {
        "title": "콘텐츠 탐색 경험 설계",
        "items": [
          "WORK 목록에서 데스크톱은 Pagination, 모바일은 Load More 패턴을 적용해 디바이스별 콘텐츠 소비 방식에 맞는 탐색 경험을 설계했습니다.",
          "상세 페이지 진입 후 목록으로 복귀할 때 스크롤 위치, 필터, 페이지 상태를 복원해 사용자의 탐색 맥락이 끊기지 않도록 구현했습니다.",
          "Skeleton UI, Empty State, 검색 결과 수 요약을 분리해 비동기 상태를 사용자에게 명확하게 전달했습니다."
        ]
      },
      {
        "title": "성능과 운영성 개선",
        "items": [
          "동적으로 색상과 크기가 변경되는 SVG 아이콘 렌더러에 TTL 기반 메모리 캐시를 적용해 반복 렌더링 비용을 줄였습니다.",
          "PAGE_VIEW, CONTENT_VIEW, NEWS_VIEW 이벤트를 구분해 Elastic 로그 체계를 구성하고 콘텐츠 소비 흐름을 분석할 수 있는 기반을 만들었습니다.",
          "전역 Alert, Confirm, Spinner 레이어와 Error Boundary를 구성해 사용자 피드백과 예외 대응 흐름을 공통화했습니다."
        ]
      }
    ],
    "featured": false
  },
  {
    "slug": "portfolio",
    "domain": "개인 프로젝트",
    "title": "포트폴리오 사이트",
    "description": "Next.js App Router 기반 콘텐츠 중심 SSG 웹사이트 제작",
    "problem": "프로젝트와 경력 데이터를 분리해 관리하면서, 빠르게 로딩되고 유지보수하기 쉬운 개인 포트폴리오 사이트가 필요했습니다.",
    "result": "Next.js App Router, Tailwind CSS, Framer Motion, Markdown 기반 콘텐츠 구조, Vercel 배포를 사용해 반응형 SSG 포트폴리오를 구축했습니다.",
    "role": "기획, 디자인, 프론트엔드 개발, 배포",
    "tools": [
      "Figma",
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Markdown",
      "Vercel"
    ],
    "accent": "#3182F6",
    "team": "1명",
    "period": "2023.12 ~",
    "relatedLinks": [
      {
        "label": "사이트",
        "href": "https://garam-dev.vercel.app"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/Garam-Leee"
      }
    ],
    "summary": "프로젝트, 경력, 블로그 데이터를 분리해 관리하고 빌드 시점에 렌더링하는 SSG 방식의 포트폴리오 사이트를 제작했습니다.",
    "detailSections": [
      {
        "title": "Next.js App Router와 데이터 구조",
        "items": [
          "Server Component와 App Router 구조를 활용해 정적 생성에 적합한 화면 흐름을 구성했습니다.",
          "프로젝트, 경력, 블로그 데이터를 분리해 콘텐츠 수정이 코드 구조에 과하게 섞이지 않도록 설계했습니다.",
          "Markdown 기반 블로그와 프로젝트 데이터를 함께 관리해 포트폴리오와 글 작성 흐름을 통합했습니다."
        ]
      },
      {
        "title": "반응형 UI, SEO, 운영",
        "items": [
          "Tailwind CSS로 375px부터 데스크톱까지 반응형 레이아웃을 구성했습니다.",
          "Framer Motion을 활용해 섹션 진입, 카드 인터랙션, 모달 전환 애니메이션을 구현했습니다.",
          "Next.js Metadata API를 활용해 SEO, Open Graph, Twitter Card 정보를 구성했습니다.",
          "Vercel CI/CD를 통해 main push 시 자동 배포되도록 운영했습니다."
        ]
      }
    ],
    "featured": false
  }
];
