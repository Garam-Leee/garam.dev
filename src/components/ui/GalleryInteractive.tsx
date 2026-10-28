"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button, Chip, IconButton, Pagination, SearchField, Select, TextField } from "./Primitives";
import { GallerySample as Sample } from "./GallerySample";

export function ButtonPreview() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((value) => !value);
  return <div className="gallery-row"><Button onClick={toggle}>{clicked ? "선택 완료" : "Primary"}</Button><Button variant="secondary" onClick={toggle}>Secondary</Button><Button variant="text" onClick={toggle}>Text <ArrowRight size={16} aria-hidden="true" /></Button><Button disabled>Disabled</Button></div>;
}

export function ChipPreview() {
  const [selected, setSelected] = useState("전체");
  return <div className="gallery-row">{["전체", "React", "Next.js"].map((value) => <Chip key={value} selected={selected === value} onClick={() => setSelected(value)}>{value}</Chip>)}</div>;
}

export function IconPreview() {
  const [active, setActive] = useState(false);
  return <IconButton aria-label={active ? "미리보기 선택됨" : "미리보기 선택"} aria-pressed={active} onClick={() => setActive((value) => !value)}><Plus aria-hidden="true" /></IconButton>;
}

export function FormPreview() {
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState("");
  return <>
    <div className="gallery-two-col">
      <Sample title="Search field"><label className="gallery-field-label" htmlFor="gallery-search">검색어</label><SearchField id="gallery-search" placeholder="기술 키워드를 입력해 보세요" value={query} onChange={(event) => setQuery(event.target.value)} /><p className="gallery-field-help">{query ? `입력한 값: ${query}` : "입력하면 이곳에 값이 표시됩니다."}</p></Sample>
      <Sample title="Select"><label className="gallery-field-label" htmlFor="gallery-select">분류</label><Select id="gallery-select" value={choice} onChange={(event) => setChoice(event.target.value)}><option value="">선택해 보세요</option><option value="frontend">Frontend</option><option value="performance">Performance</option></Select><p className="gallery-field-help">{choice ? `선택한 분류: ${choice}` : "옵션을 선택할 수 있습니다."}</p></Sample>
    </div>
    <Sample title="Text field" note="Default · Error"><div className="gallery-two-col"><TextField id="gallery-name" label="이름" placeholder="이름을 입력하세요" helper="표시할 이름을 입력해 주세요." /><TextField id="gallery-error" label="이메일" placeholder="name@example.com" error="이메일 형식을 확인해 주세요." /></div></Sample>
  </>;
}

export function EmptyStateAction() {
  return <Button variant="secondary" onClick={() => document.getElementById("gallery-search")?.focus()}>검색어 입력하기</Button>;
}

export function PaginationPreview() {
  const [page, setPage] = useState(1);
  return <Sample title="Pagination" note={`Page ${page} / 3`}><Pagination label="미리보기 페이지" page={page} totalPages={3} hrefForPage={(number) => `?page=${number}#states`} onPageChange={setPage} /><div className="gallery-pagination-actions"><Button size={40} variant="text" onClick={() => setPage((current) => current === 3 ? 1 : current + 1)}>다음 페이지 미리보기 <ArrowRight size={16} aria-hidden="true" /></Button></div></Sample>;
}
