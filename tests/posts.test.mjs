import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { loadTypeScript } from "./load-typescript.mjs";

const modules = {};
for (const name of ["remark", "remark-breaks", "remark-gfm", "remark-html"]) {
  modules[name] = { ...await import(name), __esModule: true };
}
const posts = loadTypeScript("src/lib/posts.ts", modules);

test("all published posts have consistent list and detail metadata", async () => {
  const all = posts.getAllPosts();
  assert.ok(all.length > 0);
  for (const meta of all) {
    const post = await posts.getPost(meta.slug);
    assert.equal(post.title, meta.title);
    assert.equal(post.date, meta.date);
    assert.ok(post.contentHtml.length > 0);
  }
  await assert.doesNotReject(() => posts.getPost("missing-post"));
  assert.equal(await posts.getPost("../outside"), null);
});

test("invalid calendar dates are rejected", () => {
  assert.equal(posts.formatDate("2025-02-29"), "");
  assert.equal(posts.formatDate("invalid"), "");
  assert.ok(posts.formatDate("2024-02-29").includes("29"));
});

test("unsafe HTML is removed while Markdown code and tables survive", async () => {
  const content = '---\ntitle: Test\ndescription: Test\ndate: "2026-10-22"\n---\n\n<script>alert(1)</script>\n\n[bad](javascript:alert%281%29)\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n```html\n<script>alert(1)</script>\n```';
  const fixture = loadTypeScript("src/lib/posts.ts", {
    ...modules,
    fs: { ...fs, existsSync: () => true, statSync: () => ({ isFile: () => true }), readFileSync: () => content },
  });
  const post = await fixture.getPost("fixture");
  assert.doesNotMatch(post.contentHtml, /<script|href="javascript:/i);
  assert.match(post.contentHtml, /<table>/);
  assert.match(post.contentHtml, /&#x3C;script>/);
});
