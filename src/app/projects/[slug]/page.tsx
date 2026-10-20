import Nav from "@/components/ui/Nav";
import { projects } from "@/data/projects";
import { ProjectDetails } from "@/components/sections/projects/ProjectDetails";
import { GlassChip } from "@/components/ui/Glass";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  return pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
    <Nav />
    <main className="detail-page">
      <article className="mx-auto max-w-[900px]">
        <Link href="/#projects" className="inline-block rounded text-sm font-semibold text-blue">
          ← 프로젝트 목록
        </Link>
        <header className="mb-8 mt-10">
          <p className="text-sm font-semibold text-muted">{project.period}</p>
          <h1 className="page-title mt-3">
            {project.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-body">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <GlassChip key={tool} className="px-3 py-1 text-sm text-blue">{tool}</GlassChip>
            ))}
          </div>
        </header>
        <ProjectDetails project={project} />
      </article>
    </main>
    </>
  );
}
