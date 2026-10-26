"use client";

import "./cursor.css";
import { animate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cursor, { type CursorVariant } from "./Cursor";

type Placement = { x: string; y: string };

/** How each cursor is positioned relative to the pointer (matches the Framer cursor settings). */
const followSpring = { type: "spring", damping: 99, stiffness: 494, mass: 1 } as const;
const configs: Record<string, { offset: { x: number; y: number }; placement: Placement; spring: boolean }> = {
  // placement "right", alignment "end"
  follow: { offset: { x: 20, y: 50 }, placement: { x: "0%", y: "-100%" }, spring: true },
  // placement "bottom", alignment "center", no smoothing
  none: { offset: { x: 0, y: 0 }, placement: { x: "-50%", y: "0%" }, spring: false },
};

function cursorAt(x: number, y: number): CursorVariant | undefined {
  let el = document.elementFromPoint(x, y);
  while (el && el !== document.body) {
    const value = el.getAttribute("data-cursor");
    if (value) return value as CursorVariant;
    el = el.parentElement;
  }
  return undefined;
}

/**
 * Renders the custom cursor that follows the pointer. Elements opt in with a
 * `data-cursor="<variant>"` attribute; the closest one under the pointer wins.
 */
export default function CursorHost() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>();
  const pathname = usePathname();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const config = variant === "none" ? configs.none : configs.follow;
  const springX = useSpring(pointerX, config.spring ? followSpring : { duration: 0 });
  const springY = useSpring(pointerY, config.spring ? followSpring : { duration: 0 });
  const x = useTransform(springX, (v) => v + config.offset.x);
  const y = useTransform(springY, (v) => v + config.offset.y);

  useEffect(() => {
    const query = window.matchMedia("(any-hover: none)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let px = 0;
    let py = 0;
    let frame = requestAnimationFrame(function check() {
      setVariant(cursorAt(px, py));
      frame = requestAnimationFrame(check);
    });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = e.clientX;
      py = e.clientY;
      pointerX.set(px);
      pointerY.set(py);
      animate(opacity, 1, { type: "tween", duration: 0.2 });
    };
    const hide = () => animate(opacity, 0, { type: "tween", duration: 0.2 });
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, opacity, pointerX, pointerY, pathname]);

  if (!enabled || !variant) return null;

  return (
    <Cursor
      variant={variant}
      className="framer-pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 13, pointerEvents: "none", x, y, opacity }}
      transformTemplate={(_, generated) => `translate(${config.placement.x}, ${config.placement.y}) ${generated}`}
    />
  );
}
