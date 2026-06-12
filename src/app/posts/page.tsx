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
    <div className="bg-white">
      <section className="border-b border-[#e5e8eb] px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-[860px]">
          <p className="mb-4 text-[36px] font-bold leading-none tracking-[-0.04em] text-[#191f28] md:text-[52px]">
            Posts
          </p>

          <h1 className="max-w-[40ch] text-[18px] font-normal leading-[1.65] tracking-[-0.025em] text-[#6b7684] md:text-[22px]">
            프론트엔드 개발, 성능 최적화, 디자인 시스템, 그리고 제품을
            만드는 과정에서 배운 것들을 기록합니다.
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-[860px] px-5 py-6 sm:px-8 md:px-0 md:py-10">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e8eb] bg-[#f9fafb] px-6 py-20 text-center">
            <p className="text-[16px] font-semibold text-[#4e5968]">
              아직 작성된 포스트가 없습니다.
            </p>
            <p className="mt-2 text-[14px] text-[#8b95a1]">
              새로운 글이 올라오면 이곳에서 확인할 수 있습니다.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e5e8eb]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block py-8 md:py-10"
                >
                  <div className="mb-4 flex items-center gap-3 text-[12px] font-medium text-[#8b95a1]">
                    <span>{formatDate(post.date)}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-[#d1d6db]" />
                    <span>{post.readingTime}분 읽기</span>
                  </div>

                  <h2 className="max-w-[760px] text-[25px] font-bold leading-[1.28] tracking-[-0.035em] text-[#191f28] transition-colors group-hover:text-[#3182f6] md:text-[32px]">
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
                          className="rounded-full bg-[#f2f4f6] px-3 py-1 text-[12px] font-semibold text-[#4e5968] transition-colors group-hover:bg-[#e8f3ff] group-hover:text-[#2272eb]"
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