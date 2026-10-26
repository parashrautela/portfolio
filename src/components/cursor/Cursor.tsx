import { motion, type MotionStyle } from "framer-motion";
import type { CSSProperties } from "react";

export type CursorVariant =
  | "default"
  | "none"
  | "view"
  | "under-nda"
  | "under-construction"
  | "no-photo"
  | "mdai"
  | "mascot";

const variants: Record<CursorVariant, { className: string; label?: string; light?: boolean }> = {
  default: { className: "framer-v-1sj6s66" },
  none: { className: "framer-v-htjz6g" },
  view: { className: "framer-v-gfv7iz", label: "View" },
  "under-nda": { className: "framer-v-1vqc84s", label: "Under NDA" },
  "under-construction": { className: "framer-v-xeozzd", label: "Under Construction" },
  "no-photo": { className: "framer-v-usuefj", label: "Bro didn't had any good photo" },
  mdai: { className: "framer-v-ldapc1", label: "MDai Handheld", light: true },
  mascot: { className: "framer-v-czytmk", label: "Merci coming to world" },
};

const corner = (name: string, className: string, sides: [number, number, number, number], color: string) => (
  <div
    className={className}
    data-border="true"
    data-framer-name={name}
    style={{
      "--border-top-width": `${sides[0]}px`,
      "--border-right-width": `${sides[1]}px`,
      "--border-bottom-width": `${sides[2]}px`,
      "--border-left-width": `${sides[3]}px`,
      "--border-style": "solid",
      "--border-color": color,
    }}
  />
);

type Props = {
  variant: CursorVariant;
  /** Positioning styles from the host (position: fixed + motion values) */
  style?: MotionStyle;
  transformTemplate?: (latest: unknown, generated: string) => string;
  className?: string;
};

/**
 * Visual of the custom cursor: a small white square (blend mode difference) by default, or a
 * frosted label with corner brackets ("View", "Under NDA", ...) over specific elements.
 */
export default function Cursor({ variant, style, transformTemplate, className }: Props) {
  const v = variants[variant] ?? variants.default;
  const bracketColor = v.light ? "rgba(250, 250, 250, 0.76)" : "rgb(38, 38, 38)";
  const labelStyle: CSSProperties = {
    "--framer-font-family": '"DM Mono", monospace',
    "--framer-font-size": "10px",
    "--framer-font-weight": "500",
    "--framer-letter-spacing": "0.05em",
    "--framer-text-color": `var(--extracted-r6o4lv, ${v.light ? "rgb(255, 255, 255)" : "rgb(38, 38, 38)"})`,
  };

  return (
    <motion.div
      className={`framer-0MI91 framer-1sj6s66 ${v.className}${className ? ` ${className}` : ""}`}
      data-framer-name="cursor"
      style={style}
      transformTemplate={transformTemplate}
    >
      {v.label && (
        <div
          className="framer-f0qkin"
          data-framer-name="Hover"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="framer-1cho3xl"
            data-framer-component-type="RichTextContainer"
            style={{ "--extracted-r6o4lv": v.light ? "rgb(255, 255, 255)" : "rgb(38, 38, 38)" }}
          >
            <p dir="auto" className="framer-text" style={labelStyle}>
              {v.label}
            </p>
          </div>
          {corner("Top Right", "framer-1icx8n", [1, 1, 0, 0], bracketColor)}
          {corner("Top Left", "framer-189768n", [1, 0, 0, 1], bracketColor)}
          {corner("Bottom Left", "framer-16qzgyh", [0, 0, 1, 1], bracketColor)}
          {corner("Bottom Right", "framer-1idv2sg", [0, 1, 1, 0], bracketColor)}
        </div>
      )}
      {variant === "default" && (
        <div className="framer-1jm73ud">
          <div className="framer-1pmlff0" data-framer-component-type="SVG">
            <svg viewBox="0 0 20 20" overflow="visible" style={{ width: "100%", height: "100%" }}>
              <path d="M 0 0 L 20 0 L 20 20 L 0 20 Z" fill="rgb(255, 255, 255)" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
}
