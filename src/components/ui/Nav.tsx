"use client";

import { ease } from "@/lib/motion";

import { navLinks, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";


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
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
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

          <Dialog.Trigger asChild>
          <button
            type="button"
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
          </Dialog.Trigger>
        </div>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#191f28]/18 backdrop-blur-[2px] md:hidden" />
        <Dialog.Content
          data-lenis-prevent
          className="fixed inset-x-4 top-20 z-[70] max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[24px] border border-white/80 bg-white/95 p-3 shadow-[0_24px_80px_rgba(25,31,40,0.18)] backdrop-blur-2xl md:hidden"
        >
          <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">포트폴리오 섹션과 외부 프로필로 이동합니다.</Dialog.Description>
          <div className="flex justify-end">
            <Dialog.Close className="rounded-full px-4 py-2 text-sm font-semibold text-body">메뉴 닫기</Dialog.Close>
          </div>
          <nav aria-label="모바일 주 메뉴">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  download={"download" in link ? link.download : undefined}
                  className="flex min-h-12 items-center justify-between rounded-[18px] px-4 py-3 text-[15px] font-bold text-heading transition hover:bg-[#f2f4f6]"
                >
                  {link.label}
                  {link.external && <ArrowUpRight size={15} aria-hidden="true" />}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}