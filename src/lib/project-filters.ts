import type { Project } from "@/types/project";

export function filterProjects(
  projects: Project[],
  { domain = "", tool = "" }: { domain?: string; tool?: string } = {}
): Project[] {
  return projects
    .filter((project) => (!domain || project.domain === domain) && (!tool || project.tools.includes(tool)))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}
