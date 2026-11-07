// 경력 상세 페이지의 업무 분류. 설명은 experience.ts를 단일 출처로 사용합니다.
export const experienceProjects = [
  [
    { title: "웹툰 플랫폼 개발 및 운영", slug: "shortz", responsibilities: [0, 1, 2, 3, 4, 5], achievements: [0, 1, 2] },
    { title: "웹툰런 실시간 경연 플랫폼 개발", slug: "webtoon-run", responsibilities: [6], achievements: [3] },
    { title: "KPI 대시보드 구축 및 데이터 기반 서비스 개선", slug: "kpi-dashboard", responsibilities: [7, 8], achievements: [4, 5] },
  ],
  [
    { title: "비대면 진료 플랫폼 개발", slug: "ollacare", responsibilities: [0, 1, 2], achievements: [0, 1] },
    { title: "심리상담 서비스 신규 구축", slug: "counseling", responsibilities: [3], achievements: [2] },
    { title: "병원·상담사·운영 어드민 개발", slug: "healthcare-admin", responsibilities: [4, 5], achievements: [3, 4] },
  ],
  [{ title: "삼익가구 건축 ERP 시스템 개발", slug: "construction-erp", responsibilities: [0, 1, 2, 3], achievements: [0, 1] }],
  [{ title: "Private Cloud 대시보드 개발 및 운영", slug: "private-cloud", responsibilities: [0, 1, 2, 3], achievements: [0, 1] }],
] as const;
