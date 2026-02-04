"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import FloatingHearts from "./FloatingHearts";
import LightParticles from "./LightParticles";
import LoveCompanion from "./LoveCompanion";
import { noClickProgression, stages, type Stage } from "./copy";
import Stage2Story from "./Stage2Story";
import Stage5Cinematic from "./Stage5Cinematic";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

const stageBackgrounds: Record<Stage, { src: string; alt: string }> = {
  1: {
    src: "/images/anime night sky stars.gif",
    alt: "A calm anime night sky with slow-moving stars and a soft crescent glow.",
  },
  2: {
    src: "/images/prayer mat aesthetic.jpg",
    alt: "A softly lit prayer mat scene, hinting at reflection and dua.",
  },
  3: {
    src: "/images/anime night sky stars (2).gif",
    alt: "A quiet anime night sky for a gentle question.",
  },
  4: {
    src: "/images/Dark Green Light Green Abstract Color and Style Video Background.gif",
    alt: "Soft abstract light, like patience breathing slowly in the dark.",
  },
  5: {
    src: "/images/anime flower petals.png",
    alt: "Anime-style petals suggesting a soft, celebratory moment.",
  },
};

export default function ValentineExperience() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>(1);
  const [noCount, setNoCount] = useState(0);

  const content = useMemo(() => stages[stage], [stage]);

  const noMessage = useMemo(() => {
    if (noCount <= 0) return null;
    return noClickProgression[Math.min(noClickProgression.length - 1, noCount - 1)];
  }, [noCount]);

  const noLabel = useMemo(() => {
    if (noCount <= 0) return stages[2].secondaryCta ?? "No";
    // Replace the label with mature, respectful copy.
    const idx = Math.min(noClickProgression.length - 1, noCount - 1);
    return noClickProgression[idx];
  }, [noCount]);

  const onNo = () => {
    // Only meaningful during the question (stage 3/4). Never navigates away, never rejects.
    if (stage !== 3 && stage !== 4) return;
    const next = Math.min(noClickProgression.length, noCount + 1);
    setNoCount(next);
    if (stage === 3) setStage(4);
  };

  const onPrimary = async () => {
    if (stage === 1) return setStage(2);
    if (stage === 2) return setStage(3);
    if (stage === 3 || stage === 4) return setStage(5);
    // Stage 5 replay is handled inside the cinematic component.
  };

  const onSecondary = async () => {
    try {
      await navigator.clipboard.writeText(
        "This was made with care — with mercy, patience, and sincerity."
      );
    } catch {
      // If clipboard is blocked, no hard failure — this is optional.
    }
  };

  const emphasis =
    stage === 1
      ? 0
      : stage === 2
        ? 1
        : stage === 3
          ? 2
          : stage === 4
            ? 2 + Math.min(4, noCount)
            : 4;
  const auroraClass =
    stage >= 4 ? "bg-aurora-warm bg-aurora-drift" : "bg-aurora bg-aurora-drift";
  const particlesOn = stage === 1 || stage === 2;
  const particlesTint = stage >= 2 ? "warm" : "cool";
  const heartsOn = false;
  const minimalMotion = stage === 5;
  const noDeemphasis = Math.min(0.42, noCount * 0.06);
  const noScale = Math.max(0.92, 1 - noCount * 0.015);

  return (
    <div className="relative">
      {/* Stage-specific cinematic background imagery (gif/jpg) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={stageBackgrounds[stage].src}
          alt={stageBackgrounds[stage].alt}
          fill
          priority={stage === 1}
          className="object-cover opacity-80"
        />
        {/* Mist + vignette to keep it premium and readable */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.55),transparent_58%),linear-gradient(to_bottom,rgba(0,0,0,0.82),rgba(0,0,0,0.94))]"
          aria-hidden="true"
        />
      </div>
      {heartsOn ? <FloatingHearts density={8} /> : null}

      <AnimatePresence mode="wait">
        {stage !== 5 ? (
          <motion.section
            key={`stage-${stage}`}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{
              duration: minimalMotion ? 0.95 : 0.8,
              ease: [0.22, 0.9, 0.22, 1],
            }}
            className="glass relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-40 ${auroraClass}`}
              aria-hidden="true"
            />
            {particlesOn ? (
              <LightParticles intensity={12} tint={particlesTint} />
            ) : null}

            <div className="relative">
              <div className="mb-8">
                {content.eyebrow ? (
                  <p className="text-xs font-medium tracking-[0.32em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_45%)]">
                    {content.eyebrow}
                  </p>
                ) : null}
                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                  {content.title}
                </h1>
                {content.subtext ? (
                  <p className="mt-4 text-balance text-[15px] leading-7 text-[color-mix(in_oklab,var(--fg0),transparent_22%)] sm:text-[16px]">
                    {content.subtext}
                  </p>
                ) : null}
                {content.microcopy ? (
                  <p className="mt-5 text-xs tracking-[0.24em] uppercase text-[color-mix(in_oklab,var(--fg0),transparent_60%)]">
                    {content.microcopy}
                  </p>
                ) : null}
              </div>

              {stage === 2 ? (
                <Stage2Story />
              ) : null}

              <motion.div
                animate={
                  reduce || stage < 3
                    ? undefined
                    : {
                        scale: [1, 1.01, 1],
                      }
                }
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                className="grid gap-3"
              >
                <PrimaryButton
                  emphasis={emphasis}
                  onClick={onPrimary}
                  aria-label={content.primaryCta}
                >
                  {content.primaryCta}
                </PrimaryButton>

                {stage === 3 || stage === 4 ? (
                  <div className="relative">
                    <SecondaryButton
                      onClick={onNo}
                      aria-label="No (stays on this screen)"
                      className="text-left"
                      style={{
                        opacity: 1 - noDeemphasis,
                        transform: `scale(${noScale})`,
                        filter: `saturate(${1 - noDeemphasis})`,
                      }}
                    >
                      {noLabel}
                    </SecondaryButton>
                    <AnimatePresence>
                      {noMessage ? (
                        <motion.p
                          key={`no-msg-${noCount}`}
                          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.22, 1] }}
                          className="mt-3 text-balance text-xs leading-5 text-[color-mix(in_oklab,var(--fg0),transparent_55%)]"
                          aria-live="polite"
                        >
                          {noMessage}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : null}
              </motion.div>

              <div className="mt-8 flex items-start justify-between gap-6">
                <div className="max-w-[30ch]">
                  <p className="text-xs leading-5 text-[color-mix(in_oklab,var(--fg0),transparent_55%)]">
                    {stage === 1
                      ? "Quietly, with care."
                      : stage === 2
                        ? "A calm reminder, offered gently."
                        : "Stay with what feels calm."}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <motion.div
                    animate={
                      reduce
                        ? undefined
                        : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.02, 1] }
                    }
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-10 w-10 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(59,243,255,0.35), rgba(155,77,255,0.10) 55%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <Stage5Cinematic
            onReplay={() => {
              setNoCount(0);
              setStage(1);
            }}
            onSave={onSecondary}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

