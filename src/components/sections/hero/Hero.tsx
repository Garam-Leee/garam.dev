"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import "@/styles/hero.css";

type Answer = { text: string; href?: string; link?: string };
type Message = { id: number; role: "visitor" | "garam"; text: string; href?: string; link?: string };

const questions = [
  { label: "어떤 일을 했나요?", answer: { text: "Next.js·TypeScript 기반 화면에서 SSR 데이터 페칭과 SWR 캐싱·재검증 구조를 설계했습니다. Atomic Design 기반 공통 UI·훅·유틸 패키지를 모노레포로 구성하고, Storybook과 ESLint로 구현 기준을 정리했습니다. 사용자 화면에서는 이미지 로딩·스크롤·읽기 상태를 관리했고, 운영 화면에서는 역할별 접근 제어와 React Hook Form 입력 검증을 구현했습니다.", href: "/experience", link: "경력 자세히 보기" } },
  { label: "문제를 어떻게 해결하나요?", answer: { text: "먼저 사용자 행동과 오류 기록을 확인해 증상을 재현하고, 요청 흐름과 화면 상태를 나눠 원인을 좁힙니다. 수정 범위가 API와 맞닿아 있으면 백엔드와 호출 구조를 조정하고, 배포 후에는 Datadog RUM으로 같은 오류가 다시 나타나는지 확인합니다.", href: "/#about", link: "기술을 쓰는 기준 보기" } },
  { label: "성능은 어떻게 개선했나요?", answer: { text: "먼저 네트워크 요청과 렌더링 경로를 확인했습니다. API를 도메인별로 분리하고 SWR 캐시 키·재검증과 호출 의존성을 정리해 중복 요청을 줄였습니다. 운영 화면의 개별 조회는 ID 기반 배치 요청과 응답 매핑으로 묶고, 연속 페이지네이션 호출도 제한했습니다. 이미지에는 WebP 변환·리사이징·프리로딩·지연 로딩을 적용하고, 무거운 화면은 코드 스플리팅과 동적 import로 분리했습니다. 주요 화면의 초기 로딩 시간은 약 2초 줄었습니다.", href: "/projects/shortz", link: "성능 개선 사례 보기" } },
  { label: "어떤 기술을 쓰나요?", answer: { text: "React·Next.js·TypeScript가 주력입니다. 웹툰 플랫폼에서는 SSR과 SWR 캐싱·재검증으로 데이터 흐름을 설계하고, 모노레포 공통 패키지와 Storybook으로 UI 개발 기준을 만들었습니다. 실시간 상담에는 Agora SDK, 관리자 입력 검증에는 React Hook Form, 도면 편집에는 Canvas를 사용했습니다. SQL·GA4·Datadog RUM으로 운영 지표와 사용자 오류도 분석했습니다.", href: "/#about", link: "기술을 쓰는 기준 보기" } },
  { label: "함께 이야기하고 싶어요", answer: { text: "좋아요. 아래 이메일로 연락해 주세요. 직접 답장드리겠습니다.", href: `mailto:${profile.email}`, link: "이메일 보내기" } },
] satisfies { label: string; answer: Answer }[];

function findAnswer(question: string): Answer {
  const normalized = question.replace(/\s/g, "").toLowerCase();
  if (/성능|속도|로딩|swr|api|캐시|최적화/.test(normalized)) return questions[2].answer;
  if (/기술|스택|react|next|typescript|툴/.test(normalized)) return questions[3].answer;
  if (/연락|이메일|채용|대화|문의|함께/.test(normalized)) return questions[4].answer;
  if (/문제|해결|협업|일하는방식/.test(normalized)) return questions[1].answer;
  if (/경력|회사|프로젝트|작업|경험|소개|무슨일/.test(normalized)) return questions[0].answer;
  return { text: "이 질문에 대한 답은 아직 준비되지 않았어요. 경력과 기술 사례를 둘러보시거나 이메일로 직접 물어봐 주세요.", href: "/experience", link: "경력기술서 보기" };
}

export default function Hero() {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingId, setTypingId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextMessageId = useRef(0);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.isComposing) return;
      event.preventDefault();
      inputRef.current?.blur();
      setExpanded(false);
      setDraft("");
      setMessages([]);
      setTypingId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  useEffect(() => {
    if (typingId === null) return;
    const answer = messages.find((message) => message.id === typingId);
    if (!answer) return;
    const length = Array.from(answer.text).length;
    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= length) {
          window.clearInterval(timer);
          return length;
        }
        return Math.min(current + 3, length);
      });
    }, 24);
    return () => window.clearInterval(timer);
  }, [typingId, messages]);

  useEffect(() => {
    if (expanded && conversationRef.current) conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [expanded, messages]);

  useEffect(() => {
    if (typingId === null || !conversationRef.current) return;
    const conversation = conversationRef.current;
    conversation.scrollTop = conversation.scrollHeight;
  }, [typingId, visibleCount]);

  function ask(question: string, answer = findAnswer(question)) {
    const visitorId = ++nextMessageId.current;
    const answerId = ++nextMessageId.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setExpanded(true);
    setDraft("");
    setVisibleCount(0);
    setTypingId(reduceMotion ? null : answerId);
    setMessages((current) => [...current, { id: visitorId, role: "visitor", text: question }, { id: answerId, role: "garam", ...answer }]);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (question) ask(question);
  }

  return (
    <section id="hero" className={`hero-section hero-introduction${expanded ? " is-expanded" : ""}`}>
      <div className="hero-introduction-inner">
        {!expanded ? (
          <div className="hero-introduction-heading">
            <span className="hero-profile" aria-hidden="true"><Image src="/garam-chat-avatar.webp" alt="" width={72} height={72} priority /><span className="hero-profile-status" /></span>
            <div className="hero-heading-copy">
              <h1 lang="en"><span className="hero-headline-line">I&apos;m <span className="hero-name">Garam Lee</span> — based in Seoul.</span><span className="hero-headline-line">I make complex services feel <em>clear and reliable.</em></span></h1>
              <p>웹툰·헬스케어·운영 도구에서 구조를 설계하고 성능과 안정성을 개선해왔습니다.</p>
            </div>
          </div>
        ) : (
          <div className="hero-conversation" ref={conversationRef} data-lenis-prevent aria-live="polite" aria-label="이가람에 대한 질문과 답변">
            <div className="hero-message hero-message-garam"><span className="hero-avatar" aria-hidden="true"><Image src="/garam-chat-avatar.webp" alt="" width={36} height={36} /></span><div className="hero-bubble">안녕하세요, 프론트엔드 개발자 이가람입니다. 제 경력과 작업에 관해 궁금한 점을 물어보세요.</div></div>
            {messages.map((message) => (
              <div className={`hero-message hero-message-${message.role}`} key={message.id}>
                {message.role === "garam" && <span className="hero-avatar" aria-hidden="true"><Image src="/garam-chat-avatar.webp" alt="" width={36} height={36} /></span>}
                <div className="hero-bubble">
                  {message.id === typingId ? <><span aria-hidden="true">{Array.from(message.text).slice(0, visibleCount).join("")}</span><span className="sr-only">{message.text}</span>{visibleCount < Array.from(message.text).length && <span className="hero-typing-cursor" aria-hidden="true" />}</> : message.text}
                  {message.href && (message.id !== typingId || visibleCount >= Array.from(message.text).length) && <Link href={message.href} className="hero-answer-link">{message.link} <ArrowUpRight size={15} aria-hidden="true" /></Link>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="hero-interactions">
          <div className="hero-question-list">
            <div className="hero-question-row" role="group" aria-label="추천 질문">
              {questions.map(({ label, answer }) => <button className="hero-question" type="button" key={label} onClick={() => ask(label, answer)}>{label}</button>)}
            </div>
            <div className="hero-question-row hero-question-row--links" role="group" aria-label="바로가기">
              <Link href="#projects" className="hero-question">작업 보기 <ArrowDown size={15} aria-hidden="true" /></Link>
              <Link href={profile.resumeUrl} className="hero-question" download>이력서 <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <form className="hero-chat-input" onSubmit={submit}>
            <span aria-hidden="true">›_</span>
            <label className="sr-only" htmlFor="hero-question-input">이가람에게 질문하기</label>
            <input id="hero-question-input" ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onFocus={() => setExpanded(true)} placeholder="이가람에게 궁금한 점을 물어보세요" maxLength={200} />
            <button type="submit" aria-label="질문 보내기" disabled={!draft.trim()}><ArrowRight size={20} aria-hidden="true" /></button>
          </form>
          <p className="hero-chat-note">경력기술서와 기술 사례를 바탕으로 준비한 답변입니다. 직접 대화하려면 <a href={`mailto:${profile.email}`}>이메일을 보내주세요.</a></p>
        </div>
      </div>
    </section>
  );
}
