"use client";

import { motion, isMotionValue } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import type { MotionValue } from "framer-motion";

type MotionChildren = MotionValue<string | number>;

type Props = Omit<ComponentProps<typeof motion.button>, "children"> & {
  emphasis?: number;
  children?: ReactNode | MotionChildren;
};

export default function PrimaryButton({
  emphasis = 0,
  className,
  ...props
}: Props) {
  const glow = Math.min(1, emphasis / 5);
  const scale = 1 + Math.min(0.06, emphasis * 0.012);

  const { children, ...restProps } = props;
  const renderedChildren = isMotionValue(children)
    ? (children.get() as ReactNode)
    : (children as ReactNode);

  return (
    <motion.button
      whileHover={{ scale: scale + 0.02 }}
      whileTap={{ scale: scale - 0.01 }}
      style={{
        boxShadow: `0 0 ${16 + glow * 18}px rgba(155,77,255,${
          0.15 + glow * 0.35
        }), 0 0 ${34 + glow * 30}px rgba(255,46,184,${
          0.08 + glow * 0.22
        })`,
      }}
      className={[
        "group relative w-full select-none rounded-full px-6 py-4 text-[15px] font-semibold tracking-[0.08em] uppercase",
        "text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--neon-cyan),transparent_40%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--bg0),black_0%)]",
        "bg-[radial-gradient(120%_120%_at_30%_20%,color-mix(in_oklab,var(--neon-purple),white_12%),color-mix(in_oklab,var(--bg1),black_0%))]",
        "neon-border",
        "transition-[transform,filter,opacity] duration-300",
        className ?? "",
      ].join(" ")}
      {...restProps}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-neon" />
      <span className="relative">{renderedChildren}</span>
    </motion.button>
  );
}

