"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Petal = {
  id: string;
  xPct: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

function PetalGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-full w-full">
      <path
        d="M12 2c4 5 7 8 7 12 0 4-3 8-7 8s-7-4-7-8c0-4 3-7 7-12Z"
        fill="color-mix(in oklab, var(--neon-pink), transparent 78%)"
        stroke="color-mix(in oklab, var(--rose-gold), transparent 70%)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export default function PetalShower({ density = 18 }: { density?: number }) {
  const reduce = useReducedMotion();

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: `petal-${i}`,
      xPct: 5 + ((i * 97) % 90),
      size: 10 + (i % 6) * 4,
      delay: (i % 10) * 0.25,
      duration: 6.8 + (i % 7) * 0.9,
      opacity: 0.08 + (i % 5) * 0.03,
      drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6),
    }));
  }, [density]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-12%", opacity: 0, rotate: 0 }}
          animate={{
            y: "112%",
            opacity: [0, p.opacity, 0],
            x: [0, p.drift, 0],
            rotate: [0, p.drift > 0 ? 22 : -18, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${p.xPct}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.2px)",
          }}
          className="absolute top-0"
        >
          <PetalGlyph />
        </motion.div>
      ))}
    </div>
  );
}

