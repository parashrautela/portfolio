"use client";

import { motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import MaterialIcon from "./MaterialIcon";

const hoverSpring = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

/** White "Connect +" pill that opens the Calendly booking page; the plus turns 90° on hover. */
export default function ConnectButton({ onClick, style }: { onClick?: () => void; style?: CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      className="framer-wQaE0 framer-12p1b00 framer-v-1ejcmjn framer-1m30uos"
      data-framer-name="Variant 2"
      data-highlight="true"
      href="https://calendly.com/parashrautela70/30min"
      target="_blank"
      rel="noopener"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        backgroundColor: "rgb(255, 255, 255)",
        ...style,
      }}
    >
      <div
        className="framer-a2msr3"
        data-framer-component-type="RichTextContainer"
        style={{
          "--extracted-r6o4lv": "rgb(255, 255, 255)",
          "--framer-link-text-color": "rgb(0, 153, 255)",
          "--framer-link-text-decoration": "underline",
          "--framer-paragraph-spacing": "0px",
        }}
      >
        <p
          dir="auto"
          className="framer-text"
          style={{
            "--framer-font-family": '"undefined", monospace',
            "--framer-font-size": "14px",
            "--framer-font-weight": "500",
            "--framer-text-alignment": "center",
            "--framer-text-transform": "uppercase",
          }}
        >
          {"Connect "}
        </p>
      </div>
      <div className="framer-1ifmy6w">
        <motion.div
          className="framer-1lyzeip-container"
          initial={false}
          animate={{ rotate: hovered ? 90 : 0 }}
          transition={hoverSpring}
        >
          <MaterialIcon name="add" color="rgb(0, 0, 0)" />
        </motion.div>
      </div>
    </a>
  );
}
