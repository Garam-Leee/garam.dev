"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/portfolio";

const ease = [0.16, 1, 0.3, 1] as const;

function trackContact(label: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("portfolio:event", { detail: { name: "contact_click", label } }));
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] px-5 py-16 text-white sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="grid gap-10 lg:grid-cols-[1fr_0.8fr]"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8b95a1]">Contact</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,6.6rem)] font-black leading-[0.98] tracking-normal">
              Want the human version?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b0b8c1]">
              The bot is useful for fast answers, but Leah reads every message. Send a role, collaboration idea, or product problem worth untangling.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-[#111111]">
                {profile.initials}
              </div>
              <div>
                <p className="font-black">{profile.name}</p>
                <p className="text-sm text-[#b0b8c1]">Open to product design conversations</p>
              </div>
            </div>

            <div className="grid gap-3">
              <a
                href={profile.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("booking")}
                className="rounded-lg bg-white px-5 py-4 text-sm font-black text-[#111111] transition hover:bg-[#e8f3ff] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/30"
              >
                Book a chat
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => trackContact("email")}
                className="rounded-lg border border-white/12 px-5 py-4 text-sm font-black text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#3182f6]/30"
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("linkedin")}
                className="rounded-lg border border-white/12 px-5 py-4 text-sm font-black text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#3182f6]/30"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#6b7684] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {profile.name}. Conversational product design portfolio.</span>
          <span>Built with Next.js, Framer Motion, and FAQ-based chat.</span>
        </div>
      </div>
    </footer>
  );
}
