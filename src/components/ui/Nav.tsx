"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-12% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll("main section[id], footer[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="inline-flex items-center gap-3 text-[14px] font-semibold tracking-tight text-heading" aria-label="Garam Lee 홈">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-heading font-mono text-[11px] tracking-[-0.05em] text-white" aria-hidden="true">GL</span>
            Garam Lee
          </Link>
          <nav aria-label="주 메뉴" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} aria-current={link.href === "#" + activeSection ? "location" : undefined} className="nav-link">
                {link.label}{link.external && <ArrowUpRight size={12} aria-hidden="true" />}
              </Link>
            ))}
          </nav>
          <Dialog.Trigger asChild>
            <button type="button" aria-label="메뉴 열기" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f6fb] text-heading md:hidden"><Menu size={22} /></button>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content data-lenis-prevent className="mobile-menu">
          <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">기술 사례, 경력과 연락처로 이동합니다.</Dialog.Description>
          <div className="mb-3 flex justify-end"><Dialog.Close aria-label="메뉴 닫기" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f6fb]"><X size={22} /></Dialog.Close></div>
          <nav aria-label="모바일 주 메뉴">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.label}>
                <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} aria-current={link.href === "#" + activeSection ? "location" : undefined} className="mobile-nav-link">
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
