import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import "@/styles/prose.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
  const currentIdx = allPosts.findIndex((item) => item.slug === slug);
  const prevPost = allPosts[currentIdx + 1] ?? null;
  const nextPost = allPosts[currentIdx - 1] ?? null;

  return (
    <div className="bg-white">
      <header className="border-b border-[#e5e8eb] px-5 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-5 flex items-center gap-3 text-[12px] font-medium text-[#8b95a1]">
            <span>{formatDate(post.date)}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#d1d6db]" />
            <span>{post.readingTime}분 읽기</span>
          </div>

          {post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/posts?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[#f2f4f6] px-3 py-1 text-[12px] font-semibold text-[#4e5968] transition-colors hover:bg-[#e8f3ff] hover:text-[#2272eb]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-[34px] font-bold leading-[1.18] tracking-[-0.05em] text-[#191f28] md:text-[52px]">
            {post.title}
          </h1>

          <p className="mt-6 text-[17px] leading-[1.75] text-[#6b7684] md:text-[19px]">
            {post.description}
          </p>
        </div>
      </header>

      <main className="px-5 sm:px-8">
        <article
          className="prose mx-auto max-w-[720px]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <section className="mx-auto max-w-[720px] border-t border-[#e5e8eb] py-12 md:py-16">
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8b95a1]">
            More posts
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group rounded-2xl border border-[#e5e8eb] bg-white p-5 transition-all hover:border-[#3182f6] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)]"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b95a1]">
                  Previous
                </p>
                <p className="line-clamp-2 text-[17px] font-bold leading-[1.35] tracking-[-0.03em] text-[#191f28] group-hover:text-[#3182f6]">
                  {prevPost.title}
                </p>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group rounded-2xl border border-[#e5e8eb] bg-white p-5 transition-all hover:border-[#3182f6] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)]"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b95a1]">
                  Next
                </p>
                <p className="line-clamp-2 text-[17px] font-bold leading-[1.35] tracking-[-0.03em] text-[#191f28] group-hover:text-[#3182f6]">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}