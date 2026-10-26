"use client";

import { motion, type Transition } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type State = { opacity?: number; x?: number; y?: number; scale?: number };

type Props = {
  as?: "div" | "section" | "h1" | "p";
  className?: string;
  style?: CSSProperties;
  /** State rendered before the animation starts */
  from: State;
  /** State animated to on page load */
  to?: State;
  transition: Transition;
  /** Transform prepended to the generated one, e.g. "translateX(-50%)" */
  transformTemplate?: string;
  children?: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
};

/** Framer "Appear" effect: animates a layer in once, when the page loads. */
export default function Appear({
  as = "div",
  className,
  style,
  from,
  to = { opacity: 1, x: 0, y: 0, scale: 1 },
  transition,
  transformTemplate,
  children,
  ...rest
}: Props) {
  const Component = motion[as];
  return (
    <Component
      {...rest}
      className={className}
      style={style}
      initial={from}
      animate={{ ...to, transition }}
      transformTemplate={transformTemplate ? (_, generated) => `${transformTemplate} ${generated}` : undefined}
    >
      {children}
    </Component>
  );
}
