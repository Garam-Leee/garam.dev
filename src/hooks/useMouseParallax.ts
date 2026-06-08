"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number; // -1 ~ 1 (normalized)
  y: number; // -1 ~ 1 (normalized)
  rawX: number;
  rawY: number;
}

export function useMouseParallax(strength: number = 1) {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: ((e.clientX / window.innerWidth) * 2 - 1) * strength,
        y: (-(e.clientY / window.innerHeight) * 2 + 1) * strength,
      };
    };

    const animate = () => {
      // 부드러운 보간
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.06;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.06;

      setMouse({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: targetRef.current.x,
        rawY: targetRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return mouse;
}
