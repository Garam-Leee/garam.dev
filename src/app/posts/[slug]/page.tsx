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
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#3182f6]/[0.055] blur-3xl" />

      <header className="relative px-5 pb-12 pt-28 sm:px-8 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#8b95a1]">
            <span>{formatDate(post.date)}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#d1d6db]" />
            <span>{post.readingTime}분 읽기</span>
          </div>

          <h1 className="text-[clamp(2rem,7vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.06em] text-[#191f28]">
            {post.title}
          </h1>

          <p className="mt-6 max-w-[680px] text-[17px] leading-[1.75] tracking-[-0.015em] text-[#6b7684] md:text-[19px]">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/posts?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[#f2f4f6]/80 px-3 py-1 text-[12px] font-semibold text-[#4e5968] backdrop-blur-md transition hover:bg-[#e8f3ff] hover:text-[#2272eb]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="relative px-5 sm:px-8">
        <article
          className="prose mx-auto max-w-[720px]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <section className="mx-auto max-w-[720px] border-t border-[#e5e8eb] py-12 md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8b95a1]">
              More posts
            </p>

            <Link
              href="/posts"
              className="text-[13px] font-bold text-[#3182f6] transition hover:text-[#2272eb]"
            >
              전체 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-0 divide-y divide-[#e5e8eb] md:grid-cols-2 md:divide-x md:divide-y-0">
            {prevPost && (
              <PostNavLink
                href={`/posts/${prevPost.slug}`}
                label="Previous"
                title={prevPost.title}
                align="left"
              />
            )}

            {nextPost && (
              <PostNavLink
                href={`/posts/${nextPost.slug}`}
                label="Next"
                title={nextPost.title}
                align="right"
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function PostNavLink({
  href,
  label,
  title,
  align,
}: {
  href: string;
  label: string;
  title: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={[
        "group block py-5 transition hover:bg-[#f9fafb]",
        align === "left" ? "md:pr-6" : "md:pl-6",
      ].join(" ")}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b95a1]">
        {label}
      </p>
      <p className="mt-2 line-clamp-2 text-[17px] font-bold leading-[1.35] tracking-[-0.03em] text-[#191f28] transition group-hover:text-[#3182f6]">
        {title}
      </p>
    </Link>
  );
}