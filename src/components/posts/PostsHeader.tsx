"use client";

import Link from "next/link";

interface PostsHeaderProps {
  postsCount?: number;
  readingTime?: number;
  backHref?: string;
  backLabel?: string;
}

export default function PostsHeader({
  postsCount,
  readingTime,
  backHref,
  backLabel,
}: PostsHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e5e8eb] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 sm:px-8 md:px-12">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="text-[13px] font-semibold text-[#8b95a1] transition-colors hover:text-[#191f28]"
            >
              ← {backLabel}
            </Link>
          )}

          {!backHref && (
            <Link
              href="/"
              className="text-[13px] font-semibold text-[#8b95a1] transition-colors hover:text-[#191f28]"
            >
              garam.dev
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 text-[12px] font-semibold text-[#8b95a1]">
          {typeof postsCount === "number" && (
            <span>{postsCount} Posts</span>
          )}

          {typeof readingTime === "number" && (
            <span>{readingTime}분 읽기</span>
          )}
        </div>
      </div>
    </header>
  );
}