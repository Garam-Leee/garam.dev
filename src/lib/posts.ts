import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/* posts 폴더명 -> slug */
function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/* 읽기 시간 */
function calcReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 400));
}

/* 전체 포스트 */
export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const file = fs.readFileSync(
        path.join(POSTS_DIR, slug, "index.md"),
        "utf-8"
      );

      const { data, content } = matter(file);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
        thumbnail: data.thumbnail,
        readingTime: calcReadingTime(content),
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* 단일 포스트 */
export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, slug, "index.md");

  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml, {
      sanitize: false,
    })
    .process(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    readingTime: calcReadingTime(content),
    contentHtml: processed.toString(),
  };
}

/* 날짜 포맷 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
