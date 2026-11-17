import { Breadcrumb, ButtonLink, TagLink } from "@/components/ui/Primitives";
import { ArrowUpRight } from "lucide-react";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import "@/styles/prose.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";

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

  return pageMetadata({
    title: `${post.title} — 이가람`,
    description: post.description,
    path: `/posts/${post.slug}`,
    kind: "article",
    date: post.date,
  });
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
    <main className="post-page">
      <header className="post-header">
        <div className="post-header-inner">
          <Breadcrumb items={[{ label: "블로그", href: "/posts" }, { label: post.title }]} />
          <p className="post-kicker">Writing</p>
          <h1>{post.title}</h1>
          <p className="post-deck">{post.description}</p>
          <div className="post-meta"><span>이가람</span><span>{formatDate(post.date)}</span><span>{post.readingTime}분 읽기</span></div>
          {post.tags.length > 0 && <div className="post-tags">{post.tags.map((tag) => <TagLink key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`}>{tag}</TagLink>)}</div>}
        </div>
      </header>

      <div className="post-content-shell">
        <article className="prose post-article" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <section className="post-more" aria-label="다른 글">
          <div className="post-more-heading"><h2>이어서 읽기</h2><ButtonLink href="/posts" variant="text" size={44}>모든 글 <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink></div>
          <div className="post-more-grid">
            {prevPost && (
              <PostNavLink
                href={`/posts/${prevPost.slug}`}
                label="이전 글"
                title={prevPost.title}
              />
            )}

            {nextPost && (
              <PostNavLink
                href={`/posts/${nextPost.slug}`}
                label="다음 글"
                title={nextPost.title}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function PostNavLink({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="post-next-card"
    >
      <span>{label}</span>
      <strong>{title}</strong>
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
