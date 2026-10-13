import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";
import { renderOgImage } from "@/lib/og-image";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  const slug = params.get("slug");
  if (type === "post") {
    const post = getAllPosts().find((item) => item.slug === slug);
    return post ? renderOgImage(post.title, "Posts") : new Response("Not Found", { status: 404 });
  }
  if (type === "project") {
    const project = projects.find((item) => item.slug === slug);
    return project ? renderOgImage(project.title, "Projects") : new Response("Not Found", { status: 404 });
  }
  return renderOgImage("서비스 성장과 사용자 경험을 만드는 프론트엔드 개발자", "Portfolio");
}
