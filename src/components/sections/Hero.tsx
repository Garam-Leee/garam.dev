"use client";

import {
  chatAnswers,
  ChatIntent,
  profile,
  quickQuestions,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { glassStyles } from "@/components/ui/Glass";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actionLabel?: string;
  actionHref?: string;
  external?: boolean;
};

const ease = [0.4, 0, 0.2, 1] as const;
const CONTENT_MAX_WIDTH = "max-w-[1080px]";
const CHAT_MAX_WIDTH = "max-w-3xl";
const assistantBubbleClass = cn(
  glassStyles.panel,
  "max-w-[82%] rounded-[16px] px-5 py-4 text-left text-[15px] font-normal leading-7 text-[#333d4b] sm:max-w-[720px] sm:px-6"
);
const userBubbleClass =
  "max-w-[82%] rounded-[16px] border border-white/16 bg-[#191f28]/88 px-5 py-3 text-[15px] font-normal leading-7 text-white shadow-[0px_8px_24px_rgba(25,31,40,0.18)] backdrop-blur-xl sm:max-w-[70%]";
const questionButtonClass = cn(
  glassStyles.chip,
  "group gap-1.5 whitespace-nowrap px-3.5 py-2 text-[13px] font-semibold text-[#4e5968] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#3182f6]/28 hover:bg-white/62 hover:text-[#2272eb] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_12px_26px_rgba(25,31,40,0.08)] focus:outline-none focus:ring-2 focus:ring-[#3182f6] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
);
const chatInputShellClass = cn(
  glassStyles.panel,
  "flex min-w-0 items-center gap-1.5 rounded-[14px] px-3 py-2.5 transition duration-150 focus-within:border-[#3182f6]/34 focus-within:bg-white/62 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_16px_38px_rgba(25,31,40,0.09)] sm:gap-2 sm:rounded-[16px] sm:px-4 sm:py-3"
);

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
  const typingRafRef = useRef<number | null>(null);
  const typingDelayRef = useRef<number | null>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, typingText, loading]);

  useEffect(() => {
    return () => {
      if (typingRafRef.current) {
        window.cancelAnimationFrame(typingRafRef.current);
      }

      if (typingDelayRef.current) {
        window.clearTimeout(typingDelayRef.current);
      }
    };
  }, []);

  function stopTypingAnimation() {
    if (typingRafRef.current) {
      window.cancelAnimationFrame(typingRafRef.current);
      typingRafRef.current = null;
    }

    if (typingDelayRef.current) {
      window.clearTimeout(typingDelayRef.current);
      typingDelayRef.current = null;
    }
  }

  function answerQuestion(question: string, intent = detectIntent(question)) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    stopTypingAnimation();

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

    typingDelayRef.current = window.setTimeout(() => {
      const startedAt = performance.now();
      const charsPerSecond = 72;

      function typeFrame(now: number) {
        const elapsed = now - startedAt;
        const nextIndex = Math.min(
          answer.text.length,
          Math.floor((elapsed / 1000) * charsPerSecond)
        );

        setTypingText(answer.text.slice(0, nextIndex));

        if (nextIndex >= answer.text.length) {
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
          typingRafRef.current = null;
          typingDelayRef.current = null;
          return;
        }

        typingRafRef.current = window.requestAnimationFrame(typeFrame);
      }

      typingRafRef.current = window.requestAnimationFrame(typeFrame);
    }, 250);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    answerQuestion(input);
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-transparent px-4 pt-28 font-['Toss_Product_Sans','Tossface','SF_Pro_KR','SF_Pro_Display',-apple-system,BlinkMacSystemFont,'Basier_Square','Apple_SD_Gothic_Neo',Roboto,'Noto_Sans_KR',sans-serif] sm:px-6 sm:pt-36 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.24),rgba(248,252,255,0.18)_46%,rgba(255,255,255,0.26))]" />

      <div
        className={`mx-auto flex min-h-[calc(100vh-7rem)] w-full ${CONTENT_MAX_WIDTH} flex-col`}
      >
        {!hasStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
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
            transition={{ duration: 0.25, ease }}
            className="flex flex-1 flex-col items-center justify-center pb-14"
          >
            <div
              ref={chatRef}
              className={`mb-4 max-h-[52vh] w-full ${CONTENT_MAX_WIDTH} space-y-6 overflow-y-auto px-1 py-2 [scrollbar-width:thin] [scrollbar-color:#e5e8eb_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e5e8eb] hover:[&::-webkit-scrollbar-thumb]:bg-[#b0b8c1]`}
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
        <div className="hidden sm:block">
          <Avatar size="lg" />
        </div>

        <h1 className="min-w-0 max-w-full text-left text-[clamp(2rem,8.5vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#191f28] break-words">
          <span>I&apos;m </span>
          <span className="relative inline-block px-1.5">
            <span className="absolute inset-0 border-l-2 border-r-2 border-[#3182f6]/45 bg-[#3182f6]/10" />
            <span className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3182f6]" />
            <span className="absolute bottom-0 right-0 h-[5px] w-[5px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#3182f6]" />
            <span className="relative">{profile.name}</span>
          </span>
          <span> — based in Seoul.</span>
          <br />
          <span>I build product experiences,&nbsp;</span>
          <span className="inline whitespace-normal font-serif italic tracking-[-0.03em]">
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
        className={`grid ${sizeClass} place-items-center overflow-hidden rounded-full bg-[#191f28] text-[11px] font-bold text-white shadow-[0px_1px_3px_rgba(0,0,0,0.06)] ring-2 ring-white`}
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
      transition={{ duration: 0.25, ease }}
      className={isUser ? "flex justify-end" : "flex items-start gap-3.5 sm:gap-4"}
    >
      {!isUser && <Avatar />}

      <div
        className={
          isUser
            ? userBubbleClass
            : assistantBubbleClass
        }
      >
        <p className="whitespace-pre-line break-keep">{message.text}</p>

        {message.actionHref && message.actionLabel && (
          <button
            type="button"
            onClick={() => openTarget(message.actionHref ?? "#", message.external)}
            className={
              isUser
                ? "mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/74 px-3.5 py-1.5 text-xs font-semibold text-[#2272eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl transition hover:bg-white/88"
                : "mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#191f28]/86 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(25,31,40,0.16)] backdrop-blur-xl transition hover:bg-[#333d4b]/90"
            }
          >
            <span>{message.actionLabel}</span>
            <ArrowUpRight size={14} strokeWidth={2.2} />
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
      transition={{ duration: 0.25, ease }}
      className="flex items-start gap-3.5 sm:gap-4"
    >
      <Avatar />

      <div className={assistantBubbleClass}>
        {text ? (
          <p className="whitespace-pre-line break-keep">
            {text}
            <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#3182f6]" />
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
      <div className="flex flex-wrap justify-start gap-2 sm:hidden">
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
        className={questionButtonClass}
      >
        <span>{question.label}</span>

        {isWork && (
          <ArrowDown
            size={15}
            strokeWidth={2.2}
            className="text-[#8b95a1] transition-colors group-hover:text-[#2272eb]"
          />
        )}

        {isExternal && (
          <ArrowUpRight
            size={15}
            strokeWidth={2.2}
            className="text-[#8b95a1] transition-colors group-hover:text-[#2272eb]"
          />
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
    <form onSubmit={onSubmit} className="w-full min-w-0">
      <div className={chatInputShellClass}>
        <span className="shrink-0 select-none font-mono text-[12px] text-[#8b95a1] sm:text-[13px]">
          ›_
        </span>

        <input
          value={input}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ask Garam anything..."
          aria-label="Ask Garam a question"
          disabled={loading}
          className="min-w-0 flex-1 truncate bg-transparent text-[14px] font-normal leading-[20px] text-[#333d4b] outline-none placeholder:text-[#b0b8c1] disabled:cursor-not-allowed sm:text-[15px] sm:leading-[22px]"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#3182f6] text-white transition duration-150 hover:bg-[#2272eb] disabled:cursor-not-allowed disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] sm:h-8 sm:w-8"
        >
          <Send size={16} strokeWidth={2.4} className="sm:h-[17px] sm:w-[17px]" />
        </button>
      </div>
    </form>
  );
}

function FooterNote() {
  return (
    <p className="mx-auto mt-3 w-full max-w-3xl text-center text-[11px] font-normal leading-5 text-[#6b7684]">
      미리 준비된 답변을 기반으로 응답합니다. 자세한 이야기는{" "}
      <a
        href={`mailto:${profile.email}`}
        className="font-semibold text-[#2272eb] underline-offset-2 transition hover:underline"
      >
        {profile.email}
      </a>
      로 연락 주세요.
    </p>
  );
}
