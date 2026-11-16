import { ArrowUpRight } from "lucide-react";
import { Button, ButtonLink, Divider, EmptyState, Pagination, SearchField, Select } from "@/components/ui/Primitives";
import { formatDate, getAllPosts } from "@/lib/posts";
import { postsHref, queryPosts } from "@/lib/post-filters";
import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Posts — 이가람",
  description: "프론트엔드 개발, 성능 최적화, 디자인 시스템에 대한 이야기",
  path: "/posts",
});

interface Props {
  searchParams: Promise<{ tag?: string | string[]; q?: string | string[]; page?: string | string[] }>;
}

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  const selectedTag = first(params.tag);
  const query = first(params.q);
  const allPosts = getAllPosts();
  const tags = [...new Set(allPosts.flatMap((post) => post.tags))].sort();
  const { posts, total, page, totalPages } = queryPosts(allPosts, { tag: selectedTag, query, page: first(params.page) });

  return <main className="writing-page">
    <div className="writing-shell">
      <header className="writing-header">
        <p>Writing</p>
        <h1>개발하며 남긴 기록</h1>
        <span>구현하면서 마주한 문제와 선택을 짧고 명확하게 정리합니다.</span>
      </header>

      <form action="/posts" method="get" role="search" className="writing-filters">
        <label className="writing-search" htmlFor="post-search"><span className="sr-only">글 검색</span><SearchField id="post-search" name="q" defaultValue={query} placeholder="글 검색" /></label>
        <label className="writing-select" htmlFor="post-tag"><span className="sr-only">태그 선택</span><Select id="post-tag" name="tag" defaultValue={selectedTag}><option value="">모든 주제</option>{selectedTag && !tags.includes(selectedTag) && <option value={selectedTag}>{selectedTag}</option>}{tags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}</Select></label>
        <Button type="submit" size={52} variant="secondary">찾기</Button>
      </form>

      <div className="writing-results"><span>{total}개의 글</span>{(selectedTag || query) && <div><span>{[selectedTag && `#${selectedTag}`, query && `“${query}”`].filter(Boolean).join(" · ")}</span><ButtonLink href="/posts" variant="text" size={44}>초기화</ButtonLink></div>}</div>
      <Divider variant="inset" className="writing-list-divider" />

      {posts.length === 0 ? <EmptyState title="검색 결과가 없습니다" description="다른 검색어 또는 주제로 다시 찾아보세요." /> : <ol className="writing-list">{posts.map((post) => <li key={post.slug}>
        <Link href={`/posts/${post.slug}`} className="writing-item">
          <div className="writing-item-content"><div className="writing-item-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span aria-hidden="true">·</span><span>{post.readingTime}분 읽기</span></div><h2>{post.title}</h2><p>{post.description}</p><div className="writing-item-tags">{post.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <ArrowUpRight className="writing-item-arrow" size={20} aria-hidden="true" />
        </Link>
      </li>)}</ol>}

      <Pagination label="글 목록 페이지" page={page} totalPages={totalPages} hrefForPage={(number) => postsHref({ tag: selectedTag, query, page: number })} />
    </div>
  </main>;
}
