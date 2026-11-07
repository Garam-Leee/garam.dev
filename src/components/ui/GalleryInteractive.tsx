"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink, Checkbox, Chip, Dropdown, IconButton, Pagination, RadioGroup, RangeSlider, SearchField, Select, SelectButtonGroup, Slider, Switch, TextField } from "./Primitives";
import { GallerySample as Sample } from "./GallerySample";

export function ButtonPreview() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((value) => !value);
  return <div className="gallery-row"><Button onClick={toggle}>{clicked ? "선택 완료" : "Primary"}</Button><Button variant="secondary" onClick={toggle}>Secondary</Button><Button variant="text" onClick={toggle}>Text <ArrowRight size={16} aria-hidden="true" /></Button><Button disabled>Disabled</Button></div>;
}

export function ChipPreview() {
  const [selected, setSelected] = useState("전체");
  const [filters, setFilters] = useState<string[]>(["React"]);
  const [inputs, setInputs] = useState(["Next.js", "TypeScript"]);
  const toggleFilter = (value: string) => setFilters((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  return <div className="gallery-chip-preview">
    <div><strong>Select / 단일 선택</strong><div className="gallery-row">{["전체", "React", "Next.js"].map((value) => <Chip key={value} selected={selected === value} onClick={() => setSelected(value)}>{value}</Chip>)}</div></div>
    <div><strong>Filter / 조건</strong><div className="gallery-row">{["React", "TypeScript"].map((value) => <Chip key={value} variant="filter" selected={filters.includes(value)} onClick={() => toggleFilter(value)}>{value}</Chip>)}</div></div>
    <div><strong>Multi-Select / 여러 선택</strong><div className="gallery-row">{["아키텍처", "성능", "안정성"].map((value) => <Chip key={value} variant="multi-select" selected={filters.includes(value)} onClick={() => toggleFilter(value)}>{value}</Chip>)}</div></div>
    <div><strong>Input / 선택값 제거</strong><div className="gallery-row">{inputs.map((value) => <Chip key={value} variant="input" aria-label={`${value} 제거`} onClick={() => setInputs((current) => current.filter((item) => item !== value))}>{value}</Chip>)}</div></div>
    <div><strong>Disabled</strong><div className="gallery-row"><Chip disabled>선택 불가</Chip></div></div>
  </div>;
}

export function IconPreview() {
  const [active, setActive] = useState(false);
  return <IconButton aria-label={active ? "미리보기 선택됨" : "미리보기 선택"} aria-pressed={active} onClick={() => setActive((value) => !value)}><Plus aria-hidden="true" /></IconButton>;
}

export function FormPreview() {
  const [choice, setChoice] = useState("");
  return <>
    <Sample title="Select"><label className="gallery-field-label" htmlFor="gallery-select">분류</label><Select id="gallery-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="">선택해 보세요</option><option value="frontend">Frontend</option><option value="performance">Performance</option></Select><p className="gallery-field-help">{choice ? `선택한 분류: ${choice}` : "옵션을 선택할 수 있습니다."}</p></Sample>
    <Sample title="Text field" note="Default · Error"><div className="gallery-two-col"><TextField id="gallery-name" label="이름" placeholder="이름을 입력하세요" helper="표시할 이름을 입력해 주세요." /><TextField id="gallery-error" label="이메일" placeholder="name@example.com" error="이메일 형식을 확인해 주세요." /></div></Sample>
  </>;
}

export function SearchPreview() {
  const [query, setQuery] = useState("");
  return <div className="gallery-search-preview">
    <div><label className="gallery-field-label" htmlFor="gallery-search">Outline / 목록 검색</label><SearchField id="gallery-search" aria-label="목록 검색" placeholder="기술 키워드를 입력해 보세요" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
    <div><label className="gallery-field-label" htmlFor="gallery-search-underline">Underline / 독립 검색</label><SearchField id="gallery-search-underline" variant="underline" aria-label="독립 검색" placeholder="검색어를 입력하세요" /></div>
    <div><label className="gallery-field-label" htmlFor="gallery-search-disabled">Disabled</label><SearchField id="gallery-search-disabled" aria-label="비활성 검색" placeholder="검색할 수 없음" disabled /></div>
  </div>;
}

export function DropdownPreview() {
  const [basic, setBasic] = useState("all");
  const [line, setLine] = useState("react");
  const [text, setText] = useState("recent");
  return <div className="gallery-two-col">
    <div className="gallery-preview-variant"><strong>Basic · 모바일 바텀시트</strong><Dropdown label="주제" value={basic} onValueChange={setBasic} options={[{ value: "all", label: "모든 주제" }, { value: "architecture", label: "아키텍처" }, { value: "performance", label: "성능 개선" }]} /></div>
    <div className="gallery-preview-variant"><strong>Line Info</strong><Dropdown label="기술" variant="line-info" value={line} onValueChange={setLine} options={[{ value: "react", label: "React", description: "컴포넌트와 상태 관리" }, { value: "next", label: "Next.js", description: "렌더링과 라우팅" }]} /></div>
    <div className="gallery-preview-variant"><strong>Text</strong><Dropdown label="정렬" variant="text" value={text} onValueChange={setText} options={[{ value: "recent", label: "최신순" }, { value: "old", label: "오래된순" }]} /></div>
    <div className="gallery-preview-variant"><strong>Disabled</strong><Dropdown label="비활성" value="none" onValueChange={() => {}} disabled options={[{ value: "none", label: "선택할 수 없음" }]} /></div>
  </div>;
}

export function SliderPreview() {
  const [basic, setBasic] = useState(35);
  const [popover, setPopover] = useState(68);
  const [range, setRange] = useState<[number, number]>([25, 75]);
  return <div className="gallery-slider-preview"><Slider label="Basic" value={basic} onValueChange={setBasic} /><Slider label="Popover" variant="popover" value={popover} onValueChange={setPopover} /><RangeSlider label="Range" value={range} onValueChange={setRange} /><Slider label="Disabled" value={40} onValueChange={() => {}} disabled /></div>;
}

export function SwitchPreview() {
  const [enabled, setEnabled] = useState(true);
  return <div className="gallery-switch-preview"><Switch label="알림 받기" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /><Switch label="비활성 상태" disabled defaultChecked /></div>;
}

export function CheckboxPreview() {
  const [selected, setSelected] = useState(["architecture"]);
  const entries = [{ value: "architecture", label: "아키텍처" }, { value: "performance", label: "성능 개선" }, { value: "reliability", label: "안정성" }];
  const allChecked = selected.length === entries.length;
  return <div className="gallery-checkbox-preview">
    <div className="gallery-checkbox-group"><strong>Circle / 전체 선택</strong><Checkbox variant="circle" label="모든 주제" checked={allChecked} indeterminate={selected.length > 0 && !allChecked} onChange={(event) => setSelected(event.target.checked ? entries.map(({ value }) => value) : [])} /></div>
    <div className="gallery-checkbox-group"><strong>Square / 필터</strong>{entries.map(({ value, label }) => <Checkbox key={value} variant="square" label={label} checked={selected.includes(value)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, value] : current.filter((item) => item !== value))} />)}</div>
    <div className="gallery-checkbox-group"><strong>Icon / 약관</strong><Checkbox variant="icon" label="안내를 확인했습니다" defaultChecked /><Checkbox variant="icon" label="선택할 수 없음" disabled /></div>
  </div>;
}

export function RadioPreview() {
  const [value, setValue] = useState("recent");
  return <RadioGroup label="글 정렬 방식" name="gallery-sort" value={value} onValueChange={setValue} options={[{ value: "recent", label: "최신순" }, { value: "popular", label: "인기순" }, { value: "old", label: "오래된순" }, { value: "disabled", label: "선택할 수 없음", disabled: true }]} />;
}

export function SelectButtonPreview() {
  const [single, setSingle] = useState<string | string[]>("architecture");
  const [multiple, setMultiple] = useState<string | string[]>(["react"]);
  return <div className="gallery-select-button-preview">
    <SelectButtonGroup label="Horizontal / 단일 선택" options={[{ value: "architecture", title: "구조 설계", description: "공통 UI와 데이터 흐름" }, { value: "performance", title: "성능 개선", description: "요청과 렌더링 최적화" }, { value: "disabled", title: "준비 중", disabled: true }]} value={single} onValueChange={setSingle} />
    <SelectButtonGroup label="Vertical / 중복 선택" direction="vertical" multiple options={[{ value: "react", title: "React", description: "컴포넌트 기반 UI" }, { value: "next", title: "Next.js", description: "SSR과 라우팅" }, { value: "typescript", title: "TypeScript", description: "타입 안정성" }]} value={multiple} onValueChange={setMultiple} />
  </div>;
}

export function EmptyStateAction() {
  return <ButtonLink variant="secondary" href="/posts">블로그에서 검색하기</ButtonLink>;
}

export function PaginationPreview() {
  const [page, setPage] = useState(1);
  return <Sample title="Pagination" note={`Page ${page} / 3`}><Pagination label="미리보기 페이지" page={page} totalPages={3} hrefForPage={(number) => `?page=${number}#states`} onPageChange={setPage} /><div className="gallery-pagination-actions"><Button size={40} variant="text" onClick={() => setPage((current) => current === 3 ? 1 : current + 1)}>다음 페이지 미리보기 <ArrowRight size={16} aria-hidden="true" /></Button></div></Sample>;
}
