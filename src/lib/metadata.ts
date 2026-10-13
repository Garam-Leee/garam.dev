import type { Metadata } from "next";
import { absoluteUrl, siteName } from "./site";

export function pageMetadata({ title, description, path, kind = "website", date }: {
  title: string; description: string; path: string; kind?: "website" | "article"; date?: string;
}): Metadata {
  const params = new URLSearchParams();
  if (path.startsWith("/posts/")) { params.set("type", "post"); params.set("slug", path.split("/")[2]); }
  if (path.startsWith("/projects/")) { params.set("type", "project"); params.set("slug", path.split("/")[2]); }
  const image = { url: absoluteUrl(params.size ? `/og?${params}` : "/og"), width: 1200, height: 630, alt: title };
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), siteName, locale: "ko_KR", type: kind, images: [image], ...(kind === "article" && date ? { publishedTime: date } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
