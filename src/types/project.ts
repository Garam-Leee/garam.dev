export type ProjectDomain = "웹툰" | "운영 도구" | "기업 사이트" | "헬스케어" | "개인 프로젝트";

export interface Project {
  slug: string;
  domain: ProjectDomain;
  featured?: boolean;
  title: string;
  description: string;
  problem: string;
  result: string;
  role: string;
  tools: string[];
  accent: string;
  team: string;
  period: string;
  relatedLinks: { label: string; href?: string }[];
  summary: string;
  detailSections: { title: string; items: string[] }[];
}
