"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "char" | "line";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
  splitBy = "word",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const parts = splitBy === "word"
    ? text.split(" ")
    : splitBy === "char"
    ? text.split("")
    : text.split("\n");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>} className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap gap-x-[0.25em]"
        aria-label={text}
      >
        {parts.map((part, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span variants={child} className="inline-block">
              {part}
              {splitBy === "word" && i < parts.length - 1 ? "" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
