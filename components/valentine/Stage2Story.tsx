"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { reflections } from "./copy";

function Silhouette() {
  return (
    <svg viewBox="0 0 260 180" aria-hidden="true" className="h-auto w-full">
      <defs>
        <linearGradient id="sil" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
      </defs>
      <path
        d="M44 160c24-34 48-50 86-50s62 16 86 50H44Z"
        fill="url(#sil)"
      />
      <path
        d="M92 96c0-24 18-44 38-44s38 20 38 44c0 20-12 38-28 42h-20c-16-4-28-22-28-42Z"
        fill="url(#sil)"
      />
      <path
        d="M108 70c6-16 20-26 34-26 10 0 20 4 28 12-10 2-18 10-18 20 0 10 8 20 20 22h2c-8 10-22 18-36 18-22 0-40-16-40-36 0-4 .4-7 1-10Z"
        fill="rgba(255,255,255,0.05)"
      />
    </svg>
  );
}

export default function Stage2Story() {
  const reduce = useReducedMotion();
  const items = useMemo(() => reflections, []);

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-end">
      <div className="space-y-5">
        {items.map((q) => (
          <div key={`${q.source}-${q.reference}`} className="space-y-2">
            <p className="text-[15px] leading-7 text-[color-mix(in_oklab,var(--fg0),transparent_18%)]">
              “{q.text}”
            </p>
            <p className="text-xs tracking-[0.22em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_60%)]">
              {q.source} • {q.reference}
            </p>
          </div>
        ))}

        <p className="pt-1 text-xs leading-5 text-[color-mix(in_oklab,var(--fg0),transparent_55%)]">
          A reminder only — meant to soften the moment, not to pressure it.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={
          reduce
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [6, 0, 6] }
        }
        transition={{
          duration: reduce ? 0.8 : 9,
          repeat: reduce ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="hidden lg:block"
        aria-hidden="true"
      >
        <Silhouette />
      </motion.div>
    </div>
  );
}

