import { chatAnswers, type ChatIntent } from "@/lib/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";
import { detectIntent } from "./hero-utils";

export type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actionLabel?: string;
  actionHref?: string;
  external?: boolean;
  download?: string;
};

export function useHeroChat() {
  const reducedMotion = useReducedMotion();
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
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [messages.length, typingText, loading, reducedMotion]);

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

    function finishAnswer() {
      setMessages((current) => [
        ...current,
        {
          id: messageId.current++,
          role: "assistant",
          ...answer,
        },
      ]);
      setTypingText("");
      setLoading(false);
      typingRafRef.current = null;
      typingDelayRef.current = null;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      finishAnswer();
      return;
    }

    typingDelayRef.current = window.setTimeout(() => {
      const startedAt = performance.now();
      const charsPerSecond = 72;

      function typeFrame(now: number) {
        if (motionPreference.matches) {
          finishAnswer();
          return;
        }
        const elapsed = now - startedAt;
        const nextIndex = Math.min(
          answer.text.length,
          Math.floor((elapsed / 1000) * charsPerSecond)
        );

        setTypingText(answer.text.slice(0, nextIndex));

        if (nextIndex >= answer.text.length) {
          finishAnswer();
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
