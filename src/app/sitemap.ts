import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/posts"), priority: 0.8 },
    ...getAllPosts().map((post) => ({ url: absoluteUrl(`/posts/${post.slug}`), lastModified: post.date })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`) })),
  ];
}
