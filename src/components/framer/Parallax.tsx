"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  /** Framer parallax speed in percent: 100 = scrolls normally, 180 = moves 1.8x as fast */
  speed: number;
  children?: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
};

/** Framer's "Scroll Speed" effect: shifts the layer vertically relative to the page scroll. */
export default function Parallax({ className, style, speed, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const measured = useRef(false);
  const { scrollY } = useScroll();
  const y = useMotionValue(0);
  const factor = speed / 100 - 1;

  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (measured.current) y.set(-scroll * factor);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Framer starts applying the offset once the layer has been observed for the first time
    const observer = new IntersectionObserver(() => {
      measured.current = true;
      y.set(-scrollY.get() * factor);
      observer.disconnect();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [factor, scrollY, y]);

  return (
    <motion.div ref={ref} {...rest} className={className} style={{ ...style, willChange: "transform", y }}>
      {children}
    </motion.div>
  );
}
