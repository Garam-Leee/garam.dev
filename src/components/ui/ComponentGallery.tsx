"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import "@/styles/hero.css";
import { CaseStudyBlock } from "@/components/sections/projects/CaseStudyBlock";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { careerProjects } from "@/data/projects";
import type { CaseBlock } from "@/types/case-study";
import { GlassIcon, GlassPanel } from "./Glass";
import { AccordionItem, Breadcrumb, Button, ButtonLink, Card, DataTable, Divider, EmptyState, ItemList, ListItem, ListItemLink, ListRow, Loading, Table, Tabs, Tag, TagLink, TopNavLink } from "./Primitives";
import { ButtonPreview, CheckboxPreview, ChipPreview, DropdownPreview, EmptyStateAction, FormPreview, IconPreview, PaginationPreview, RadioPreview, SearchPreview, SelectButtonPreview, SliderPreview, SwitchPreview } from "./GalleryInteractive";
import { GallerySample as Sample, GallerySelectionContext } from "./GallerySample";
import { Tooltip } from "./Tooltip";

const menu = [
  { id: "foundation", items: ["Color", "Typography", "Surface & radius", "Divider"] },
  { id: "buttons", items: ["Button"] },
  { id: "tags", items: ["Tag", "Chip"] },
  { id: "forms", items: ["Search", "Text fields", "Dropdown", "Checkbox", "Radio Button", "Select Button", "Slider", "Switch"] },
  { id: "content", items: ["Navigation & Breadcrumb", "Cards", "List row", "Accordion"] },
  { id: "states", items: ["Loading", "Tooltip", "Empty state", "Pagination"] },
  { id: "cases", items: ["Table", "Data Table", "Case study blocks"] },
  { id: "tabs", items: ["Tab"] },
  { id: "site-patterns", items: ["Navigation", "Hero chat"] },
] as const;

const previewGroups: Record<string, readonly string[]> = {
  Button: ["Variants", "Sizes", "Flexible width", "Link & icon"],
  Tag: ["Size & tone"],
  "Text fields": ["Text field"],
  Dropdown: ["Select", "Dropdown"],
  "Navigation & Breadcrumb": ["Top navigation", "Breadcrumb"],
  Cards: ["Card", "Card thumbnail", "Project card"],
  Tab: ["Fixed", "Fluid / Scrollable", "Fluid / 2 Depth"],
  "Data Table": ["Data rows", "List Table"],
};

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

function GallerySection({ id, description, children, active, selected }: { id: string; description: string; children: React.ReactNode; active: boolean; selected: string }) {
  return <section id={id} className="gallery-section" hidden={!active}>
    <div className="gallery-section-heading"><div><h2>{selected}</h2><p>{description}</p></div></div>
    {children}
  </section>;
}

export default function ComponentGallery() {
  const [activeCategory, setActiveCategory] = useState("foundation");
  const [activeItem, setActiveItem] = useState("Color");
  const items = menu.flatMap((category) => category.items.map((item) => ({ category: category.id, label: item })));
  return <main className="gallery-page">
    <div className="gallery-shell">
      <header className="gallery-hero">
        <h1>Components</h1>
      </header>
      <div className="gallery-layout">
        <nav className="gallery-sidebar" aria-label="컴포넌트 목록">{items.map(({ category, label }) => <button key={`${category}-${label}`} type="button" aria-current={activeCategory === category && activeItem === label ? "true" : undefined} onClick={() => { setActiveCategory(category); setActiveItem(label); }}>{label}<ArrowRight size={14} aria-hidden="true" /></button>)}</nav>
        <GallerySelectionContext.Provider value={previewGroups[activeItem] ?? [activeItem]}><div className="gallery-content" aria-live="polite">
          <GallerySection id="foundation" description="색상, 글자 크기, 표면과 간격의 기준입니다." active={activeCategory === "foundation"} selected={activeItem}>
            <Sample title="Color" note="Semantic palette"><div className="gallery-swatches">{colors.map(([name, hex, value]) => <div className="gallery-swatch" key={name}><span className="gallery-swatch-color" style={{ background: value }} /><strong>{name}</strong><code>{hex}</code></div>)}</div></Sample>
            <Sample title="Typography" note="Pretendard"><div className="gallery-type"><div><span>Display / 60</span><strong className="gallery-type-display">읽기 좋은 구조를 만듭니다.</strong></div><div><span>Heading / 32</span><strong className="gallery-type-heading">문제를 해결한 기록.</strong></div><div><span>Title / 24</span><strong className="gallery-type-title">기술을 쓰는 기준</strong></div><div><span>Body / 16</span><p>서비스의 성능과 운영 안정성을 개선해왔습니다.</p></div></div></Sample>
            <Sample title="Surface & radius" note="8 · 12 · 16px"><div className="gallery-surfaces"><GlassPanel className="gallery-surface">Default surface</GlassPanel><GlassPanel interactive className="gallery-surface gallery-surface-raised">Interactive surface</GlassPanel><GlassIcon className="gallery-icon"><Plus size={20} aria-hidden="true" /></GlassIcon></div></Sample>
            <Sample title="Divider" note="Inset · Full width"><div className="gallery-divider-preview"><span>Inset</span><Divider /><span>Full width</span><Divider variant="full" /></div></Sample>
          </GallerySection>

          <GallerySection id="buttons" description="주요 행동과 보조 행동을 구분하고, 상태 변화를 짧게 전달합니다." active={activeCategory === "buttons"} selected={activeItem}>
            <Sample title="Variants" note="Primary · Secondary · Text"><ButtonPreview /></Sample>
            <Sample title="Sizes" note="24 · 32 · 40 · 44 · 48 · 56"><div className="gallery-row gallery-row-baseline">{([24, 32, 40, 44, 48, 56] as const).map((size) => <Button key={size} size={size} variant="secondary">{size}px</Button>)}</div></Sample>
            <Sample title="Flexible width"><Button fullWidth>전체 너비 버튼</Button></Sample>
            <Sample title="Link & icon" note="44px target"><div className="gallery-row"><ButtonLink href="/#projects" variant="primary">기술 사례 보기 <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink><IconPreview /></div></Sample>
          </GallerySection>

          <GallerySection id="tags" description="기술과 주제를 짧은 단위로 묶어 표시합니다." active={activeCategory === "tags"} selected={activeItem}>
            <Sample title="Size & tone" note="18 · 20 · 24px"><div className="gallery-row"><Tag size={18}>Small</Tag><Tag size={20} tone="blue">Medium</Tag><Tag size={24} tone="green">Large</Tag><TagLink href="/posts">글 목록 보기 <ArrowUpRight size={14} aria-hidden="true" /></TagLink></div></Sample>
            <Sample title="Chip" note="Select · Filter · Multi-Select · Input"><ChipPreview /></Sample>
          </GallerySection>

          <GallerySection id="forms" description="입력과 선택 컴포넌트의 유형과 상태입니다." active={activeCategory === "forms"} selected={activeItem}>
            <Sample title="Search" note="Outline · Underline · Disabled"><SearchPreview /></Sample>
            <FormPreview />
            <Sample title="Dropdown" note="Basic · Line Info · Text"><DropdownPreview /></Sample>
            <Sample title="Checkbox" note="Icon · Square · Circle"><CheckboxPreview /></Sample>
            <Sample title="Radio Button" note="단일 선택 · 비활성"><RadioPreview /></Sample>
            <Sample title="Select Button" note="Horizontal · Vertical · 단일/중복 선택"><SelectButtonPreview /></Sample>
            <Sample title="Slider" note="Basic · Popover · Range"><SliderPreview /></Sample>
            <Sample title="Switch" note="On · Off · Disabled"><SwitchPreview /></Sample>
          </GallerySection>

          <GallerySection id="content" description="목록, 카드와 펼침 UI를 실제 데이터로 미리 봅니다." active={activeCategory === "content"} selected={activeItem}>
            <Sample title="Top navigation" note="현재 페이지 표시"><nav aria-label="미리보기 내비게이션" className="gallery-row"><TopNavLink href="/">홈</TopNavLink><TopNavLink href="/posts" aria-current="page">블로그</TopNavLink><TopNavLink href="/components">컴포넌트</TopNavLink></nav></Sample>
            <Sample title="Breadcrumb"><Breadcrumb items={[{ label: "홈", href: "/" }, { label: "블로그", href: "/posts" }, { label: "현재 글" }]} /></Sample>
            <Sample title="Card" note="Outline · Filled"><div className="gallery-two-col"><Card><Tag size={20} tone="blue">기술 사례</Tag><h3 className="text-ds-20 font-semibold text-heading">구조를 정리한 기록</h3><p className="text-ds-14 leading-6 text-body">정보를 하나의 단위로 묶고, 필요한 행동을 함께 배치합니다.</p><ButtonLink href="/#projects" variant="text" size={44}>사례 보기 <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink></Card><Card variant="filled"><div className="gallery-card-thumbnail gallery-card-thumbnail--wide" role="img" aria-label="16대 9 썸네일 영역 미리보기" /><Tag size={20}>운영</Tag><h3 className="text-ds-20 font-semibold text-heading">데이터 흐름 개선</h3><p className="text-ds-14 leading-6 text-body">관련된 정보와 성과를 한눈에 살펴볼 수 있습니다.</p></Card></div></Sample>
            <Sample title="Card thumbnail" note="16:9 · 1:1"><div className="gallery-two-col"><Card variant="filled"><div className="gallery-card-thumbnail gallery-card-thumbnail--wide" role="img" aria-label="16대 9 썸네일 영역 미리보기" /><h3 className="text-ds-18 font-semibold text-heading">넓은 이미지</h3></Card><Card variant="filled"><div className="gallery-card-thumbnail gallery-card-thumbnail--square" role="img" aria-label="1대 1 썸네일 영역 미리보기" /><h3 className="text-ds-18 font-semibold text-heading">정사각 이미지</h3></Card></div></Sample>
            <Sample title="Project card" note="Live project data"><ItemList><ListItem><ProjectCard project={careerProjects[0]} index={0} /></ListItem></ItemList></Sample>
            <Sample title="List row"><ItemList><ListItem><ListItemLink href="/posts"><ListRow headline="글 목록" description="기술과 경험을 정리한 기록" trailing={<ArrowUpRight size={18} aria-hidden="true" />} /></ListItemLink></ListItem></ItemList></Sample>
            <Sample title="Accordion" note="Label · Title · Optional icon"><div className="gallery-accordion-list"><AccordionItem summary={<div><span className="gallery-accordion-label">ARCHITECTURE</span><strong className="gallery-accordion-title">프론트엔드 구조 설계</strong></div>}><div className="gallery-accordion-body">서비스 초기부터 공통 컴포넌트와 데이터 흐름을 설계했습니다.</div></AccordionItem><AccordionItem showIcon={false} summary={<div><span className="gallery-accordion-label">PERFORMANCE</span><strong className="gallery-accordion-title">성능 개선 과정</strong></div>}><div className="gallery-accordion-body">요청 구조와 로딩 경험을 함께 개선했습니다.</div></AccordionItem></div></Sample>
          </GallerySection>

          <GallerySection id="states" description="결과가 없을 때와 여러 페이지가 있을 때의 표시입니다." active={activeCategory === "states"} selected={activeItem}>
            <Sample title="Loading" note="Small · Medium · Large"><div className="gallery-row"><Loading size="small" label="짧은 작업" /><Loading label="불러오는 중" /><Loading size="large" label="전체 화면" /></div></Sample>
            <Sample title="Tooltip" note="눌러서 열기"><div className="gallery-row"><span className="text-ds-14 text-body">도움말</span><Tooltip label="도움말 열기">이 요소에 대한 추가 설명입니다.</Tooltip></div></Sample>
            <Sample title="Empty state"><EmptyState title="검색 결과가 없습니다" description="다른 키워드로 다시 검색해 보세요." action={<EmptyStateAction />} /></Sample>
            <PaginationPreview />
          </GallerySection>

          <GallerySection id="cases" description="프로젝트 상세에서 쓰는 일곱 가지 기록 형식입니다." active={activeCategory === "cases"} selected={activeItem}>
            <Sample title="Table" note="Text Information · Data"><div className="gallery-table-preview"><div><strong>Text Information</strong><Table label="프로젝트 정보" columns={["내용"]} rows={[{ label: "프로젝트", cells: ["웹툰 플랫폼 개발 및 운영"] }, { label: "역할", cells: ["프론트엔드 구조 설계와 성능 개선"] }, { label: "기술", cells: ["Next.js · TypeScript · SWR"] }]} /></div><div><strong>Data</strong><Table variant="data" label="성과 비교" columns={["기존", "개선"]} rows={[{ label: "SEO 점수", cells: ["62점", "91점"] }, { label: "초기 로딩", cells: ["기준", "약 2초 단축"] }]} /></div></div></Sample>
            <Sample title="Data rows" note="행·열 비교"><DataTable label="비교 미리보기" columns={["기존", "개선"]} rows={[{ label: "데이터 요청", cells: ["중복 요청", "캐시 재사용"] }, { label: "로딩 경험", cells: ["빈 화면", "Skeleton UI"] }]} /></Sample>
            <Sample title="List Table" note="목록 탐색 · 모바일 가로 스크롤"><DataTable variant="list" label="기술 과제 목록" columns={["분야", "상태", "성과"]} rows={[{ label: "API 요청 최적화", cells: ["성능", "완료", "초기 로딩 약 2초 단축"] }, { label: "컴포넌트 문서화", cells: ["아키텍처", "완료", "재사용 기준 정리"] }, { label: "뷰어 안정화", cells: ["운영", "완료", "오류 대응 개선"] }]} /></Sample>
            {activeItem === "Case study blocks" && <div className="gallery-case-list">{cases.map((block) => <CaseStudyBlock key={block.title} block={block} />)}</div>}
          </GallerySection>
          <GallerySection id="tabs" description="같은 맥락의 콘텐츠를 Fixed 또는 Scrollable 형태로 전환합니다." active={activeCategory === "tabs"} selected={activeItem}>
            <Sample title="Fixed" note="균등 너비 · 최대 5개 권장"><Tabs label="Fixed Tab 미리보기" items={[{ value: "overview", label: "개요", content: "개요 콘텐츠입니다." }, { value: "process", label: "작업 과정", content: "작업 과정 콘텐츠입니다." }, { value: "result", label: "결과", content: "결과 콘텐츠입니다." }]} /></Sample>
            <Sample title="Fluid / Scrollable" note="가변 너비 · 가로 탐색"><Tabs label="Scrollable Tab 미리보기" variant="scrollable" items={[{ value: "all", label: "전체", content: "전체 사례를 보여줍니다." }, { value: "architecture", label: "아키텍처", content: "아키텍처 사례를 보여줍니다." }, { value: "performance", label: "성능 개선", content: "성능 개선 사례를 보여줍니다." }, { value: "reliability", label: "안정성", content: "안정성 사례를 보여줍니다." }, { value: "operations", label: "운영 도구", content: "운영 도구 사례를 보여줍니다." }]} /></Sample>
            <Sample title="Fluid / 2 Depth" note="대분류 · 중분류"><Tabs label="기술 사례 대분류" variant="fluid" items={[{ value: "webtoon", label: "웹툰", content: <Tabs label="웹툰 중분류" variant="fluid" items={[{ value: "platform", label: "플랫폼", content: "플랫폼 사례입니다." }, { value: "viewer", label: "뷰어", content: "뷰어 사례입니다." }]} /> }, { value: "healthcare", label: "헬스케어", content: "헬스케어 사례입니다." }]} /></Sample>
          </GallerySection>
          <GallerySection id="site-patterns" description="메인 페이지에서 사용하는 내비게이션과 채팅의 조합입니다." active={activeCategory === "site-patterns"} selected={activeItem}>
            <Sample title="Navigation" note="Home · Inner pages"><div className="gallery-site-nav"><nav className="gallery-glass-nav" aria-label="메인 메뉴 미리보기"><TopNavLink href="/#projects">기술 사례</TopNavLink><TopNavLink href="/posts">블로그</TopNavLink></nav><nav className="gallery-plain-nav" aria-label="내부 페이지 메뉴 미리보기"><TopNavLink href="/#projects">기술 사례</TopNavLink><TopNavLink href="/posts" aria-current="page">블로그</TopNavLink></nav></div></Sample>
            <Sample title="Hero chat" note="질문 · 답변 · 입력"><div className="gallery-chat-preview"><div className="hero-message hero-message-garam"><span className="hero-avatar" aria-hidden="true"><Image src="/garam-chat-avatar.webp" alt="" width={36} height={36} /></span><div className="hero-bubble">React·Next.js·TypeScript를 중심으로 데이터 흐름과 공통 UI를 설계합니다.</div></div><div className="hero-message hero-message-visitor"><div className="hero-bubble">어떤 기술을 쓰나요?</div></div><div className="hero-chat-input"><span aria-hidden="true">›_</span><span className="gallery-chat-placeholder">이가람에게 궁금한 점을 물어보세요</span><span className="gallery-chat-send" aria-hidden="true"><ArrowRight size={20} /></span></div><p className="hero-chat-note">경력기술서와 기술 사례를 바탕으로 준비한 답변입니다.</p></div></Sample>
          </GallerySection>
        </div></GallerySelectionContext.Provider>
      </div>
    </div>
  </main>;
}
