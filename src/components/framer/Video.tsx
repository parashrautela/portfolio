"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  background?: string;
  fit?: "cover" | "contain" | "fill";
};

/**
 * Muted, looping background video. Like Framer's Video component it only
 * plays while it is on screen and starts loading shortly before it scrolls in.
 */
export default function Video({ src, background = "rgba(0, 0, 0, 0)", fit = "cover" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);
  const nearView = useInView(ref, { margin: "10%", once: true });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView) {
      video.preload = "auto";
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload={nearView ? "metadata" : "none"}
      style={{
        cursor: "auto",
        width: "100%",
        height: "100%",
        borderRadius: 0,
        display: "block",
        objectFit: fit,
        backgroundColor: background,
        objectPosition: "50% 50%",
      }}
    />
  );
}
