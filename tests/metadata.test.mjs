import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const site = loadTypeScript("src/lib/site.ts");
const { pageMetadata } = loadTypeScript("src/lib/metadata.ts", { "./site": site });

test("detail metadata uses its own canonical, title and share image", () => {
  const metadata = pageMetadata({ title: "글 제목", description: "글 설명", path: "/posts/example", kind: "article", date: "2026-10-22" });
  assert.equal(metadata.alternates.canonical, site.absoluteUrl("/posts/example"));
  assert.equal(metadata.openGraph.type, "article");
  assert.equal(metadata.openGraph.title, "글 제목");
  assert.equal(metadata.openGraph.publishedTime, "2026-10-22");
  const image = new URL(metadata.twitter.images[0]);
  assert.equal(image.searchParams.get("type"), "post");
  assert.equal(image.searchParams.get("slug"), "example");
});

test("project share images are distinct from post and default images", () => {
  const project = pageMetadata({ title: "프로젝트", description: "설명", path: "/projects/shortz" });
  const home = pageMetadata({ title: "홈", description: "설명", path: "/" });
  assert.equal(new URL(project.twitter.images[0]).searchParams.get("type"), "project");
  assert.equal(new URL(home.twitter.images[0]).pathname, "/og");
});
