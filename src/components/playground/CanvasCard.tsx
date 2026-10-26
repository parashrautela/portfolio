"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const hoverSpring = { type: "spring", bounce: 0.1, duration: 0.6 } as const;

type Props = {
  style?: CSSProperties;
  /** Aspect ratio of the image frame (width / height) */
  aspectRatio: number;
  /** The <BgImage /> to show */
  children: ReactNode;
};

/** Playground card: the image darkens and zooms in slightly on hover. */
export default function CanvasCard({ style, aspectRatio, children }: Props) {
  return (
    <motion.div
      className="framer-lI1Og framer-18o118l framer-v-18o118l"
      data-framer-name="Default"
      style={style}
      initial={false}
      whileHover="hover"
    >
      <div className="framer-19qghjb">
        <motion.div
          className="framer-1u5kdf0"
          data-framer-name="Image 1"
          style={{ filter: "none", WebkitFilter: "none", scale: 1, height: "auto", aspectRatio }}
          variants={{ hover: { filter: "brightness(0.7)", scale: 1.1 } }}
          transition={hoverSpring}
        >
          {children}
        </motion.div>
      </div>
      <div className="framer-1ygubow" />
    </motion.div>
  );
}
