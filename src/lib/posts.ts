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
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        fs.existsSync(path.join(POSTS_DIR, dirent.name, "index.md")) &&
        fs.statSync(path.join(POSTS_DIR, dirent.name, "index.md")).isFile()
    )
    .map((dirent) => dirent.name);
}

/* 읽기 시간 */
function calcReadingTime(content: string): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(1, Math.round(chars / 400));
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function readPost(slug: string): { meta: PostMeta; content: string } | null {
  // Only accept a direct child folder, including for dynamic route requests.
  if (!slug || slug === "." || slug === ".." || /[/\\]/.test(slug)) return null;
  const filePath = path.join(POSTS_DIR, slug, "index.md");
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  const invalid = (field: string, expected: string): never => {
    throw new Error(`Invalid post metadata in ${filePath}: ${field} ${expected}`);
  };
  const requiredText = (field: string): string => {
    const value: unknown = data[field];
    if (typeof value !== "string" || !value.trim()) {
      return invalid(field, "must be a non-empty string");
    }
    return value.trim();
  };

  const title = requiredText("title");
  const description = requiredText("description");
  const date = requiredText("date");
  if (!isValidDate(date)) invalid("date", "must be a valid YYYY-MM-DD date");

  const rawTags: unknown = data.tags === undefined ? [] : data.tags;
  if (
    !Array.isArray(rawTags) ||
    !rawTags.every((tag: unknown) => typeof tag === "string" && tag.trim())
  ) {
    invalid("tags", "must be an array of non-empty strings");
  }
  const tags = [...new Set((rawTags as string[]).map((tag) => tag.trim()))];
  const thumbnail: unknown = data.thumbnail;
  if (thumbnail !== undefined && (typeof thumbnail !== "string" || !thumbnail.trim())) {
    invalid("thumbnail", "must be a non-empty string when provided");
  }

  return {
    meta: {
      slug,
      title,
      description,
      date,
      tags,
      thumbnail: typeof thumbnail === "string" ? thumbnail.trim() : undefined,
      readingTime: calcReadingTime(content),
    },
    content,
  };
}

/* 전체 포스트 */
export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .flatMap((slug) => {
      const post = readPost(slug);
      return post ? [post.meta] : [];
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/* 단일 포스트 */
export async function getPost(slug: string): Promise<Post | null> {
  const post = readPost(slug);
  if (!post) return null;
  const { meta, content } = post;

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml, {
      // Keep Markdown-generated markup; omit raw HTML and unsafe URL protocols.
      sanitize: true,
    })
    .process(content);

  return {
    ...meta,
    contentHtml: processed.toString(),
  };
}

/* 날짜 포맷 */
export function formatDate(dateStr: string): string {
  if (!isValidDate(dateStr)) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
