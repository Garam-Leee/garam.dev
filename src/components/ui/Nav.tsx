"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-3 text-[14px] font-semibold tracking-tight text-heading" aria-label="Garam Lee 홈">
            <span className="grid h-8 w-8 place-items-center bg-heading font-mono text-[11px] tracking-[-0.05em] text-white" aria-hidden="true">GL</span>
            Garam Lee
          </Link>
          <nav aria-label="주 메뉴" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} className="inline-flex items-center gap-1 text-xs font-medium text-body transition-colors hover:text-blue">
                {link.label}{link.external && <ArrowUpRight size={12} aria-hidden="true" />}
              </Link>
            ))}
          </nav>
          <Dialog.Trigger asChild>
            <button type="button" aria-label="메뉴 열기" className="grid h-10 w-10 place-items-center text-heading md:hidden"><Menu size={22} /></button>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/30 md:hidden" />
        <Dialog.Content data-lenis-prevent className="fixed inset-x-4 top-20 z-[70] max-h-[calc(100dvh-100px)] overflow-y-auto rounded-lg border border-border bg-white p-5 shadow-xl md:hidden">
          <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">기술 사례, 경력과 연락처로 이동합니다.</Dialog.Description>
          <div className="mb-3 flex justify-end"><Dialog.Close aria-label="메뉴 닫기" className="grid h-10 w-10 place-items-center"><X size={22} /></Dialog.Close></div>
          <nav aria-label="모바일 주 메뉴">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.label}>
                <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} className="flex min-h-12 items-center justify-between border-t border-border py-4 text-sm font-medium text-heading">
                  {link.label}{link.external && <ArrowUpRight size={15} aria-hidden="true" />}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
