import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  readingTime: number; // 분
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/* .md 파일 목록에서 slug 추출 */
function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/* 읽기 시간 추정 (한국어 기준 분당 400자) */
function calcReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 400));
}

/* 전체 포스트 메타 (목록용) */
export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
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
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 최신순
}

/* 단일 포스트 (상세용) */
export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml, { sanitize: false })
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
