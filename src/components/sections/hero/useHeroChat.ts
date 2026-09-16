import { chatAnswers, type ChatIntent } from "@/lib/portfolio";
import { useEffect, useRef, useState } from "react";
import { detectIntent } from "./hero-utils";

export type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actionLabel?: string;
  actionHref?: string;
  external?: boolean;
};

export function useHeroChat() {
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

  function answerQuestion(
    question: string,
    intent: ChatIntent = detectIntent(question)
  ) {
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

  return {
    answerQuestion,
    chatRef,
    hasStarted,
    input,
    loading,
    messages,
    setInput,
    typingText,
  };
}
