import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts — 이가람",
  description: "프론트엔드 개발, 성능 최적화, 디자인 시스템에 대한 이야기",
};

export default function PostsPage() {
  const posts = getAllPosts();

  /* 전체 태그 목록 */
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="border-b border-[#e5e8eb] bg-white sticky top-[60px] z-30">
        <div className="container">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            <Link
              href="/posts"
              className="shrink-0 px-4 py-1.5 rounded-full bg-[#111827] text-white text-sm font-semibold"
            >
              전체 {posts.length}
            </Link>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/posts?tag=${encodeURIComponent(tag)}`}
                className="shrink-0 px-4 py-1.5 rounded-full bg-[#f7f8fa] border border-[#e5e8eb] text-[#374151] text-sm font-medium hover:bg-[#eef2ff] hover:border-[#c7d2fe] hover:text-[#4f46e5] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="max-w-3xl">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <span className="text-5xl">✍️</span>
              <p className="text-[#9ca3af]">아직 작성된 포스트가 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#f2f4f6]">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <article className="py-8 group">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 제목 */}
        <h2 className="text-xl font-bold text-[#111827] mb-2 leading-snug group-hover:text-[#4f46e5] transition-colors">
          {post.title}
        </h2>

        {/* 설명 */}
        <p className="text-[#6b7280] text-[15px] leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* 메타 */}
        <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}분 읽기</span>
        </div>
      </Link>
    </article>
  );
}
