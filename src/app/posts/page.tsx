import { formatDate, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts — 이가람",
  description: "프론트엔드 개발, 성능 최적화, 디자인 시스템에 대한 이야기",
};

export default function PostsPage() {
  const posts = getAllPosts();

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
        {posts.length === 0 ? (
          <div className="border-t border-[#e5e8eb] py-20 text-center">
            <p className="text-[17px] font-bold text-[#191f28]">
              아직 작성된 포스트가 없습니다.
            </p>
            <p className="mt-2 text-[14px] leading-6 text-[#8b95a1]">
              새로운 글이 올라오면 이곳에서 확인할 수 있습니다.
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
      </main>
    </div>
  );
}