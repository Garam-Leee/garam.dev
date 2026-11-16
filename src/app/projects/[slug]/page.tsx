import Nav from "@/components/ui/Nav";
import { projects } from "@/data/projects";
import { ProjectDetails } from "@/components/sections/projects/ProjectDetails";
import { Breadcrumb, Tag } from "@/components/ui/Primitives";
import type { Metadata } from "next";
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
        <Breadcrumb items={[{ label: "기술 사례", href: "/#projects" }, { label: project.title }]} />
        <header className="mb-8 mt-10">
          <p className="text-ds-14 font-semibold text-muted">{project.period}</p>
          <h1 className="page-title mt-3">
            {project.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-body">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Tag key={tool} className="px-3 py-1 text-ds-14 text-blue">{tool}</Tag>
            ))}
          </div>
        </header>
        <ProjectDetails project={project} />
      </article>
    </main>
    </>
  );
}
