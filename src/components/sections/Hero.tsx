"use client";

import {
  chatAnswers,
  ChatIntent,
  profile,
  quickQuestions,
} from "@/lib/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actionLabel?: string;
  actionHref?: string;
  external?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;
const CONTENT_MAX_WIDTH = "max-w-[1024px]";
const CHAT_MAX_WIDTH = "max-w-3xl";

function detectIntent(question: string): ChatIntent {
  const value = question.toLowerCase();

  if (
    value.includes("프로젝트") ||
    value.includes("서비스") ||
    value.includes("work") ||
    value.includes("project")
  ) {
    return "work";
  }

  if (
    value.includes("개선") ||
    value.includes("성과") ||
    value.includes("growth") ||
    value.includes("impact")
  ) {
    return "growth";
  }

  if (
    value.includes("기술") ||
    value.includes("스택") ||
    value.includes("react") ||
    value.includes("next")
  ) {
    return "tools";
  }

  if (
    value.includes("개발자") ||
    value.includes("소개") ||
    value.includes("about")
  ) {
    return "developer";
  }

  if (
    value.includes("연락") ||
    value.includes("메일") ||
    value.includes("chat") ||
    value.includes("contact")
  ) {
    return "chat";
  }

  if (
    value.includes("resume") ||
    value.includes("이력서") ||
    value.includes("cv")
  ) {
    return "resume";
  }

  if (value.includes("linkedin")) {
    return "linkedin";
  }

  return "fallback";
}

function openTarget(href: string, external?: boolean) {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = href;
}

export default function Hero() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(1);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, typingText, loading]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  function answerQuestion(question: string, intent = detectIntent(question)) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
    }

    setHasStarted(true);
    setTypingText("");
    setInput("");
    setLoading(true);

    setMessages((current) => [
      ...current,
      {
        id: messageId.current++,
        role: "user",
        text: trimmed,
      },
    ]);

    const answer = chatAnswers[intent] ?? chatAnswers.fallback;

    window.setTimeout(() => {
      let index = 0;

      typingTimerRef.current = window.setInterval(() => {
        index += 1;
        setTypingText(answer.text.slice(0, index));

        if (index >= answer.text.length) {
          if (typingTimerRef.current) {
            window.clearInterval(typingTimerRef.current);
          }

          setMessages((current) => [
            ...current,
            {
              id: messageId.current++,
              role: "assistant",
              text: answer.text,
              actionLabel: answer.actionLabel,
              actionHref: answer.actionHref,
              external: answer.external,
            },
          ]);

          setTypingText("");
          setLoading(false);
        }
      }, 15);
    }, 240);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    answerQuestion(input);
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f3edff_0%,#dff1ff_52%,#ffffff_100%)] px-4 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_54%,rgba(180,140,255,0.22),transparent_30%),radial-gradient(circle_at_72%_24%,rgba(115,190,255,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_96%)]" />

      <div
        className={`mx-auto flex min-h-[calc(100vh-7rem)] w-full ${CONTENT_MAX_WIDTH} flex-col`}
      >
        {!hasStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="flex flex-1 flex-col items-center justify-center pb-16"
          >
            <HeroTitle />

            <div className={`mt-12 w-full ${CHAT_MAX_WIDTH}`}>
              <QuestionButtons onAsk={answerQuestion} disabled={loading} />
              <ChatInput
                input={input}
                loading={loading}
                onChange={setInput}
                onSubmit={handleSubmit}
              />
              <FooterNote />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, ease }}
            className="flex flex-1 flex-col items-center justify-center pb-14"
          >
            <div
              ref={chatRef}
              className={`mb-4 max-h-[52vh] w-full ${CONTENT_MAX_WIDTH} space-y-6 overflow-y-auto px-1 py-2 [scrollbar-width:thin] [scrollbar-color:#e5e8eb_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e5e8eb] hover:[&::-webkit-scrollbar-thumb]:bg-[#d1d6db]`}
            >
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {loading && <TypingBubble text={typingText} />}
            </div>

            <div className={`w-full ${CHAT_MAX_WIDTH}`}>
              <QuestionButtons onAsk={answerQuestion} disabled={loading} />
              <ChatInput
                input={input}
                loading={loading}
                onChange={setInput}
                onSubmit={handleSubmit}
              />
              <FooterNote />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function HeroTitle() {
  return (
    <div className={`w-full ${CONTENT_MAX_WIDTH}`}>
      <div className="flex items-start gap-3.5 sm:gap-4">
        <Avatar size="lg" />

        <h1 className="text-left text-[clamp(1.95rem,4vw,3.65rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#111111]">
          <span>I&apos;m </span>
          <span className="relative inline-block px-1.5">
            <span className="absolute inset-0 border-l-2 border-r-2 border-[#2663f2]/45 bg-[#2663f2]/10" />
            <span className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2663f2]" />
            <span className="absolute bottom-0 right-0 h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#2663f2]" />
            <span className="relative">{profile.name}</span>
          </span>
          <span> — based in Seoul.</span>
          <br />
          <span>I build product experiences,&nbsp;</span>
          <span className="inline-block whitespace-nowrap font-serif italic tracking-[-0.03em]">
            end to end.
          </span>
        </h1>
      </div>
    </div>
  );
}

function Avatar({ size = "md" }: { size?: "md" | "lg" }) {
  const sizeClass =
    size === "lg"
      ? "h-9 w-9 sm:h-10 sm:w-10"
      : "h-8 w-8 sm:h-9 sm:w-9";

  return (
    <span className="relative shrink-0">
      <span
        className={`grid ${sizeClass} place-items-center overflow-hidden rounded-full bg-[#111111] text-[11px] font-bold text-white shadow-md ring-2 ring-white`}
      >
        {profile.initials}
      </span>
      <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-[#03b26c] ring-2 ring-white" />
    </span>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.26, ease }}
      className={isUser ? "flex justify-end" : "flex items-start gap-3.5 sm:gap-4"}
    >
      {!isUser && <Avatar />}

      <div
        className={
          isUser
            ? "max-w-[70%] rounded-[16px] bg-[#111111] px-5 py-3 text-[15px] leading-7 text-white shadow-[0_10px_28px_rgba(25,31,40,0.15)]"
            : "max-w-[720px] rounded-[16px] border border-[#d5d9df] bg-white px-5 py-4 text-left text-[15px] leading-7 text-[#333d4b] shadow-[0_10px_28px_rgba(25,31,40,0.075)] sm:px-6"
        }
      >
        <p className="whitespace-pre-line break-keep">{message.text}</p>

        {message.actionHref && message.actionLabel && (
          <button
            type="button"
            onClick={() => openTarget(message.actionHref ?? "#", message.external)}
            className={
              isUser
                ? "mt-3 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#111111]"
                : "mt-3 rounded-full bg-[#111111] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#333d4b]"
            }
          >
            {message.actionLabel} ↗
          </button>
        )}
      </div>
    </motion.div>
  );
}

function TypingBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease }}
      className="flex items-start gap-3.5 sm:gap-4"
    >
      <Avatar />

      <div className="max-w-[720px] rounded-[16px] border border-[#d5d9df] bg-white px-5 py-4 text-left text-[15px] leading-7 text-[#333d4b] shadow-[0_10px_28px_rgba(25,31,40,0.075)] sm:px-6">
        {text ? (
          <p className="whitespace-pre-line break-keep">
            {text}
            <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#333d4b]" />
          </p>
        ) : (
          <div className="flex items-center gap-1.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b95a1]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b95a1] [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b95a1] [animation-delay:240ms]" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function QuestionButtons({
  onAsk,
  disabled,
}: {
  onAsk: (question: string, intent: ChatIntent) => void;
  disabled: boolean;
}) {
  const firstRow = quickQuestions.slice(0, 4);
  const secondRow = quickQuestions.slice(4);

  return (
    <div className="mb-4 w-full">
      <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 sm:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {quickQuestions.map((question) => (
          <QuestionButton
            key={question.intent}
            question={question}
            onAsk={onAsk}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="hidden space-y-2 sm:block">
        <div className="flex flex-wrap justify-end gap-2">
          {firstRow.map((question) => (
            <QuestionButton
              key={question.intent}
              question={question}
              onAsk={onAsk}
              disabled={disabled}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {secondRow.map((question) => (
            <QuestionButton
              key={question.intent}
              question={question}
              onAsk={onAsk}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionButton({
  question,
  onAsk,
  disabled,
}: {
  question: (typeof quickQuestions)[number];
  onAsk: (question: string, intent: ChatIntent) => void;
  disabled: boolean;
}) {
  const isWork = question.intent === "work";
  const isExternal =
    question.intent === "chat" ||
    question.intent === "resume" ||
    question.intent === "linkedin";

  return (
    <div className="snap-start shrink-0">
      <button
        type="button"
        onClick={() => onAsk(question.label, question.intent)}
        disabled={disabled}
        className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#111111]/20 bg-white px-3.5 py-2 text-[13px] font-medium text-[#111111] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111111] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2663f2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>{question.label}</span>

        {isWork && (
          <span className="text-[#6b7280] transition-colors group-hover:text-[#111111]">
            ↓
          </span>
        )}

        {isExternal && (
          <span className="text-[#6b7280] transition-colors group-hover:text-[#111111]">
            ↗
          </span>
        )}
      </button>
    </div>
  );
}

function ChatInput({
  input,
  loading,
  onChange,
  onSubmit,
}: {
  input: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center gap-2 rounded-2xl border border-[#d5d9df] bg-white/85 px-4 py-3 shadow-[0_10px_28px_rgba(25,31,40,0.075)] backdrop-blur-md transition focus-within:border-[#111111] focus-within:shadow-[0_14px_36px_rgba(25,31,40,0.1)]">
        <span className="select-none font-mono text-[13px] text-[#8b95a1]">
          ›_
        </span>

        <input
          value={input}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ask Garam anything..."
          aria-label="Ask Garam a question"
          disabled={loading}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#191f28] outline-none placeholder:text-[#8b95a1]/70 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111111] text-base font-bold text-white transition hover:bg-[#2663f2] disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>
    </form>
  );
}

function FooterNote() {
  return (
    <p className="mx-auto mt-3 w-full max-w-3xl text-center text-[11px] leading-5 text-[#6b7684]">
      미리 준비된 답변을 기반으로 응답합니다. 자세한 이야기는{" "}
      <a
        href={`mailto:${profile.email}`}
        className="underline-offset-2 transition hover:text-[#111111] hover:underline"
      >
        {profile.email}
      </a>
      로 연락 주세요.
    </p>
  );
}