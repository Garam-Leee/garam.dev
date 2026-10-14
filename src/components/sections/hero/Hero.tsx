"use client";

import { ChatPanel } from "./ChatPanel";
import { HeroTitle } from "./HeroTitle";
import { CONTENT_MAX_WIDTH } from "./hero-utils";
import { useHeroChat } from "./useHeroChat";
import { chatAnnouncement } from "@/lib/chat-announcement";

export default function Hero() {
  const {
    answerQuestion,
    chatRef,
    hasStarted,
    input,
    loading,
    messages,
    setInput,
    typingText,
  } = useHeroChat();

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden bg-transparent px-4 pt-28 font-['Toss_Product_Sans','Tossface','SF_Pro_KR','SF_Pro_Display',-apple-system,BlinkMacSystemFont,'Basier_Square','Apple_SD_Gothic_Neo',Roboto,'Noto_Sans_KR',sans-serif] sm:px-6 sm:pt-36 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.24),rgba(248,252,255,0.18)_46%,rgba(255,255,255,0.26))]" />
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {chatAnnouncement(messages, loading)}
      </div>

      <div
        className={`mx-auto flex min-h-[calc(100vh-7rem)] w-full ${CONTENT_MAX_WIDTH} flex-col`}
      >
        <div
          className={`flex flex-1 flex-col items-center justify-center ${hasStarted ? "pb-14" : "pb-16"}`}
        >
          <div className={hasStarted ? "sr-only" : "w-full"}>
            <HeroTitle />
          </div>
          <ChatPanel
            chatRef={chatRef}
            input={input}
            loading={loading}
            messages={messages}
            onAsk={answerQuestion}
            onInputChange={setInput}
            typingText={typingText}
            variant={hasStarted ? "active" : "initial"}
          />
        </div>
      </div>
    </section>
  );
}
