import type { ChatIntent } from "@/lib/portfolio";
import { AnimatePresence } from "framer-motion";
import type { FormEvent, RefObject } from "react";
import { CHAT_MAX_WIDTH, CONTENT_MAX_WIDTH } from "./hero-utils";
import { MessageBubble, TypingBubble } from "./MessageBubble";
import { ChatInput, FooterNote, QuestionButtons } from "./QuestionButtons";
import type { Message } from "./useHeroChat";

type ChatPanelProps = {
  chatRef: RefObject<HTMLDivElement | null>;
  input: string;
  loading: boolean;
  messages: Message[];
  onAsk: (question: string, intent?: ChatIntent) => void;
  onInputChange: (value: string) => void;
  typingText: string;
  variant: "initial" | "active";
};

export function ChatPanel({
  chatRef,
  input,
  loading,
  messages,
  onAsk,
  onInputChange,
  typingText,
  variant,
}: ChatPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAsk(input);
  }

  if (variant === "initial") {
    return (
      <div className={`mt-12 w-full ${CHAT_MAX_WIDTH}`}>
        <QuestionButtons onAsk={onAsk} disabled={loading} />
        <ChatInput
          input={input}
          loading={loading}
          onChange={onInputChange}
          onSubmit={handleSubmit}
        />
        <FooterNote />
      </div>
    );
  }

  return (
    <>
      <div
        ref={chatRef}
        className={`mb-4 max-h-[52vh] w-full ${CONTENT_MAX_WIDTH} space-y-5 overflow-y-auto px-1 py-2`}
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {loading && <TypingBubble text={typingText} />}
      </div>

      <div className={`w-full ${CHAT_MAX_WIDTH}`}>
        <QuestionButtons onAsk={onAsk} disabled={loading} />
        <ChatInput
          input={input}
          loading={loading}
          onChange={onInputChange}
          onSubmit={handleSubmit}
        />
        <FooterNote />
      </div>
    </>
  );
}
