type Strength = { title: string; description: string; icon: "Code2" | "Gauge" | "MessagesSquare" | "BarChart3"; metric: string; tags: string[] };

export const strengths: Strength[] = [
  {
    "title": "공통 구조와 개발 환경 설계",
    "description": "Atomic Design 기준으로 UI를 분리하고 모노레포에서 공통 컴포넌트·훅·유틸리티를 패키지로 관리했습니다. Storybook으로 사용 예시를 문서화하고 Next.js 보일러플레이트와 ESLint 규칙으로 구현 기준을 통일했습니다.",
    "icon": "Code2",
    "metric": "Architecture",
    "tags": [
      "Atomic Design",
      "Monorepo",
      "Storybook"
    ]
  },
  {
    "title": "렌더링과 데이터 요청 최적화",
    "description": "Next.js SSR·SSG를 화면 목적에 맞춰 적용하고, 도메인별 API와 SWR 캐싱·재검증으로 중복 호출과 요청 의존성을 줄였습니다. 운영 어드민에서는 ID 기반 배치 요청과 페이지네이션 상한으로 과다 호출을 정리했고, 웹툰 주요 화면의 초기 로딩은 약 2초 단축했습니다.",
    "icon": "Gauge",
    "metric": "Performance",
    "tags": [
      "SSR / SSG",
      "SWR",
      "API 최적화"
    ]
  },
  {
    "title": "권한·입력·화면 상태 검증",
    "description": "사용자 역할과 API 권한을 라우트 접근·메뉴·버튼 노출 정책에 연결했습니다. React Hook Form으로 입력 검증과 제출 오류를 처리하고, Canvas 좌표·크기·배치 영역을 검증해 잘못된 도면 상태를 막았습니다.",
    "icon": "MessagesSquare",
    "metric": "Reliability",
    "tags": [
      "접근 제어",
      "React Hook Form",
      "Canvas"
    ]
  },
  {
    "title": "운영 데이터를 의사결정으로 연결",
    "description": "SQL 조회·집계로 작품 조회수·광고 클릭·결제 전환율을 대시보드에 시각화하고 기간별 필터와 일일 리포트를 만들었습니다. Elastic·Datadog·GA4 분석을 편성 관리자 운영에 연결해 전 분기 대비 매출 약 27% 증가에 기여했습니다.",
    "icon": "BarChart3",
    "metric": "Data & Operations",
    "tags": [
      "SQL",
      "KPI 시각화",
      "Datadog / GA4"
    ]
  }
];
