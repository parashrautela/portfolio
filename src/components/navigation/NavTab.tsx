"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, type CSSProperties } from "react";

const hoverSpring = { type: "spring", bounce: 0.2, duration: 0.4 } as const;

const textStyle: CSSProperties = {
  "--framer-font-family": '"undefined", monospace',
  "--framer-font-size": "14px",
  "--framer-font-weight": "500",
  "--framer-text-alignment": "left",
  "--framer-text-color": "var(--extracted-r6o4lv, rgb(255, 255, 255))",
  "--framer-text-transform": "uppercase",
};

type Props = {
  title: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

/** Navigation link; a small white dot pops in above the label on hover. */
export default function NavTab({ title, href, external, onClick, style }: Props) {
  const [hovered, setHovered] = useState(false);
  const className = "framer-prKyQ framer-10ebk9n framer-v-10ebk9n framer-1d2p4a9";
  const content = (
    <div className="framer-3p4yi8">
      {hovered && (
        <motion.div
          layout
          transition={hoverSpring}
          className="framer-1vhrebu"
          style={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: 13 }}
        />
      )}
      <motion.div
        layout="position"
        transition={hoverSpring}
        className="framer-1wyi654"
        data-framer-component-type="RichTextContainer"
        style={{
          "--extracted-r6o4lv": "rgb(255, 255, 255)",
          "--framer-link-text-color": "rgb(0, 153, 255)",
          "--framer-link-text-decoration": "underline",
          "--framer-paragraph-spacing": "0px",
        }}
      >
        <p dir="auto" className="framer-text" style={textStyle}>
          {title}
        </p>
      </motion.div>
    </div>
  );
  const shared = {
    className,
    "data-framer-name": "Variant 1",
    "data-highlight": "true",
    style: { height: "100%", ...style },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  };
  return external ? (
    <a {...shared} href={href} target="_blank" rel="noopener">
      {content}
    </a>
  ) : (
    <Link {...shared} href={href}>
      {content}
    </Link>
  );
}
