"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Heart = {
  id: string;
  xPct: number;
  size: number;
  delay: number;
  duration: number;
  hue: "pink" | "purple" | "cyan";
  opacity: number;
};

function HeartGlyph({ hue }: { hue: Heart["hue"] }) {
  const fill =
    hue === "pink"
      ? "color-mix(in oklab, var(--neon-pink), transparent 15%)"
      : hue === "cyan"
        ? "color-mix(in oklab, var(--neon-cyan), transparent 25%)"
        : "color-mix(in oklab, var(--neon-purple), transparent 18%)";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-full w-full">
      <path
        d="M12 21s-7.3-4.6-10-9.3C.3 8.6 2.1 5.2 5.6 4.4c2-.5 4.1.3 5.4 1.9 1.3-1.6 3.4-2.4 5.4-1.9 3.5.8 5.3 4.2 3.6 7.3C19.3 16.4 12 21 12 21Z"
        fill={fill}
      />
    </svg>
  );
}

export default function FloatingHearts({ density = 10 }: { density?: number }) {
  const reduce = useReducedMotion();

  const hearts = useMemo<Heart[]>(() => {
    const hues: Heart["hue"][] = ["purple", "pink", "cyan"];
    return Array.from({ length: density }).map((_, i) => {
      const hue = hues[i % hues.length];
      const xPct = (i * (86 / Math.max(1, density - 1))) + 7;
      return {
        id: `heart-${i}`,
        xPct,
        size: 10 + (i % 5) * 6,
        delay: (i % 7) * 0.35,
        duration: 7.5 + (i % 5) * 1.1,
        hue,
        opacity: 0.08 + (i % 4) * 0.03,
      };
    });
  }, [density]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110%", opacity: 0 }}
          animate={{
            y: "-18%",
            opacity: [0, h.opacity, 0],
            x: [0, (h.xPct % 2 === 0 ? 1 : -1) * 16, 0],
            rotate: [0, h.xPct % 2 === 0 ? 8 : -10, 0],
          }}
          transition={{
            delay: h.delay,
            duration: h.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${h.xPct}%`,
            width: h.size,
            height: h.size,
            filter: "blur(0.2px)",
          }}
          className="absolute bottom-0"
          aria-hidden="true"
        >
          <HeartGlyph hue={h.hue} />
        </motion.div>
      ))}
    </div>
  );
}

