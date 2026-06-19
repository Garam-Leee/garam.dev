import { profile, quickQuestions, type ChatIntent } from "@/lib/portfolio";
import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import type { FormEvent } from "react";
import { chatInputShellClass, questionButtonClass } from "./hero-utils";

type AskHandler = (question: string, intent?: ChatIntent) => void;

export function QuestionButtons({
  onAsk,
  disabled,
}: {
  onAsk: AskHandler;
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
  onAsk: AskHandler;
  disabled: boolean;
}) {
  const isWork = question.intent === "work";
  const isExternal =
    question.intent === "chat" ||
    question.intent === "resume" ||
    question.intent === "linkedin";

  return (
    <div className="shrink-0 snap-start">
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

export function ChatInput({
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
          <Send
            size={16}
            strokeWidth={2.4}
            className="sm:h-[17px] sm:w-[17px]"
          />
        </button>
      </div>
    </form>
  );
}

export function FooterNote() {
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
