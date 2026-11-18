import type { CaseBlock } from "./case-study";

export type ProjectDomain = "웹툰" | "운영 도구" | "기업 사이트" | "헬스케어" | "개인 프로젝트";

interface ProjectBase {
  slug: string;
  company?: string;
  periodLabel?: string;
  domain: ProjectDomain;
  featured?: boolean;
  title: string;
  description: string;
  role: string;
  tools: string[];
  team: string;
  period: string;
  relatedLinks: { label: string; href?: string }[];
  summary: string;
  detailSections: { title: string; items: string[] }[];
}

export type Project = ProjectBase & (
  | { caseStudy: [CaseBlock, ...CaseBlock[]]; problem?: never; result?: never }
  | { caseStudy?: never; problem: string; result: string }
);
