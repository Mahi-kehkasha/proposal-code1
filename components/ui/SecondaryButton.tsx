"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof motion.button>;

export default function SecondaryButton({ className, ...props }: Props) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={[
        "w-full select-none rounded-full px-6 py-4 text-[15px] font-medium tracking-[0.06em] uppercase",
        "text-[color-mix(in_oklab,var(--fg0),transparent_28%)]",
        "bg-transparent border border-[color-mix(in_oklab,var(--fg0),transparent_84%)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--fg0),transparent_65%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color-mix(in_oklab,var(--bg0),black_0%)]",
        "transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--fg0),transparent_70%)] hover:text-[color-mix(in_oklab,var(--fg0),transparent_14%)]",
        className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}

