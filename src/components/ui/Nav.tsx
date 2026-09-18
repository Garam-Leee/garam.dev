"use client";

import { navLinks, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ease = [0.4, 0, 0.2, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-10">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-full px-1 text-[15px] font-bold tracking-[-0.03em] text-[#191f28] transition hover:text-[#3182f6] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/15"
          >
            {profile.name}
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border px-1.5 py-1.5 backdrop-blur-xl transition-all duration-300 md:flex",
              scrolled
                ? "border-[#e5e8eb]/80 bg-white/90 shadow-[0px_8px_24px_rgba(25,31,40,0.08)]"
                : "border-white/70 bg-white/58 shadow-[0px_4px_16px_rgba(25,31,40,0.04)]"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                download={"download" in link ? link.download : undefined}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-[#4e5968] transition hover:bg-[#f2f4f6] hover:text-[#191f28] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/15"
              >
                <span>{link.label}</span>
                {link.external && <ArrowUpRight size={13} strokeWidth={2.2} />}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-full border backdrop-blur-xl transition md:hidden",
              isOpen
                ? "border-[#3182f6]/20 bg-[#3182f6] text-white shadow-[0px_8px_24px_rgba(49,130,246,0.24)]"
                : "border-[#e5e8eb]/80 bg-white/85 text-[#191f28] shadow-[0px_4px_16px_rgba(25,31,40,0.08)] hover:bg-white"
            )}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
          >
            <span className="relative block h-4 w-5">
              <motion.span
                className="absolute left-0 top-[2px] h-[1.5px] w-5 rounded-full bg-current"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                transition={{ duration: 0.22, ease }}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-[1.5px] w-5 rounded-full bg-current"
                animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 4 : 0 }}
                transition={{ duration: 0.18, ease }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-[1.5px] w-5 rounded-full bg-current"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
                transition={{ duration: 0.22, ease }}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="메뉴 닫기"
              className="fixed inset-0 z-40 bg-[#191f28]/18 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.24, ease }}
              className="fixed inset-x-4 top-[72px] z-50 overflow-hidden rounded-[24px] border border-white/80 bg-white/88 shadow-[0px_24px_80px_rgba(25,31,40,0.18)] backdrop-blur-2xl md:hidden"
            >
              <div className="pointer-events-none absolute inset-x-3 top-2 h-16 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent)]" />

              <nav className="relative p-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.035,
                      duration: 0.22,
                      ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      download={"download" in link ? link.download : undefined}
                      onClick={() => setIsOpen(false)}
                      className="group flex min-h-12 items-center justify-between rounded-[18px] px-4 py-3 text-[15px] font-bold tracking-[-0.02em] text-[#191f28] transition hover:bg-[#f2f4f6] focus:outline-none focus:ring-4 focus:ring-[#3182f6]/15"
                    >
                      <span>{link.label}</span>

                      {link.external ? (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f2f4f6] text-[#8b95a1] transition group-hover:bg-[#e8f3ff] group-hover:text-[#3182f6]">
                          <ArrowUpRight size={15} strokeWidth={2.3} />
                        </span>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#e5e8eb] transition group-hover:bg-[#3182f6]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}