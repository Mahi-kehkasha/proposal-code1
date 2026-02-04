"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function LoveCompanion() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[320px] select-none"
      aria-hidden="true"
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [0, -0.6, 0],
              }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{
          filter:
            "drop-shadow(0 14px 45px rgba(0,0,0,.55)) drop-shadow(0 0 22px rgba(155,77,255,.22))",
        }}
      >
        <svg viewBox="0 0 360 280" className="h-auto w-full">
          <defs>
            <linearGradient id="fur" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(246,242,255,0.95)" />
              <stop offset="1" stopColor="rgba(230,220,255,0.92)" />
            </linearGradient>
            <linearGradient id="ear" x1="0" x2="1" y1="0" y2="1">
              <stop
                offset="0"
                stopColor="color-mix(in oklab, var(--neon-pink), white 65%)"
                stopOpacity="0.75"
              />
              <stop
                offset="1"
                stopColor="color-mix(in oklab, var(--neon-purple), white 70%)"
                stopOpacity="0.55"
              />
            </linearGradient>
            <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
              <stop
                offset="0"
                stopColor="color-mix(in oklab, var(--neon-pink), white 78%)"
                stopOpacity="0.55"
              />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Soft halo */}
          <ellipse
            cx="180"
            cy="210"
            rx="120"
            ry="26"
            fill="rgba(0,0,0,0.35)"
          />

          {/* Body */}
          <path
            d="M92 196c0-55 40-102 88-102s88 47 88 102c0 38-26 70-58 70h-60c-32 0-58-32-58-70Z"
            fill="url(#fur)"
            opacity="0.98"
          />

          {/* Head */}
          <path
            d="M106 130c0-46 33-84 74-84s74 38 74 84c0 40-28 72-63 72h-22c-35 0-63-32-63-72Z"
            fill="url(#fur)"
          />

          {/* Ears */}
          <path
            d="M128 70c-16 12-24 28-26 44 16-6 28-10 44-8-2-16-8-28-18-36Z"
            fill="url(#fur)"
          />
          <path
            d="M232 70c16 12 24 28 26 44-16-6-28-10-44-8 2-16 8-28 18-36Z"
            fill="url(#fur)"
          />
          <path
            d="M130 80c-10 10-14 20-16 32 12-4 22-6 34-4-2-12-8-20-18-28Z"
            fill="url(#ear)"
          />
          <path
            d="M230 80c10 10 14 20 16 32-12-4-22-6-34-4 2-12 8-20 18-28Z"
            fill="url(#ear)"
          />

          {/* Face */}
          <circle cx="152" cy="128" r="7" fill="rgba(18,14,28,0.88)" />
          <circle cx="208" cy="128" r="7" fill="rgba(18,14,28,0.88)" />
          <path
            d="M176 146c2 2 6 2 8 0"
            stroke="rgba(18,14,28,0.55)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M170 152c8 8 12 8 20 0"
            stroke="rgba(18,14,28,0.55)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheeks */}
          <circle cx="132" cy="148" r="18" fill="url(#cheek)" />
          <circle cx="228" cy="148" r="18" fill="url(#cheek)" />

          {/* Heart held */}
          <motion.g
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "180px 190px" }}
          >
            <path
              d="M180 214s-44-28-60-56c-10-18 0-40 20-44 14-3 28 3 40 18 12-15 26-21 40-18 20 4 30 26 20 44-16 28-60 56-60 56Z"
              fill="color-mix(in oklab, var(--neon-pink), white 10%)"
              opacity="0.92"
            />
            <path
              d="M180 214s-44-28-60-56c-10-18 0-40 20-44 14-3 28 3 40 18 12-15 26-21 40-18 20 4 30 26 20 44-16 28-60 56-60 56Z"
              fill="none"
              stroke="color-mix(in oklab, var(--neon-purple), transparent 55%)"
              strokeWidth="2"
            />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

