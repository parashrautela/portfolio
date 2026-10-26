"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";

type Props = {
  src: string;
  width: number;
  height: number;
  /** Fade-out duration in ms once the video has ended */
  fadeDuration?: number;
  overlayColor?: string;
};

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Full-screen intro video shown on page load. The page can't be scrolled while it plays;
 * when the video ends the overlay fades out and is removed.
 */
export default function IntroVideo({ src, width, height, fadeDuration = 900, overlayColor = "#111111" }: Props) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useIsoLayoutEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }
    const body = document.body.style;
    const saved = { overflow: body.overflow, position: body.position, top: body.top, width: body.width };
    const scrollY = window.scrollY;
    body.overflow = "hidden";
    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.width = "100%";

    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    const blockWheel = (e: Event) => e.preventDefault();
    const blockTouch = (e: TouchEvent) => {
      if (e.touches.length <= 1) e.preventDefault();
    };
    window.addEventListener("scroll", block, { passive: false });
    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockTouch, { passive: false });
    document.addEventListener("touchmove", blockTouch, { passive: false });
    return () => {
      Object.assign(body, saved);
      window.scrollTo(0, scrollY);
      window.removeEventListener("scroll", block);
      window.removeEventListener("wheel", blockWheel);
      window.removeEventListener("touchmove", blockTouch);
      document.removeEventListener("touchmove", blockTouch);
    };
  }, [visible]);

  const finish = () => {
    if (fading || !visible) return;
    setFading(true);
    setTimeout(() => flushSync(() => setVisible(false)), fadeDuration);
  };

  if (!visible) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: overlayColor,
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
        transition: `opacity ${fadeDuration}ms ease`,
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1, pointerEvents: "none" }}
      />
      <video
        src={src}
        autoPlay
        playsInline
        muted
        onEnded={finish}
        style={{
          position: "relative",
          width,
          height,
          objectFit: "cover",
          background: "#000",
          boxShadow: "0 2px 32px rgba(0,0,0,0.18)",
          borderRadius: 6,
          zIndex: 2,
        }}
      />
    </div>
  );
}
