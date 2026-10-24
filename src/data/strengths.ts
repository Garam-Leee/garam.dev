type Strength = { title: string; description: string; icon: "Code2" | "Gauge" | "MessagesSquare" | "BarChart3"; metric: string; tags: string[] };

export const strengths: Strength[] = [
  {
    "title": "공통 구조와 개발 환경 설계",
    "description": "웹툰 플랫폼 초기 멤버로 Atomic Design 기반 아키텍처와 모노레포 공통 UI·유틸리티·훅 패키지를 구축했습니다. Storybook 문서화와 Next.js 보일러플레이트·ESLint 규칙으로 팀의 구현 기준을 정리했습니다.",
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
    "description": "SSR 적용, API 도메인 분리와 SWR 캐싱·재검증으로 데이터 흐름을 개선했습니다. 중복 요청 제거와 데이터 관리 구조 개선으로 주요 화면 초기 로딩을 약 2초 단축했습니다.",
    "icon": "Gauge",
    "metric": "Performance",
    "tags": [
      "SSR / SSG",
      "SWR",
      "API 최적화"
    ]
  },
  {
    "title": "연결·권한·입력의 예외 처리",
    "description": "Agora SDK 실시간 상담의 권한·재연결·네트워크 오류를 처리했습니다. 관리자 접근 정책과 폼 검증, Canvas 배치 검증으로 운영 데이터와 화면 상태의 안정성을 높였습니다.",
    "icon": "MessagesSquare",
    "metric": "Reliability",
    "tags": [
      "Agora SDK",
      "React Hook Form",
      "Canvas"
    ]
  },
  {
    "title": "운영 데이터를 의사결정으로 연결",
    "description": "SQL 조회·집계와 KPI 대시보드를 구현하고 Elastic·Datadog·GA4로 사용자 행동을 분석했습니다. 콘텐츠 노출·편성 개선으로 전 분기 대비 매출 약 27% 증가에 기여했습니다.",
    "icon": "BarChart3",
    "metric": "Data & Operations",
    "tags": [
      "SQL",
      "KPI 시각화",
      "Datadog / GA4"
    ]
  }
];
