import { formatDate, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import { postsHref, queryPosts } from "@/lib/post-filters";

export const metadata: Metadata = {
  title: "Posts — 이가람",
  description: "프론트엔드 개발, 성능 최적화, 디자인 시스템에 대한 이야기",
};

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#3182f6]/[0.055] blur-3xl" />

      <section className="relative px-5 pb-12 pt-28 sm:px-8 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-[860px]">
          <p className="text-[13px] font-bold leading-5 text-[#3182f6]">
            Posts
          </p>

          <h1 className="mt-4 max-w-[760px] text-[clamp(1.4rem,7vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.065em] text-[#191f28]">
          개발하며 경험한 것들
          </h1>

          <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#6b7684] sm:text-[17px] sm:leading-8">
            프론트엔드 개발, 성능 최적화, 디자인 시스템, 그리고 제품을
            만드는 과정에서 배운 것들을 기록합니다.
          </p>
        </div>
      </section>

      <main className="relative mx-auto max-w-[860px] px-5 pb-24 sm:px-8 md:px-0">
        <form action="/posts" method="get" role="search" className="mb-6 flex flex-wrap items-end gap-3">
          <label className="min-w-[180px] flex-1 text-sm font-semibold text-body" htmlFor="post-search">
            글 검색
            <input id="post-search" name="q" type="search" defaultValue={query} placeholder="제목, 설명, 태그 검색" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-heading" />
          </label>
          <label className="text-sm font-semibold text-body" htmlFor="post-tag">
            태그
            <select id="post-tag" name="tag" defaultValue={selectedTag} className="mt-2 block max-w-full rounded-xl border border-border bg-white px-3 py-2 text-heading">
              <option value="">전체 태그</option>
              {selectedTag && !tags.includes(selectedTag) && <option value={selectedTag}>{selectedTag}</option>}
              {tags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </label>
          <button type="submit" className="rounded-xl bg-blue px-4 py-2 font-semibold text-white">검색</button>
        </form>
        <p className="mb-4 text-sm text-body">총 {total}개의 글 · {page} / {totalPages} 페이지</p>
        {(selectedTag || query) && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] font-semibold text-[#4e5968]">
              {selectedTag && <span className="text-[#3182f6]">#{selectedTag} </span>}
              {query && <span>검색어: {query}</span>}
            </p>
            <Link
              href="/posts"
              className="rounded-full bg-[#f2f4f6] px-3 py-1.5 text-[13px] font-semibold text-[#4e5968] transition hover:bg-[#e8f3ff] hover:text-[#2272eb] focus-visible:ring-2 focus-visible:ring-[#3182f6] focus-visible:ring-offset-2"
            >
              필터 해제
            </Link>
          </div>
        )}
        {posts.length === 0 ? (
          <div className="border-t border-[#e5e8eb] py-20 text-center">
            <p className="text-[17px] font-bold text-[#191f28]">
              {selectedTag || query
                ? "조건에 맞는 포스트가 없습니다."
                : "아직 작성된 포스트가 없습니다."}
            </p>
            <p className="mt-2 text-[14px] leading-6 text-[#8b95a1]">
              {selectedTag || query
                ? "필터를 해제하면 전체 글을 볼 수 있습니다."
                : "새로운 글이 올라오면 이곳에서 확인할 수 있습니다."}
            </p>
          </div>
        ) : (
          <ul className="border-t border-[#e5e8eb]">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-[#e5e8eb]">
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block py-8 transition md:py-10"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#8b95a1]">
                    <span>{formatDate(post.date)}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-[#d1d6db]" />
                    <span>{post.readingTime}분 읽기</span>
                  </div>

                  <h2 className="mt-4 max-w-[760px] text-[25px] font-bold leading-[1.25] tracking-[-0.04em] text-[#191f28] transition-colors group-hover:text-[#3182f6] md:text-[32px]">
                    {post.title}
                  </h2>

                  <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-[#6b7684] md:text-[16px]">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f2f4f6] px-3 py-1 text-[12px] font-semibold text-[#4e5968] transition group-hover:bg-[#e8f3ff] group-hover:text-[#2272eb]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 && (
          <nav aria-label="글 목록 페이지" className="mt-8 flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={postsHref({ tag: selectedTag, query, page: number })}
                aria-current={number === page ? "page" : undefined}
                aria-label={`${number}페이지`}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${number === page ? "bg-blue text-white" : "bg-[#f2f4f6] text-body"}`}
              >
                {number}
              </Link>
            ))}
          </nav>
        )}
      </main>
    </div>
  );
}
