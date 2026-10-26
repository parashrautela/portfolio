"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

/** Lenis smooth scrolling. `intensity` matches the Framer component's setting (duration = intensity / 10 s). */
export default function SmoothScroll({ intensity = 10 }: { intensity?: number }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: intensity / 10 });
    lenis.scrollTo(0, { immediate: true });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [intensity]);

  return null;
}
