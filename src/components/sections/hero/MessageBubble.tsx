import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "./HeroTitle";
import {
  assistantBubbleClass,
  ease,
  userBubbleClass,
} from "./hero-utils";
import type { Message } from "./useHeroChat";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease }}
      className={
        isUser ? "flex justify-end" : "flex items-start gap-3.5 sm:gap-4"
      }
    >
      {!isUser && <Avatar />}

      <div className={isUser ? userBubbleClass : assistantBubbleClass}>
        <p className="whitespace-pre-line break-keep">{message.text}</p>

        {message.actionHref && message.actionLabel && (
          <a
            href={message.actionHref}
            target={message.external ? "_blank" : undefined}
            rel={message.external ? "noopener noreferrer" : undefined}
            download={message.download}
            className={
              isUser
                ? "mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/74 px-3.5 py-1.5 text-xs font-semibold text-[#2272eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl transition hover:bg-white/88"
                : "mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#191f28]/86 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(25,31,40,0.16)] backdrop-blur-xl transition hover:bg-[#333d4b]/90"
            }
          >
            <span>{message.actionLabel}</span>
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function TypingBubble({ text }: { text: string }) {
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
