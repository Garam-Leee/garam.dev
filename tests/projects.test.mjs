import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { projects } = loadTypeScript("src/data/projects.ts");

test("projects have unique stable URL slugs and complete detail content", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const field of ["title", "summary", "role", "team", "period"]) {
      assert.ok(project[field].trim(), `${project.slug}: ${field}`);
    }
    if (project.caseStudy) {
      assert.ok(project.caseStudy.length > 0, `${project.slug}: caseStudy`);
      assert.ok(project.caseStudy.every((block) => block.title.trim()), `${project.slug}: caseStudy titles`);
      assert.equal(project.problem, undefined);
      assert.equal(project.result, undefined);
    } else {
      assert.ok(project.problem.trim(), `${project.slug}: problem`);
      assert.ok(project.result.trim(), `${project.slug}: result`);
    }
    assert.ok(project.detailSections.length > 0);
  }
});
