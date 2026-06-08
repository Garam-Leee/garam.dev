"use client";

import { useSyncExternalStore } from "react";

// useSyncExternalStore — 외부 시스템(MediaQueryList) 구독을 위한 React 18+ 공식 패턴
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false // SSR fallback
  );
}
