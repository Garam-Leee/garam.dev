import type { PostMeta } from "@/lib/posts";

export const POSTS_PER_PAGE = 6;

export function queryPosts(
  posts: PostMeta[],
  { tag = "", query = "", page = "1" }: { tag?: string; query?: string; page?: string } = {}
) {
  const terms = query.normalize("NFKC").toLocaleLowerCase("ko-KR").trim().split(/\s+/).filter(Boolean);
  const filtered = posts.filter((post) => {
    const text = [post.title, post.description, ...post.tags].join(" ").normalize("NFKC").toLocaleLowerCase("ko-KR");
    return (!tag || post.tags.includes(tag)) && terms.every((term) => text.includes(term));
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const requested = /^\d+$/.test(page) ? Number(page) : 1;
  const currentPage = Number.isFinite(requested) ? Math.min(totalPages, Math.max(1, requested)) : 1;
  return {
    posts: filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE),
    total: filtered.length,
    page: currentPage,
    totalPages,
  };
}

export function postsHref({ tag = "", query = "", page = 1 }: { tag?: string; query?: string; page?: number }) {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  return params.size ? `/posts?${params}` : "/posts";
}
