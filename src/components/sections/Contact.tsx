"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticBtn from "@/components/ui/MagneticBtn";

const LINKS = [
  { label: "GitHub", href: "https://github.com/garamdev", desc: "코드 기여 히스토리" },
  { label: "LinkedIn", href: "https://linkedin.com/in/garamdev", desc: "커리어 프로필" },
  { label: "Resume", href: "/resume", desc: "이력서 다운로드" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 border-t border-[#111]">
      <div className="container-main">
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-[#444] tracking-[0.2em] mb-6">04 — CONTACT</p>

          <TextReveal
            text="새로운 기회를 환영합니다"
            className="text-heading text-[#f0f0f0] mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body max-w-lg mb-12"
          >
            사용자 경험을 데이터로 증명하고, 팀과 함께 성장하는 프로덕트를 만들고 싶습니다.
            이야기 나눠요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <MagneticBtn
              href="mailto:contact@garam.dev"
              className="px-8 py-4 bg-[#e8ff47] text-[#080808] font-semibold rounded-full text-sm hover:bg-white transition-colors duration-200"
            >
              contact@garam.dev →
            </MagneticBtn>
          </motion.div>

          {/* 링크 목록 */}
          <div className="flex flex-col gap-4">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group flex items-center justify-between py-4 border-b border-[#111] hover:border-[#222] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#444]">
                    0{i + 1}
                  </span>
                  <span className="text-[#f0f0f0] font-medium group-hover:text-[#e8ff47] transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-[#444]">{link.desc}</span>
                </div>
                <span className="text-[#444] group-hover:text-[#e8ff47] group-hover:translate-x-1 transition-all duration-200">
                  ↗
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="container-main mt-20 pt-8 border-t border-[#0e0e0e] flex items-center justify-between">
        <span className="text-xs font-mono text-[#2a2a2a]">
          © 2026 이가람. Built with Next.js + R3F
        </span>
        <span className="text-xs font-mono text-[#2a2a2a]">
          GARAM.DEV
        </span>
      </div>
    </section>
  );
}
