export type Category = "frontend" | "library" | "deploy" | "design";

export type TechItem = {
  name: string;
  category: Category;
  icon?: string;
  fallback?: string;
};


export const categories: { key: Category; label: string }[] = [
  { key: "frontend", label: "프론트엔드" },
  { key: "library", label: "라이브러리" },
  { key: "deploy", label: "환경 및 배포" },
  { key: "design", label: "디자인" },
];

export const techItems: TechItem[] = [
  {
    name: "JavaScript",
    category: "frontend",
    icon: "/icons/javascript-original.svg",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "/icons/typescript-original.svg",
  },
  {
    name: "React",
    category: "frontend",
    icon: "/icons/react-original.svg",
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: "/icons/nextjs-original.svg",
  },
  {
    name: "SWR",
    category: "library",
    fallback: "SWR",
  },
  {
    name: "React Query",
    category: "library",
    fallback: "RQ",
  },
  {
    name: "Emotion",
    category: "library",
    fallback: "EM",
  },
  {
    name: "Styled Components",
    category: "library",
    icon: "/icons/styled-components.png",
  },
  {
    name: "Tailwind CSS",
    category: "library",
    icon: "/icons/tailwindcss-original.svg",
  },
  {
    name: "Zustand",
    category: "library",
    icon: "/icons/zustand.png",
  },
  {
    name: "React Hook Form",
    category: "library",
    fallback: "RHF",
  },
  {
    name: "GitHub",
    category: "deploy",
    icon: "/icons/github-original.svg",
  },
  {
    name: "Vercel",
    category: "deploy",
    icon: "/icons/vercel-original.svg",
  },
  {
    name: "AWS",
    category: "deploy",
    icon: "/icons/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Datadog",
    category: "deploy",
    fallback: "DD",
  },
  {
    name: "Elastic",
    category: "deploy",
    icon: "/icons/elasticsearch-original.svg",
  },
  {
    name: "Figma",
    category: "design",
    icon: "/icons/figma-original.svg",
  },
  {
    name: "Notion",
    category: "design",
    icon: "/icons/notion-original.svg",
  },
];
