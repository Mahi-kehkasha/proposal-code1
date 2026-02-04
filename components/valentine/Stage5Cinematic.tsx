"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import LightParticles from "./LightParticles";
import PetalShower from "./PetalShower";

const letterParagraphs: string[] = [
  "Ifrath, I want to say this honestly, without overthinking it.",
  "I love you. Not in a loud, dramatic way — but in the quiet way that grows with time. In the way you cross my mind without effort. In the way your presence, even from a distance, makes me feel calmer and more at ease.",
  "Every time I talk to you, something in me softens. Your words stay with me longer than I expect them to. Our conversations don’t fade — they settle somewhere deep and become part of my everyday thoughts.",
  "I know there’s distance between us right now, but love doesn’t really measure itself in kilometers. It shows up in thoughts, in care, in how much someone matters even when they’re not around.",
  "I don’t love you because of one moment. I love you because of many small ones — the way you make me feel understood, the comfort you bring, the quiet happiness I feel just knowing you exist in my life.",
  "I’m not asking for perfection or rushing anything. I just wanted you to know how real this is for me.",
  "This is me — loving you honestly, gently, and with all my heart.",
];

const closingQuestion =
  "With all of this said, are you willing to accept my proposal — or should I keep trying, gently, to earn your yes?";

export default function Stage5Cinematic({
  onReplay,
  onSave,
}: {
  onReplay: () => void;
  onSave: () => void;
}) {
  const reduce = useReducedMotion();
  const [showGentleNote, setShowGentleNote] = useState(false);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="pointer-events-none absolute inset-0 bg-aurora bg-aurora-drift opacity-95"
        aria-hidden="true"
      />

      <PetalShower density={22} />
      <LightParticles intensity={16} tint="warm" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl items-center px-5 py-10 sm:px-8">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl glass px-6 py-10 sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-aurora bg-aurora-drift opacity-60"
              aria-hidden="true"
            />

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 12, filter: "blur(18px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.22, 0.9, 0.22, 1] }}
                >
                  <p className="text-xs font-medium tracking-[0.32em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_45%)]">
                    A letter, from the heart
                  </p>
                  <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                    Alhamdulillah.
                  </h2>
                  <p className="mt-3 text-[13px] tracking-[0.26em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_60%)]">
                    May this be written with mercy and peace.
                  </p>

                  <div className="mt-7 max-h-[46vh] overflow-auto rounded-2xl border border-[color-mix(in_oklab,var(--fg0),transparent_86%)] bg-[color-mix(in_oklab,var(--bg1),transparent_40%)] px-5 py-5 sm:px-6 sm:py-6">
                    <div className="space-y-4 text-[15px] leading-7 text-[color-mix(in_oklab,var(--fg0),transparent_16%)]">
                      {letterParagraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      <p className="pt-2 text-[15px] leading-7 text-[color-mix(in_oklab,var(--fg0),transparent_12%)]">
                        {closingQuestion}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <motion.button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.location.href = "tel:+917899275871";
                        }
                      }}
                      className="w-full rounded-full px-6 py-4 text-[15px] font-semibold tracking-[0.08em] uppercase text-white neon-border bg-[radial-gradient(120%_120%_at_30%_20%,color-mix(in_oklab,var(--neon-purple),white_12%),color-mix(in_oklab,var(--bg1),black_0%))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--neon-cyan),transparent_40%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--bg0),black_0%)]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Yes, I accept — call her
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowGentleNote(true);
                        onSave();
                      }}
                      className="w-full rounded-full px-6 py-4 text-[15px] font-medium tracking-[0.06em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_24%)] border border-[color-mix(in_oklab,var(--fg0),transparent_84%)] hover:border-[color-mix(in_oklab,var(--fg0),transparent_70%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--fg0),transparent_65%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--bg0),black_0%)]"
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      I’m not ready yet
                    </motion.button>
                  </div>

                  <div className="mt-4">
                    {showGentleNote ? (
                      <p className="mb-3 text-xs leading-5 text-[color-mix(in_oklab,var(--fg0),transparent_60%)]">
                        It is okay if you are not ready yet. Her love for you is real, but she
                        also wants you to feel safe, calm, and at peace with whatever you decide.
                      </p>
                    ) : null}
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          // Suggest closing; most browsers will ignore this on normal tabs, which is fine.
                          window.close();
                        }
                      }}
                      className="w-full rounded-full px-6 py-3 text-[13px] font-medium tracking-[0.16em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_40%)] bg-transparent border border-dashed border-[color-mix(in_oklab,var(--fg0),transparent_80%)] hover:border-[color-mix(in_oklab,var(--fg0),transparent_65%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--fg0),transparent_65%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--bg0),black_0%)]"
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      You can close this now and speak to her directly — she is already madly in
                      love with you.
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

