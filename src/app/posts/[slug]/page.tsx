import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getAllPosts, formatDate } from "@/lib/posts";
import "@/styles/prose.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — 이가람`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = allPosts[currentIdx + 1] ?? null;
  const nextPost = allPosts[currentIdx - 1] ?? null;

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비 */}
      <div className="border-b border-[#e5e8eb] bg-white sticky top-[60px] z-20">
        <div className="container py-3 flex items-center justify-between">
          <Link
            href="/posts"
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#4f46e5] transition-colors font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Posts
          </Link>
          <span className="text-sm text-[#9ca3af]">{post.readingTime}분 읽기</span>
        </div>
      </div>

      <div className="container py-10 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* 포스트 헤더 */}
          <header className="mb-10">
            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 제목 */}
            <h1
              className="font-extrabold leading-tight tracking-[-0.03em] text-[#111827] mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              {post.title}
            </h1>

            {/* 설명 */}
            <p className="text-lg text-[#6b7280] leading-relaxed mb-5">{post.description}</p>

            {/* 메타 */}
            <div className="flex items-center gap-3 pb-6 border-b border-[#e5e8eb]">
              <div className="w-8 h-8 rounded-full bg-[#4f46e5] flex items-center justify-center">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">이가람</p>
                <p className="text-xs text-[#9ca3af]">
                  {formatDate(post.date)} · {post.readingTime}분 읽기
                </p>
              </div>
            </div>
          </header>

          {/* 포스트 본문 */}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* 하단 구분 */}
          <div className="mt-16 pt-8 border-t border-[#e5e8eb]">
            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 rounded-lg bg-[#f7f8fa] border border-[#e5e8eb] text-sm text-[#374151] font-medium hover:bg-[#eef2ff] hover:border-[#c7d2fe] hover:text-[#4f46e5] transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* 이전 / 다음 포스트 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prevPost && (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-[#e5e8eb] hover:border-[#c7d2fe] hover:bg-[#eef2ff] transition-all"
                >
                  <span className="text-xs text-[#9ca3af] font-medium">← 이전 포스트</span>
                  <span className="text-sm font-semibold text-[#111827] group-hover:text-[#4f46e5] transition-colors line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-[#e5e8eb] hover:border-[#c7d2fe] hover:bg-[#eef2ff] transition-all text-right sm:col-start-2"
                >
                  <span className="text-xs text-[#9ca3af] font-medium">다음 포스트 →</span>
                  <span className="text-sm font-semibold text-[#111827] group-hover:text-[#4f46e5] transition-colors line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
