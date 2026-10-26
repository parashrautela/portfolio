"use client";

import { useLayoutEffect, useRef } from "react";

type Props = {
  src: string;
  /** How far the image travels, as a percentage of the frame height */
  amount: number;
};

/** Image that drifts inside its frame while the page scrolls (port of the "Image Parallax" code component). */
export default function ImageParallax({ src, amount }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;
    image.style.transform = "translate3d(0, 0, 0)";
    image.style.willChange = "transform";

    let raf: number | null = null;
    let queued = false;
    const update = () => {
      const rect = frame.getBoundingClientRect();
      const height = frame.offsetHeight;
      if (height === 0 || frame.offsetWidth === 0) return;
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + height)));
      const offset = (progress - 0.5) * (amount / 100) * height;
      image.style.transform = `translate3d(0px, ${offset}px, 0)`;
      queued = false;
    };
    const onScroll = () => {
      if (!queued) {
        raf = requestAnimationFrame(update);
        queued = true;
      }
    };
    const onResize = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [amount]);

  const half = Math.abs(amount) / 2;
  return (
    <div ref={frameRef} style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden", borderRadius: 0 }}>
      <div
        style={{
          width: "100%",
          zIndex: 1000,
          height: "100%",
          borderRadius: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          top: `-${half}%`,
          left: "-0%",
          right: "-0%",
          bottom: `-${half}%`,
          width: "calc(100% + 0%)",
          height: `calc(100% + ${Math.abs(amount)}%)`,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
          willChange: "transform",
          backfaceVisibility: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
