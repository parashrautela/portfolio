"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Endless 3D stack of placeholder cards that travels through the scene on mouse-wheel.
 * Port of the "3D layers" code component on the /testing page, with the settings used there.
 */
const settings = {
  background: "rgb(0, 0, 0)",
  scrollSensitivity: 0.5,
  perspective: 1300,
  cameraTilt: -14,
  cameraRotation: -65,
  layers: 25,
  layer: { spacing: 128, width: 400, height: 400, borderRadius: 8, color: "rgb(50, 50, 50)", opacity: 0.9 },
  hover: {
    elevation: 50,
    transition: { type: "spring", damping: 20, stiffness: 300, mass: 1, delay: 0 } as const,
  },
  padding: 16,
};

const placeholderStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "2px dashed rgba(255, 255, 255, 0.3)",
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "48px",
  fontWeight: "bold",
  userSelect: "none",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

function Layer({ index, offset }: { index: number; offset: MotionValue<number> }) {
  const { layers, layer, hover } = settings;
  const [hovered, setHovered] = useState(false);
  const loop = layers * layer.spacing;
  const start = -index * layer.spacing;
  // Position along the z-axis, wrapped so the stack repeats forever
  const z = useTransform(offset, (o) => ((((start + o) % loop) + loop) % loop) - loop * 0.5);
  const scale = useTransform(z, [-loop * 0.5, 0, loop * 0.5], [0.6, 1, 1.4], { clamp: false });
  const zIndex = useTransform(z, (v) => Math.round(5000 + v * 10));

  return (
    <motion.div
      className="motion-layer"
      tabIndex={0}
      style={{
        position: "absolute",
        width: `${layer.width}px`,
        height: `${layer.height}px`,
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
        transformOrigin: "center center",
        translateZ: z,
        scale,
        opacity: layer.opacity,
        filter: "none",
        zIndex: hovered ? 999999 : zIndex,
        backgroundColor: layer.color,
        boxShadow: "none",
        borderRadius: `${layer.borderRadius}px`,
        border: "none",
        pointerEvents: "auto",
        willChange: "transform, opacity",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      whileHover={{
        translateY: -hover.elevation,
        boxShadow: `0 ${hover.elevation}px ${hover.elevation * 2}px rgba(0,0,0,0.25)`,
      }}
      whileTap={{ translateY: -5 }}
      transition={hover.transition}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        style={{
          boxSizing: "border-box",
          padding: `${settings.padding}px`,
          borderRadius: `${layer.borderRadius - 4}px`,
          pointerEvents: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={placeholderStyle}>{index + 1}</div>
      </div>
    </motion.div>
  );
}

export default function LayerStack() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const target = useMotionValue(0);
  const offset = useSpring(target, { stiffness: 100, damping: 30 });
  // The camera tilts a little with the scroll velocity
  const tilt = useTransform(
    useTransform(
      useSpring(useVelocity(offset), { stiffness: 100, damping: 30 }),
      [-1000, 0, 1000],
      [-5, 0, 5],
    ),
    (v) => settings.cameraTilt + v,
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target.set(target.get() + e.deltaY * unit * settings.scrollSensitivity);
    },
    [target],
  );

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  return (
    <div
      data-framer-component-type="Frame"
      style={{
        display: "block",
        flex: "0 0 auto",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        background: settings.background,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <div
        ref={sceneRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          perspective: `${settings.perspective}px`,
          perspectiveOrigin: "center center",
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
          pointerEvents: "auto",
        }}
      >
        <motion.div
          className="scene-container"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            rotateX: tilt,
            rotateY: settings.cameraRotation,
            willChange: "transform",
            WebkitTransformStyle: "preserve-3d",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: settings.layers }, (_, i) => (
            <Layer key={`layer-${i}`} index={i} offset={offset} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
