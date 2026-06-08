"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/* ── 커서 스포트라이트 캔버스 ── */
function CursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const dots = useRef<{ x: number; y: number; ox: number; oy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 36;
    let animId = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      dots.current = [];
      const cols = Math.ceil(canvas.offsetWidth / GAP) + 1;
      const rows = Math.ceil(canvas.offsetHeight / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.current.push({ x: c * GAP, y: r * GAP, ox: c * GAP, oy: r * GAP });
        }
      }
    };

    const RADIUS = 140;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const d of dots.current) {
        const dx = d.ox - mouse.current.x;
        const dy = d.oy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / RADIUS);

        // 커서 근처 dot는 밀려남
        d.x = d.ox + dx * influence * 0.35;
        d.y = d.oy + dy * influence * 0.35;

        // 색상: 거리에 따라 인디고 → 연한 회색
        const alpha = 0.08 + influence * 0.55;
        const size = 2 + influence * 2.5;

        ctx.beginPath();
        ctx.arc(d.x, d.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = influence > 0.1
          ? `rgba(79,70,229,${alpha})`
          : `rgba(209,213,219,${0.6})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "none" }}
    />
  );
}

/* ── 플로팅 태그 ── */
const FLOAT_TAGS = [
  { text: "Next.js", x: "8%", y: "22%", delay: 0.6 },
  { text: "TypeScript", x: "82%", y: "18%", delay: 0.75 },
  { text: "GA4", x: "12%", y: "72%", delay: 0.85 },
  { text: "Framer Motion", x: "78%", y: "70%", delay: 0.7 },
  { text: "Lighthouse 98", x: "88%", y: "42%", delay: 0.9 },
  { text: "Canvas API", x: "4%", y: "46%", delay: 0.95 },
];

export default function Hero() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [cursorX, cursorY]);

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-white">
      {/* 배경 도트 캔버스 */}
      <CursorCanvas />

      {/* 커스텀 커서 */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-multiply"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-8 h-8 rounded-full bg-[#4f46e5] opacity-70 blur-[1px]" />
      </motion.div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-[60px]">
        {/* 뱃지 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef2ff] border border-[#c7d2fe] text-[#4f46e5] text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            오픈 투 워크 · Seoul, Korea
          </span>
        </motion.div>

        {/* 이름 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="t-hero"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay: 0.2, ease }}
          >
            이가람
          </motion.h1>
        </div>

        {/* 직함 라인 */}
        <div className="overflow-hidden mb-6">
          <motion.div
            className="flex items-center justify-center gap-3 flex-wrap"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay: 0.32, ease }}
          >
            <span
              className="font-bold tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                color: "#4f46e5",
              }}
            >
              Frontend
            </span>
            <span
              className="font-bold tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                color: "#9ca3af",
              }}
            >
              &
            </span>
            <span
              className="font-bold tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                color: "#111827",
              }}
            >
              Designer
            </span>
          </motion.div>
        </div>

        {/* 서브 카피 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease }}
          className="t-body max-w-md mx-auto mb-10"
        >
          사용자 경험을 데이터로 증명합니다.
          <br />
          GA4 · Lighthouse · Core Web Vitals로 움직이는 숫자를 만듭니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="flex items-center gap-3 flex-wrap justify-center"
        >
          <a href="#about" className="btn-primary">
            소개 보기 →
          </a>
          <a href="mailto:contact@garam.dev" className="btn-secondary">
            연락하기
          </a>
        </motion.div>
      </div>

      {/* 플로팅 태그 — 데스크탑만 */}
      {FLOAT_TAGS.map((tag, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block pointer-events-none"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: tag.delay, ease }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="badge shadow-sm text-[#6b7280]"
          >
            {tag.text}
          </motion.div>
        </motion.div>
      ))}

      {/* 하단 스크롤 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 pb-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#9ca3af]"
        >
          <span className="t-label">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
