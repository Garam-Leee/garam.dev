export interface Project {
  slug: string;
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
