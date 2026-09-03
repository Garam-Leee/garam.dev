"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111827] text-white">
      {/* CTA 영역 */}
      <div className="container py-20 md:py-28">
        <motion.p
          className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#6b7280] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.p>

        <div className="overflow-hidden mb-8">
          <motion.h2
            className="font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease }}
          >
            같이 만들어요.
          </motion.h2>
        </div>

        <motion.p
          className="text-[#9ca3af] text-lg mb-10 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          데이터로 움직이는 프로덕트를 함께 만들 팀을 찾고 있습니다.
          언제든 편하게 연락주세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="mailto:contact@garam.dev"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold rounded-xl transition-colors text-[15px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            contact@garam.dev
          </a>
          <a
            href="https://github.com/garamdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-[15px]"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/garamdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors text-[15px]"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {/* 하단 바 */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#4f46e5] flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">G</span>
            </div>
            <span className="text-[#6b7280] text-sm">© 2026 이가람</span>
          </div>
          <span className="text-[#374151] text-xs font-mono">
            Built with Next.js · Framer Motion · Tailwind CSS v4
          </span>
        </div>
      </div>
    </footer>
  );
}
