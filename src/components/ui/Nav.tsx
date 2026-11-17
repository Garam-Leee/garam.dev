"use client";

import { IconButton, TopNavLink } from "./Primitives";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";

export default function Nav() {
  const pathname = usePathname();
  const hrefFor = (href: string) => href.startsWith("#") && pathname !== "/" ? "/" + href : href;
  const currentFor = (href: string) => href === "/posts" && pathname.startsWith("/posts") ? "page" as const : pathname === "/" && href === "#" + activeSection ? "location" as const : undefined;
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
  }, [pathname]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="inline-flex items-center gap-3 text-ds-14 font-semibold tracking-tight text-heading" aria-label="garam.dev 홈">
            garam.dev
          </Link>
          <nav aria-label="주 메뉴" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <TopNavLink key={link.href} href={hrefFor(link.href)} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} aria-current={currentFor(link.href)}>
                {link.label}{link.external && <ArrowUpRight size={12} aria-hidden="true" />}
              </TopNavLink>
            ))}
          </nav>
          <Dialog.Trigger asChild>
            <IconButton aria-label="메뉴 열기" className="md:hidden"><Menu size={22} /></IconButton>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content data-lenis-prevent className="mobile-menu">
          <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">기술 사례, 경력과 연락처로 이동합니다.</Dialog.Description>
          <div className="mb-3 flex justify-end"><Dialog.Close asChild><IconButton aria-label="메뉴 닫기"><X size={22} /></IconButton></Dialog.Close></div>
          <nav aria-label="모바일 주 메뉴">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.href}>
                <TopNavLink mobile href={hrefFor(link.href)} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} download={"download" in link ? link.download : undefined} aria-current={currentFor(link.href)}>
                  {link.label}{link.external && <ArrowUpRight size={15} aria-hidden="true" />}
                </TopNavLink>
              </Dialog.Close>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
