"use client";

import { navLinks, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.03em] text-[#111111] transition-opacity hover:opacity-60"
          >
            {profile.name}
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border px-4 py-2.5 shadow-[0_8px_24px_rgba(25,31,40,0.06)] backdrop-blur-xl transition-all duration-300 md:flex",
              scrolled
                ? "border-[#e5e8eb] bg-white/85"
                : "border-white/80 bg-white/75"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="rounded-full px-5 py-1.5 text-sm font-medium text-[#333d4b] transition hover:bg-[#f5f7fa] hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2663f2]/30"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/80 bg-white/75 shadow-sm backdrop-blur-xl transition hover:bg-white md:hidden"
            aria-label="메뉴 열기"
            aria-expanded={isOpen}
          >
            <motion.span
              className="block h-[1.5px] w-5 rounded-full bg-[#111111]"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
              transition={{ duration: 0.24, ease }}
            />
            <motion.span
              className="block h-[1.5px] w-5 rounded-full bg-[#111111]"
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2, ease }}
            />
            <motion.span
              className="block h-[1.5px] w-5 rounded-full bg-[#111111]"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
              transition={{ duration: 0.24, ease }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            className="fixed inset-x-4 top-20 z-40 overflow-hidden rounded-[28px] border border-[#e5e8eb] bg-white/90 p-2 shadow-[0_24px_80px_rgba(25,31,40,0.16)] backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.22, ease }}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[#191f28] transition hover:bg-[#f5f7fa]"
                  >
                    <span>{link.label}</span>
                    {link.external && <span className="text-[#8b95a1]">↗</span>}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}