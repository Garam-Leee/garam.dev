import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { projects } = loadTypeScript("src/data/projects.ts");
const { filterProjects } = loadTypeScript("src/lib/project-filters.ts");

test("projects have unique stable URL slugs and complete detail content", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const field of ["title", "summary", "problem", "result", "role", "team", "period"]) {
      assert.ok(project[field].trim(), `${project.slug}: ${field}`);
    }
    assert.ok(project.detailSections.length > 0);
  }
});

test("filters combine domain and technology without changing source order", () => {
  const before = projects.map((project) => project.slug).join(",");
  const all = filterProjects(projects);
  assert.equal(all.length, projects.length);
  let foundOther = false;
  for (const project of all) {
    if (!project.featured) foundOther = true;
    if (project.featured) assert.equal(foundOther, false);
  }
  for (const domain of new Set(projects.map((project) => project.domain))) {
    for (const tool of new Set(projects.flatMap((project) => project.tools))) {
      const expected = projects.filter((project) => project.domain === domain && project.tools.includes(tool));
      const actual = filterProjects(projects, { domain, tool });
      assert.equal(actual.length, expected.length);
      assert.ok(actual.every((project) => expected.includes(project)));
    }
  }
  assert.equal(filterProjects(projects, { tool: "missing" }).length, 0);
  assert.equal(filterProjects(projects, { domain: "missing" }).length, 0);
  assert.equal(projects.map((project) => project.slug).join(","), before);
});
