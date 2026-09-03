"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { href: "#about", label: "소개" },
  { href: "#skills", label: "기술" },
  { href: "/posts", label: "포스트" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 border-b border-[#e5e8eb] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
        style={{ backdropFilter: scrolled ? "blur(16px)" : "none" }}
      >
        <div className="container flex items-center justify-between h-[60px]">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="font-bold text-[15px] text-[#111827] tracking-[-0.01em]">
              이가람
            </span>
          </Link>

          {/* 데스크탑 */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#374151] hover:text-[#4f46e5] hover:bg-[#eef2ff] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:contact@garam.dev"
              className="btn-primary text-sm py-2 px-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              연락하기
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[#f7f8fa] transition-colors"
            aria-label="메뉴"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-[#374151] origin-center rounded-full"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#374151] rounded-full"
              animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#374151] origin-center rounded-full"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-40 bg-white pt-[60px]"
          >
            <nav className="container py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease }}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold text-[#111827] hover:bg-[#f7f8fa] hover:text-[#4f46e5] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-4 pt-4"
              >
                <a
                  href="mailto:contact@garam.dev"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  연락하기 →
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
