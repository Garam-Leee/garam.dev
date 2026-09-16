"use client";

import { motion } from "framer-motion";
import { ChatPanel } from "./ChatPanel";
import { HeroTitle } from "./HeroTitle";
import { CONTENT_MAX_WIDTH, ease } from "./hero-utils";
import { useHeroChat } from "./useHeroChat";

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

            <ChatPanel
              chatRef={chatRef}
              input={input}
              loading={loading}
              messages={messages}
              onAsk={answerQuestion}
              onInputChange={setInput}
              typingText={typingText}
              variant="initial"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease }}
            className="flex flex-1 flex-col items-center justify-center pb-14"
          >
            <ChatPanel
              chatRef={chatRef}
              input={input}
              loading={loading}
              messages={messages}
              onAsk={answerQuestion}
              onInputChange={setInput}
              typingText={typingText}
              variant="active"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
