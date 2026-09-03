"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollProgress {
  scrollY: number;
  scrollProgress: number; // 0 ~ 1
  direction: "up" | "down";
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    scrollY: 0,
    scrollProgress: 0,
    direction: "down",
    isAtTop: true,
    isAtBottom: false,
  });

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      setState({
        scrollY,
        scrollProgress,
        direction: scrollY > prevScrollY.current ? "down" : "up",
        isAtTop: scrollY < 10,
        isAtBottom: scrollY >= maxScroll - 10,
      });

      prevScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}

// 특정 엘리먼트의 뷰포트 내 진행도를 추적
export function useElementProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress(entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return progress;
}
