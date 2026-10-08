import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { queryPosts, postsHref, POSTS_PER_PAGE } = loadTypeScript("src/lib/post-filters.ts");
const posts = Array.from({ length: 14 }, (_, index) => ({
  slug: String(index), title: `React ${index}`, description: index % 2 ? "성능 개선" : "디자인 시스템", tags: index % 2 ? ["성능"] : ["UI"],
}));

test("search combines case-insensitive terms with exact tag filters", () => {
  assert.equal(queryPosts(posts, { query: "REACT 성능", tag: "성능" }).total, 7);
  assert.equal(queryPosts(posts, { query: "성능", tag: "UI" }).total, 0);
  assert.equal(queryPosts(posts, { query: "ＲＥＡＣＴ" }).total, 14);
  assert.equal(queryPosts(posts, { query: "   " }).total, 14);
});

test("pagination clamps invalid pages and preserves all results without duplicates", () => {
  assert.equal(queryPosts(posts).posts.length, POSTS_PER_PAGE);
  const pages = [1, 2, 3].flatMap((page) => queryPosts(posts, { page: String(page) }).posts);
  assert.equal(new Set(pages.map((post) => post.slug)).size, 14);
  for (const page of ["0", "-1", "NaN", "1.5", "9".repeat(400)]) assert.equal(queryPosts(posts, { page }).page, 1);
  assert.equal(queryPosts(posts, { page: "999" }).page, 3);
  const empty = queryPosts([], { page: "999" });
  assert.equal(empty.page, 1);
  assert.equal(empty.posts.length, 0);
});

test("pagination links retain Korean and special-character filters", () => {
  const url = new URL(postsHref({ tag: "성능", query: "React & Next.js", page: 2 }), "https://example.com");
  assert.equal(url.searchParams.get("tag"), "성능");
  assert.equal(url.searchParams.get("q"), "React & Next.js");
  assert.equal(url.searchParams.get("page"), "2");
  assert.equal(postsHref({}), "/posts");
});
