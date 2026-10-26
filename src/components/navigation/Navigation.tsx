"use client";

import "@/styles/components/navigation.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BgImage from "@/components/framer/BgImage";
import ConnectButton from "./ConnectButton";
import MaterialIcon from "./MaterialIcon";
import NavTab from "./NavTab";

type Props = {
  variant: "desktop" | "phone";
  /** Stretch the bar to its container (used on the home page) */
  fullWidth?: boolean;
};

const variantClass = { desktop: "framer-v-1qv4a9m", phone: "framer-v-i84x8w", open: "framer-v-1ixfy4k" };
const variantName = { desktop: "Desktop", phone: "Phone", open: "Phone Open" };
const layoutSpring = { type: "spring", damping: 40, stiffness: 400, mass: 1 } as const;
const hideTween = { type: "tween", duration: 1, ease: [1, 0.02, 0, 0.96] } as const;

/** Slides the bar out of view while scrolling down and brings it back when scrolling up. */
function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last: number | undefined;
    let direction: "up" | "down" | undefined;
    let turnedAt = 0;
    let current: boolean | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y > max || y < 0) return;
      const dir = last !== undefined && y < last ? "up" : "down";
      last = y;
      if (dir !== direction) {
        direction = dir;
        turnedAt = y;
        return;
      }
      if (Math.abs(y - turnedAt) < 4) return;
      const hide = dir === "down";
      if (hide !== current) {
        current = hide;
        setHidden(hide);
      }
    };
    // Framer evaluates the scroll position once on mount, which primes the direction to "down"
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}

function Logo({ current }: { current: boolean }) {
  return (
    <Link className="framer-fkqheb framer-1wah7jz" href="/" data-framer-page-link-current={current ? "true" : undefined}>
      <BgImage
        src="PWNFxFRREdvfApytv3KFyOq9fcQ.jpg"
        width={828}
        height={1174}
        scales={[1024]}
        sizes="(min-width: 1200px) 95px, (max-width: 1199.98px) 95px"
      />
    </Link>
  );
}

/** The floating navigation bar (Desktop / Phone / Phone Open variants). */
export default function Navigation({ variant, fullWidth = false }: Props) {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScrollDown();
  const pathname = usePathname();
  const state = variant === "desktop" ? "desktop" : open ? "open" : "phone";
  // Framer closes the menu after a short delay so the tap feedback is visible
  const close = () => setTimeout(() => setOpen(false), 200);
  const tabStyle = state === "open" ? { width: "100%" } : undefined;

  return (
    <motion.nav
      layout
      className={`framer-KU0KI framer-1qv4a9m ${variantClass[state]}`}
      data-framer-name={variantName[state]}
      style={{
        backdropFilter: "blur(64px)",
        WebkitBackdropFilter: "blur(64px)",
        backgroundColor: "rgba(0, 0, 0, 0.24)",
        width: fullWidth ? "100%" : undefined,
        willChange: "transform",
      }}
      initial={false}
      animate={{ y: hidden ? 200 : 0 }}
      transition={{ default: hideTween, layout: layoutSpring }}
    >
      {state === "open" && (
        <motion.div layout transition={layoutSpring} className="framer-xs90ck-container">
          <MaterialIcon name="close" color="var(--token-b9a38ae6-6808-421e-8c6e-e2c5bc817a9d, rgb(255, 255, 255))" onClick={close} />
        </motion.div>
      )}
      {state !== "open" && (
        <motion.div layout transition={layoutSpring} className="framer-1ja1omm">
          <Logo current={pathname === "/"} />
          {state === "phone" && (
            <div
              className="framer-1oheh35"
              data-framer-name="Variant 2"
              data-highlight="true"
              tabIndex={0}
              onClick={() => setOpen(true)}
              style={{
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                backgroundColor: "rgb(255, 255, 255)",
              }}
            >
              <div
                className="framer-vv273h"
                data-framer-component-type="RichTextContainer"
                style={{
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
                  Menu
                </p>
              </div>
              <div className="framer-war8gz">
                <div className="framer-1bxiifx-container">
                  <MaterialIcon name="add" color="rgb(0, 0, 0)" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {state !== "phone" && (
        <motion.div layout transition={layoutSpring} className="framer-qt5ry" data-framer-name="Tabs">
          <div className="framer-1xpk9ix-container" data-framer-name="About">
            <NavTab
              title="Resume"
              href="https://drive.google.com/file/d/1f8i5OtRDYcJLsFI9SgcNyV3AjN7cFMth/view?usp=sharing"
              external
              onClick={state === "open" ? close : undefined}
              style={tabStyle}
            />
          </div>
          <div className="framer-1mtjpr5-container" data-framer-name="Projects">
            <NavTab title="About" href="/about-me" onClick={state === "open" ? close : undefined} style={tabStyle} />
          </div>
          <div className="framer-zz0oof-container" data-framer-name="Journal">
            <NavTab title="Playground" href="/playground" onClick={state === "open" ? close : undefined} style={tabStyle} />
          </div>
        </motion.div>
      )}
      {state === "desktop" && (
        <div className="framer-1os1rq8" data-framer-name="Bottom Line" style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }} />
      )}
      {state !== "phone" && (
        <motion.div layout transition={layoutSpring} className="framer-skff2j-container">
          <ConnectButton onClick={state === "open" ? close : undefined} style={state === "open" ? { width: "100%" } : undefined} />
        </motion.div>
      )}
    </motion.nav>
  );
}
