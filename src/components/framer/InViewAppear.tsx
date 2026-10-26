"use client";

import { motion, type Transition } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type State = { opacity?: number; x?: number; y?: number; scale?: number };

type Props = {
  as?: "div" | "svg" | "h1" | "p";
  className?: string;
  style?: CSSProperties;
  /** State before the layer scrolls into view */
  from: State;
  transition: Transition;
  children?: ReactNode;
  [attr: string]: unknown;
};

/** Framer "Appear" effect with an in-view trigger: animates in once the layer enters the viewport. */
export default function InViewAppear({ as = "div", className, style, from, transition, children, ...rest }: Props) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      {...rest}
      className={className}
      style={{ ...style, willChange: "transform" }}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, transition }}
      viewport={{ once: true, amount: 0 }}
    >
      {children}
    </Component>
  );
}
