"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Particle = {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
};

export default function LightParticles({
  intensity = 10,
  tint = "cool",
}: {
  intensity?: number;
  tint?: "cool" | "warm";
}) {
  const reduce = useReducedMotion();
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: intensity }).map((_, i) => ({
      id: `p-${i}`,
      x: 6 + ((i * 91) % 88),
      y: 10 + ((i * 37) % 78),
      size: 2 + (i % 4),
      opacity: 0.06 + (i % 5) * 0.02,
      delay: (i % 7) * 0.5,
      duration: 7.5 + (i % 6) * 1.2,
    }));
  }, [intensity]);

  if (reduce) return null;

  const color =
    tint === "warm"
      ? "color-mix(in oklab, var(--neon-pink), transparent 45%)"
      : "color-mix(in oklab, var(--neon-cyan), transparent 55%)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, idx) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0.9, 1.15, 0.95],
            y: [0, idx % 2 === 0 ? -10 : 8, 0],
            x: [0, idx % 2 === 0 ? 8 : -10, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 18px ${color}`,
            borderRadius: 999,
            filter: "blur(0.2px)",
          }}
          className="absolute"
        />
      ))}
    </div>
  );
}

