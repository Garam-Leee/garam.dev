export type Category = "rendering" | "architecture" | "reliability" | "observability";

export type TechItem = { name: string; category: Category; icon?: string; fallback?: string };

export const categories: { key: Category; label: string }[] = [
  {
    "key": "rendering",
    "label": "렌더링·데이터 흐름"
  },
  {
    "key": "architecture",
    "label": "공통 구조·개발 환경"
  },
  {
    "key": "reliability",
    "label": "연결·검증·인터랙션"
  },
  {
    "key": "observability",
    "label": "지표·모니터링"
  }
];

export const techItems: TechItem[] = [
  {
    "name": "React",
    "category": "rendering",
    "icon": "/icons/react-original.svg"
  },
  {
    "name": "Next.js",
    "category": "rendering",
    "icon": "/icons/nextjs-original.svg"
  },
  {
    "name": "TypeScript",
    "category": "rendering",
    "icon": "/icons/typescript-original.svg"
  },
  {
    "name": "SWR",
    "category": "rendering",
    "fallback": "SWR"
  },
  {
    "name": "Monorepo",
    "category": "architecture",
    "fallback": "MR"
  },
  {
    "name": "Storybook",
    "category": "architecture",
    "fallback": "SB"
  },
  {
    "name": "ESLint",
    "category": "architecture",
    "fallback": "ES"
  },
  {
    "name": "Agora SDK",
    "category": "reliability",
    "fallback": "AG"
  },
  {
    "name": "React Hook Form",
    "category": "reliability",
    "fallback": "RHF"
  },
  {
    "name": "Canvas",
    "category": "reliability",
    "fallback": "CV"
  },
  {
    "name": "SQL",
    "category": "observability",
    "fallback": "SQL"
  },
  {
    "name": "Elastic",
    "category": "observability",
    "icon": "/icons/elasticsearch-original.svg"
  },
  {
    "name": "Datadog RUM",
    "category": "observability",
    "fallback": "DD"
  },
  {
    "name": "GA4",
    "category": "observability",
    "fallback": "GA4"
  }
];
