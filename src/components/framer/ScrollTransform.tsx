"use client";

import {
  interpolate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useLayoutEffect, type CSSProperties, type ReactNode } from "react";

const KEYS = ["opacity", "x", "y", "scale", "rotate", "rotateX", "rotateY", "skewX", "skewY"] as const;
type Key = (typeof KEYS)[number];
type Values = Partial<Record<Key, number>>;

const DEFAULTS: Record<Key, number> = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  skewY: 0,
};

export type ScrollTarget = Values & {
  /** CSS selector of the element whose scroll position drives the transition into this state */
  trigger?: string;
};

type Props = {
  as?: "div" | "section" | "p" | "h1";
  className?: string;
  style?: CSSProperties;
  /** First entry is the resting state; every following entry is reached while its trigger scrolls past */
  targets: ScrollTarget[];
  spring: { stiffness: number; damping: number; mass: number };
  /** Fraction of the viewport height at which a trigger starts (Framer "viewport threshold") */
  threshold?: number;
  /** Static transform values the scroll values are added to */
  base?: Values & { transformPerspective?: number };
  /** Transform prepended to the generated one, e.g. "translateX(-50%)" */
  transformTemplate?: string;
  children?: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
};

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function documentTop(el: HTMLElement) {
  let top = 0;
  let node: Element | null = el;
  while (node && node !== document.documentElement && node instanceof HTMLElement) {
    top += node.offsetTop;
    node = node.offsetParent;
  }
  return top;
}

/**
 * Builds the scroll -> value mapping exactly like Framer's "Scroll Transform" effect with a
 * "Section" trigger: while a trigger element scrolls through the viewport, the value moves from
 * the previous target to this one.
 */
function buildRanges(targets: ScrollTarget[], thresholdPx: number) {
  const input: number[] = [];
  const output: Record<Key, number[]> = Object.fromEntries(KEYS.map((k) => [k, []])) as never;
  const starts: number[] = [];
  for (let i = targets.length; i >= 0; i--) {
    const target = targets[i];
    if (!target?.trigger) continue;
    const el = document.querySelector<HTMLElement>(target.trigger);
    if (!el) continue;
    const start = documentTop(el) - 1 - thresholdPx;
    const end = Math.max(start + el.clientHeight, 0);
    const nextStart = starts[starts.length - 1];
    starts.push(start);
    input.unshift(Math.max(start, 0), nextStart === undefined ? end : Math.min(end, Math.max(nextStart - 1, 0)));
    const from = { ...DEFAULTS, ...targets[i - 1] };
    const to = { ...DEFAULTS, ...target };
    for (const key of KEYS) output[key].unshift(from[key], to[key]);
  }
  return { input, output };
}

function useSpringValues(initial: Values, spring: Props["spring"]) {
  const raw = {} as Record<Key, MotionValue<number>>;
  const smooth = {} as Record<Key, MotionValue<number>>;
  for (const key of KEYS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    raw[key] = useMotionValue(initial[key] ?? DEFAULTS[key]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    smooth[key] = useSpring(raw[key], { ...spring, restDelta: 0.001 });
  }
  return { raw, smooth };
}

export default function ScrollTransform({
  as = "div",
  className,
  style,
  targets,
  spring,
  threshold = 0,
  base,
  transformTemplate,
  children,
  ...rest
}: Props) {
  const { raw, smooth } = useSpringValues(targets[0], spring);

  useIsoLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { input, output } = buildRanges(targets, threshold * window.innerHeight);
      if (!input.length) return;
      for (const key of KEYS) raw[key].set(interpolate(input, output[key])(window.scrollY));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  const rotateY = useTransform(smooth.rotateY, (v) => v + (base?.rotateY ?? 0));
  const rotateX = useTransform(smooth.rotateX, (v) => v + (base?.rotateX ?? 0));
  const rotate = useTransform(smooth.rotate, (v) => v + (base?.rotate ?? 0));
  const x = useTransform(smooth.x, (v) => v + (base?.x ?? 0));
  const y = useTransform(smooth.y, (v) => v + (base?.y ?? 0));

  const Component = motion[as];
  return (
    <Component
      {...rest}
      className={className}
      transformTemplate={transformTemplate ? (_, generated) => `${transformTemplate} ${generated}` : undefined}
      style={{
        ...style,
        willChange: "transform",
        opacity: smooth.opacity,
        x,
        y,
        scale: smooth.scale,
        rotate,
        rotateX,
        rotateY,
        skewX: smooth.skewX,
        skewY: smooth.skewY,
        transformPerspective: base?.transformPerspective,
      }}
    >
      {children}
    </Component>
  );
}
