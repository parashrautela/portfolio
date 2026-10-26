"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  track?: string;
  /** Seconds skipped at the start of the track (also where each loop restarts) */
  trimFromStart?: number;
  playingText?: string;
  pausedText?: string;
};

const colors = {
  text: "rgb(194, 194, 194)",
  hoverText: "rgb(255, 255, 255)",
  border: "rgba(189, 189, 189, 0.1)",
  hoverBorder: "rgb(255, 255, 255)",
  background: "rgba(0, 0, 0, 0)",
  hoverBackground: "rgba(255, 255, 255, 0.1)",
};

/** "Turn the sound on" toggle with an animated equaliser icon and a looping background track. */
export default function SoundButton({
  track = "/audio/x0JegPvciUk3npXFOZzv5yczl50.mp3",
  trimFromStart = 1.5,
  playingText = "TURN THE SOUND OFF",
  pausedText = "TURN THE SOUND ON",
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", onMeta);
    return () => audio.removeEventListener("loadedmetadata", onMeta);
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.currentTime = trimFromStart;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [playing, trimFromStart]);

  // Loop back to the trimmed start point instead of 0
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const onTime = () => {
      if (audio.currentTime >= duration) {
        audio.currentTime = trimFromStart;
        if (playing) audio.play().catch(() => {});
      }
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, [trimFromStart, duration, playing]);

  const textColor = hovered ? colors.hoverText : colors.text;
  const bars = playing ? [0.3, 0.5, 0.8, 0.5, 0.3] : [0.3, 0.3, 0.3, 0.3, 0.3];

  const buttonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "16px 24px",
    backgroundColor: hovered ? colors.hoverBackground : colors.background,
    border: `1px solid ${hovered ? colors.hoverBorder : colors.border}`,
    borderRadius: 0,
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "max-content",
    zIndex: 9999,
    position: "relative",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  return (
    <>
      <audio ref={audioRef} src={track} loop />
      <button
        style={buttonStyle}
        onClick={() => setPlaying((p) => !p)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ overflow: "visible" }}>
          {bars.map((h, i) => (
            <rect
              key={i}
              x={i * 6}
              y={12 - h * 12}
              width="2"
              height={h * 24}
              rx="1"
              fill={textColor}
              style={{
                transformOrigin: "center",
                animation: playing ? `pulse 0.8s ease-in-out ${i * 0.1}s infinite alternate` : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </svg>
        <span
          style={{
            color: textColor,
            fontFamily: '"Geist Pixel Square", "Geist Pixel Square Placeholder", sans-serif',
            fontSize: "14px",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: "2px",
            lineHeight: "1em",
            textAlign: "left",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          {playing ? playingText : pausedText}
        </span>
      </button>
    </>
  );
}
