import { ArrowUpRight, Plus } from "lucide-react";
import { CaseStudyBlock } from "@/components/sections/projects/CaseStudyBlock";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { careerProjects } from "@/data/projects";
import type { CaseBlock } from "@/types/case-study";
import { GlassIcon, GlassPanel } from "./Glass";
import { AccordionItem, Breadcrumb, Button, ButtonLink, Card, DataTable, Divider, EmptyState, ItemList, ListItem, ListItemLink, ListRow, Loading, Tag, TagLink, TopNavLink } from "./Primitives";
import { ButtonPreview, ChipPreview, EmptyStateAction, FormPreview, IconPreview, PaginationPreview } from "./GalleryInteractive";
import { GallerySample as Sample } from "./GallerySample";
import { Tooltip } from "./Tooltip";

const menu = [
  ["foundation", "Foundation"], ["buttons", "Button"], ["tags", "Tag"],
  ["forms", "Input"], ["content", "Content"], ["states", "States"],
  ["cases", "Case study"],
] as const;

const colors = [
  ["Ink", "#131415", "var(--ds-static-black)"], ["Body", "#4A4C50", "var(--ds-gray-650)"],
  ["Muted", "#61646B", "var(--ds-gray-550)"], ["Blue", "#005CCC", "var(--ds-blue-500)"],
  ["Surface", "#F8F9FA", "var(--ds-gray-25)"], ["Border", "#D5D8DD", "var(--ds-gray-150)"],
] as const;

const cases: CaseBlock[] = [
  { kind: "statement", title: "문제 정의", text: "초기 화면에서 같은 데이터를 여러 번 요청해 콘텐츠 표시가 늦어졌습니다. 호출 의존성을 정리하고 캐시 전략을 개선했습니다." },
  { kind: "list", title: "목표와 실행", columns: 2, items: ["도메인별 API 요청 분리", "SWR 캐싱과 재검증 설계", "이미지 로딩 예외 처리", "사용자 성능 지표 추적"] },
  { kind: "metrics", title: "결과", items: [{ value: "약 2초", label: "주요 화면 초기 로딩 단축" }, { value: "27%", label: "전 분기 대비 매출 증가 기여" }] },
  { kind: "flow", title: "작업 흐름", steps: [{ label: "문제 확인", detail: "중복 요청과 지연 구간 파악" }, { label: "구조 개선", detail: "API와 데이터 흐름 재설계" }, { label: "측정", detail: "RUM으로 오류와 성능 확인" }] },
  { kind: "causes", title: "원인 분석", roots: [{ label: "화면 표시 지연", children: [{ label: "중복 API 요청" }, { label: "이미지 로딩 대기" }] }] },
  { kind: "table", title: "변경 전후", columns: ["기존", "개선"], rows: [{ label: "데이터 요청", cells: ["화면별 중복 요청", "도메인별 캐시 재사용"] }, { label: "로딩 화면", cells: ["빈 화면", "Skeleton UI"] }] },
  { kind: "matrix", title: "우선순위", cells: [{ items: ["중복 요청 제거"] }, { items: ["공통 컴포넌트 정리"] }, { items: ["운영 오류 점검"] }, { items: ["장식 요소 변경"] }] },
];

function GallerySection({ id, number, title, description, children }: { id: string; number: string; title: string; description: string; children: React.ReactNode }) {
  return <section id={id} className="gallery-section">
    <div className="gallery-section-heading"><span className="gallery-index">{number}</span><div><h2>{title}</h2><p>{description}</p></div></div>
    {children}
  </section>;
}

export default function ComponentGallery() {
  return <main className="gallery-page">
    <div className="gallery-shell">
      <header className="gallery-hero">
        <p className="section-label">GARAM.DEV / UI INVENTORY</p>
        <h1>Components</h1>
        <p>사이트에서 실제로 사용하는 컴포넌트를 한곳에서 확인합니다. 버튼을 누르고, 아코디언을 펼치며 상태를 살펴볼 수 있습니다.</p>
        <div className="gallery-hero-meta"><span>7 sections</span><span>Color · Type · Motion</span><span>Interactive preview</span></div>
      </header>
      <div className="gallery-layout">
        <nav className="gallery-sidebar" aria-label="컴포넌트 목차"><p>ON THIS PAGE</p>{menu.map(([id, title]) => <a key={id} href={`#${id}`}>{title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</nav>
        <div className="gallery-content">
          <GallerySection id="foundation" number="01" title="Foundation" description="색상, 글자 크기, 표면과 간격의 기준입니다.">
            <Sample title="Color" note="Semantic palette"><div className="gallery-swatches">{colors.map(([name, hex, value]) => <div className="gallery-swatch" key={name}><span className="gallery-swatch-color" style={{ background: value }} /><strong>{name}</strong><code>{hex}</code></div>)}</div></Sample>
            <Sample title="Typography" note="Pretendard"><div className="gallery-type"><div><span>Display / 60</span><strong className="gallery-type-display">읽기 좋은 구조를 만듭니다.</strong></div><div><span>Heading / 32</span><strong className="gallery-type-heading">문제를 해결한 기록.</strong></div><div><span>Title / 24</span><strong className="gallery-type-title">기술을 쓰는 기준</strong></div><div><span>Body / 16</span><p>서비스의 성능과 운영 안정성을 개선해왔습니다.</p></div></div></Sample>
            <Sample title="Surface & radius" note="8 · 12 · 16px"><div className="gallery-surfaces"><GlassPanel className="gallery-surface">Default surface</GlassPanel><GlassPanel interactive className="gallery-surface gallery-surface-raised">Interactive surface</GlassPanel><GlassIcon className="gallery-icon"><Plus size={20} aria-hidden="true" /></GlassIcon></div></Sample>
            <Sample title="Divider" note="Inset · Full width"><div className="gallery-divider-preview"><span>Inset</span><Divider /><span>Full width</span><Divider variant="full" /></div></Sample>
          </GallerySection>

          <GallerySection id="buttons" number="02" title="Button" description="주요 행동과 보조 행동을 구분하고, 상태 변화를 짧게 전달합니다.">
            <Sample title="Variants" note="Primary · Secondary · Text"><ButtonPreview /></Sample>
            <Sample title="Sizes" note="24 · 32 · 40 · 44 · 48 · 56"><div className="gallery-row gallery-row-baseline">{([24, 32, 40, 44, 48, 56] as const).map((size) => <Button key={size} size={size} variant="secondary">{size}px</Button>)}</div></Sample>
            <Sample title="Flexible width"><Button fullWidth>전체 너비 버튼</Button></Sample>
            <Sample title="Link & icon" note="44px target"><div className="gallery-row"><ButtonLink href="/#projects" variant="primary">기술 사례 보기 <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink><IconPreview /></div></Sample>
          </GallerySection>

          <GallerySection id="tags" number="03" title="Tag" description="기술과 주제를 짧은 단위로 묶어 표시합니다.">
            <Sample title="Size & tone" note="18 · 20 · 24px"><div className="gallery-row"><Tag size={18}>Small</Tag><Tag size={20} tone="blue">Medium</Tag><Tag size={24} tone="green">Large</Tag><TagLink href="/posts">글 목록 보기 <ArrowUpRight size={14} aria-hidden="true" /></TagLink></div></Sample>
            <Sample title="Chip" note="선택 상태"><ChipPreview /></Sample>
          </GallerySection>

          <GallerySection id="forms" number="04" title="Input" description="실제 입력과 선택이 가능한 필드입니다.">
            <FormPreview />
          </GallerySection>

          <GallerySection id="content" number="05" title="Content" description="목록, 카드와 펼침 UI를 실제 데이터로 미리 봅니다.">
            <Sample title="Top navigation" note="현재 페이지 표시"><nav aria-label="미리보기 내비게이션" className="gallery-row"><TopNavLink href="/">홈</TopNavLink><TopNavLink href="/posts" aria-current="page">블로그</TopNavLink><TopNavLink href="/components">컴포넌트</TopNavLink></nav></Sample>
            <Sample title="Breadcrumb"><Breadcrumb items={[{ label: "홈", href: "/" }, { label: "블로그", href: "/posts" }, { label: "현재 글" }]} /></Sample>
            <Sample title="Card" note="Outline · Filled"><div className="gallery-two-col"><Card><Tag size={20} tone="blue">기술 사례</Tag><h3 className="text-ds-20 font-semibold text-heading">구조를 정리한 기록</h3><p className="text-ds-14 leading-6 text-body">정보를 하나의 단위로 묶고, 필요한 행동을 함께 배치합니다.</p><ButtonLink href="/#projects" variant="text" size={44}>사례 보기 <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink></Card><Card variant="filled"><Tag size={20}>운영</Tag><h3 className="text-ds-20 font-semibold text-heading">데이터 흐름 개선</h3><p className="text-ds-14 leading-6 text-body">관련된 정보와 성과를 한눈에 살펴볼 수 있습니다.</p></Card></div></Sample>
            <Sample title="Project card" note="Live project data"><ItemList><ListItem><ProjectCard project={careerProjects[0]} index={0} /></ListItem></ItemList></Sample>
            <Sample title="List row"><ItemList><ListItem><ListItemLink href="/posts"><ListRow headline="글 목록" description="기술과 경험을 정리한 기록" trailing={<ArrowUpRight size={18} aria-hidden="true" />} /></ListItemLink></ListItem></ItemList></Sample>
            <Sample title="Accordion" note="Click to expand"><AccordionItem summary={<div><strong className="text-ds-18 text-heading">프론트엔드 구조 설계</strong><p className="mt-2 text-ds-14 text-body">공통 UI와 데이터 흐름을 설계했습니다.</p></div>}><div className="gallery-accordion-body">서비스 초기부터 컴포넌트와 개발 규칙을 정리해 일관된 화면을 구축했습니다.</div></AccordionItem></Sample>
          </GallerySection>

          <GallerySection id="states" number="06" title="States" description="결과가 없을 때와 여러 페이지가 있을 때의 표시입니다.">
            <Sample title="Loading" note="Small · Medium · Large"><div className="gallery-row"><Loading size="small" label="짧은 작업" /><Loading label="불러오는 중" /><Loading size="large" label="전체 화면" /></div></Sample>
            <Sample title="Tooltip" note="눌러서 열기"><div className="gallery-row"><span className="text-ds-14 text-body">도움말</span><Tooltip label="도움말 열기">이 요소에 대한 추가 설명입니다.</Tooltip></div></Sample>
            <Sample title="Empty state"><EmptyState title="검색 결과가 없습니다" description="다른 키워드로 다시 검색해 보세요." action={<EmptyStateAction />} /></Sample>
            <PaginationPreview />
          </GallerySection>

          <GallerySection id="cases" number="07" title="Case study" description="프로젝트 상세에서 쓰는 일곱 가지 기록 형식입니다.">
            <Sample title="Table" note="수치와 텍스트 비교"><DataTable label="비교 미리보기" columns={["기존", "개선"]} rows={[{ label: "데이터 요청", cells: ["중복 요청", "캐시 재사용"] }, { label: "로딩 경험", cells: ["빈 화면", "Skeleton UI"] }]} /></Sample>
            <div className="gallery-case-list">{cases.map((block) => <CaseStudyBlock key={block.title} block={block} />)}</div>
          </GallerySection>
        </div>
      </div>
    </div>
  </main>;
}
