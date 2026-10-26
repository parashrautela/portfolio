"use client";

import { useEffect, useRef } from "react";

type Props = {
  scrollSpeed?: number;
  dragSpeed?: number;
  /** "Snappy" setting: how quickly the canvas catches up with the pointer (0-1) */
  ease?: number;
  parallax?: { enabled: boolean; general: number; child: number };
  enableDrag?: boolean;
};

type Slot = {
  x: number;
  y: number;
  width: number;
  height: number;
  extraX: number;
  extraY: number;
  ease: number;
};
type Item = {
  element: HTMLElement;
  clones: HTMLElement[];
  slots: Slot[];
  lastActive: number;
  original: Record<"position" | "left" | "top" | "width" | "height" | "margin" | "transform", string>;
};

const map = (v: number, a: number, b: number, c: number, d: number) => (b === a ? c : c + ((v - a) / (b - a)) * (d - c));
const speedFactor = (v: number) => map(Math.max(0.1, Math.min(1, v)), 0.1, 1, 0.1, 2);
const easeFactor = (v: number) => map(Math.max(0, Math.min(1, v)), 0, 1, 0.01, 0.2);

/**
 * Turns its siblings (inside the shared parent) into an endlessly wrapping canvas that can be
 * scrolled with the wheel or dragged. Each item is laid out on a 2x2 tile and cloned so the grid
 * repeats; the real element always sits at the copy closest to the pointer so hover still works.
 * Port of the "Infinite Canvas" code component used on the Framer site.
 */
export default function InfiniteCanvas({
  scrollSpeed = 0.4,
  dragSpeed = 0.5,
  ease = 0.3,
  parallax = { enabled: true, general: 1, child: 1 },
  enableDrag = true,
}: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    const canvas = anchor?.parentElement?.parentElement;
    if (!anchor || !canvas) return;

    const wheelFactor = speedFactor(scrollSpeed);
    const dragFactor = speedFactor(dragSpeed);
    const scroll = {
      ease: easeFactor(ease),
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      last: { x: 0, y: 0 },
      delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } },
    };
    const mouse = { x: { t: 0.5, c: 0.5 }, y: { t: 0.5, c: 0.5 }, press: { t: 0, c: 0 } };
    const drag = { active: false, startX: 0, startY: 0, scrollX: 0, scrollY: 0 };
    const size = { width: 0, height: 0, tileW: 0, tileH: 0 };
    let viewportW = window.innerWidth;
    let viewportH = window.innerHeight;
    let items: Item[] = [];

    const setup = () => {
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      const box = canvas.getBoundingClientRect();
      const { width, height } = box;
      const children = Array.from(canvas.children).filter((c) => c !== anchor.parentElement) as HTMLElement[];
      const offsetsX = [0, width];
      const offsetsY = [0, height];
      items = children.map((element) => {
        const r = element.getBoundingClientRect();
        const left = r.left - box.left;
        const top = r.top - box.top;
        const itemEase = Math.random() * 0.5 + 0.5;
        const s = element.style;
        const original = {
          position: s.position,
          left: s.left,
          top: s.top,
          width: s.width,
          height: s.height,
          margin: s.margin,
          transform: s.transform,
        };
        const place = (el: HTMLElement) => {
          el.style.position = "absolute";
          el.style.left = "0";
          el.style.top = "0";
          el.style.width = `${r.width}px`;
          el.style.height = `${r.height}px`;
          el.style.margin = "0";
          el.style.willChange = "transform";
        };
        const clones: HTMLElement[] = [];
        for (let i = 0; i < 3; i++) {
          const clone = element.cloneNode(true) as HTMLElement;
          canvas.appendChild(clone);
          place(clone);
          clones.push(clone);
        }
        place(element);
        const slots: Slot[] = [];
        for (const ox of offsetsX)
          for (const oy of offsetsY)
            slots.push({ x: left + ox, y: top + oy, width: r.width, height: r.height, extraX: 0, extraY: 0, ease: itemEase });
        return { element, clones, slots, lastActive: -1, original };
      });
      scroll.current = { x: 0, y: 0 };
      scroll.target = { x: 0, y: 0 };
      scroll.last = { x: 0, y: 0 };
      Object.assign(size, { width, height, tileW: width * 2, tileH: height * 2 });
    };

    const teardown = () => {
      for (const item of items) {
        item.clones.forEach((c) => c.remove());
        const el = item.element;
        Object.assign(el.style, item.original);
        el.style.willChange = "";
        el.style.opacity = "";
        el.style.pointerEvents = "";
        const child = el.firstElementChild as HTMLElement | null;
        if (child) child.style.transform = "";
      }
      items = [];
    };

    const tick = () => {
      scroll.current.x += (scroll.target.x - scroll.current.x) * scroll.ease;
      scroll.current.y += (scroll.target.y - scroll.current.y) * scroll.ease;
      scroll.delta.x.t = scroll.current.x - scroll.last.x;
      scroll.delta.y.t = scroll.current.y - scroll.last.y;
      scroll.delta.x.c += (scroll.delta.x.t - scroll.delta.x.c) * 0.04;
      scroll.delta.y.c += (scroll.delta.y.t - scroll.delta.y.c) * 0.04;
      mouse.x.c += (mouse.x.t - mouse.x.c) * 0.04;
      mouse.y.c += (mouse.y.t - mouse.y.c) * 0.04;
      mouse.press.c += (mouse.press.t - mouse.press.c) * 0.04;

      const dirX = scroll.current.x > scroll.last.x ? "right" : "left";
      const dirY = scroll.current.y > scroll.last.y ? "down" : "up";
      const centerX = viewportW / 2;
      const centerY = viewportH / 2;
      const pointerX = mouse.x.t * viewportW;
      const pointerY = mouse.y.t * viewportH;
      const box = canvas.getBoundingClientRect();
      const localX = pointerX - box.left;
      const localY = pointerY - box.top;
      const general = parallax.enabled ? (parallax.general ?? 1) : 0;

      for (const item of items) {
        const placed = item.slots.map((slot) => {
          const px = 5 * scroll.delta.x.c * slot.ease + (mouse.x.c - 0.5) * slot.width * 0.6 * general;
          const py = 5 * scroll.delta.y.c * slot.ease + (mouse.y.c - 0.5) * slot.height * 0.6 * general;
          const x0 = slot.x + scroll.current.x + slot.extraX + px;
          const y0 = slot.y + scroll.current.y + slot.extraY + py;
          // wrap around once a copy leaves the tile
          if (dirX === "right" && x0 > size.width) slot.extraX -= size.tileW;
          if (dirX === "left" && x0 + slot.width < 0) slot.extraX += size.tileW;
          if (dirY === "down" && y0 > size.height) slot.extraY -= size.tileH;
          if (dirY === "up" && y0 + slot.height < 0) slot.extraY += size.tileH;
          const x = slot.x + scroll.current.x + slot.extraX + px;
          const y = slot.y + scroll.current.y + slot.extraY + py;
          const sx = x + box.left;
          const sy = y + box.top;
          const cx = sx + slot.width / 2;
          const cy = sy + slot.height / 2;
          const margin = 1000;
          return {
            slot,
            x,
            y,
            distToCenter: (cx - centerX) ** 2 + (cy - centerY) ** 2,
            distToMouse: (cx - pointerX) ** 2 + (cy - pointerY) ** 2,
            visible: sx >= -slot.width - margin && sx <= viewportW + margin && sy >= -slot.height - margin && sy <= viewportH + margin,
          };
        });

        // the real (interactive) element goes to the copy under the pointer, else the one nearest the centre
        let active = -1;
        let best = Infinity;
        placed.forEach((p, i) => {
          const inside = localX >= p.x && localX <= p.x + p.slot.width && localY >= p.y && localY <= p.y + p.slot.height;
          if (inside && p.distToMouse < best) {
            best = p.distToMouse;
            active = i;
          }
        });
        if (active === -1 && item.lastActive !== -1 && placed[item.lastActive]?.visible) active = item.lastActive;
        if (active === -1) {
          let nearest = Infinity;
          placed.forEach((p, i) => {
            if (p.distToCenter < nearest) {
              nearest = p.distToCenter;
              active = i;
            }
          });
        }
        item.lastActive = active;

        const spare = [...item.clones];
        placed.forEach((p, i) => {
          const isActive = i === active;
          const el = isActive ? item.element : spare.pop()!;
          el.style.transform = `translate(${p.x}px, ${p.y}px)`;
          el.style.opacity = p.visible ? "1" : "0";
          el.style.pointerEvents = p.visible ? "auto" : "none";
          const childAmount = parallax.enabled && isActive ? (parallax.child ?? 1) : 0;
          const inner = el.firstElementChild as HTMLElement | null;
          if (!inner) return;
          if (childAmount === 0) {
            inner.style.transform = "none";
          } else {
            const tx = (0.5 - mouse.x.c) * p.slot.ease * 20 * general * childAmount;
            const ty = (0.5 - mouse.y.c) * p.slot.ease * 20 * general * childAmount;
            inner.style.transform = `translate(${tx}%, ${ty}%)`;
          }
        });
      }
      scroll.last.x = scroll.current.x;
      scroll.last.y = scroll.current.y;
    };

    setup();
    let resizeTimer: number | null = null;
    const onResizeObserved = () => {
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        teardown();
        setup();
        resizeTimer = null;
      }, 100);
    };
    const onWindowResize = () => {
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
    };
    const observer = new ResizeObserver(onResizeObserved);
    observer.observe(canvas);
    window.addEventListener("resize", onWindowResize);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scroll.target.x -= e.deltaX * wheelFactor;
      scroll.target.y -= e.deltaY * wheelFactor;
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      drag.active = true;
      document.documentElement.classList.add("dragging");
      mouse.press.t = 1;
      Object.assign(drag, { startX: e.clientX, startY: e.clientY, scrollX: scroll.target.x, scrollY: scroll.target.y });
    };
    const onMouseUp = () => {
      drag.active = false;
      document.documentElement.classList.remove("dragging");
      mouse.press.t = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x.t = e.clientX / viewportW;
      mouse.y.t = e.clientY / viewportH;
      if (drag.active) {
        scroll.target.x = drag.scrollX + (e.clientX - drag.startX) * dragFactor;
        scroll.target.y = drag.scrollY + (e.clientY - drag.startY) * dragFactor;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      drag.active = true;
      mouse.press.t = 1;
      Object.assign(drag, { startX: t.clientX, startY: t.clientY, scrollX: scroll.target.x, scrollY: scroll.target.y });
    };
    const onTouchEnd = () => {
      drag.active = false;
      mouse.press.t = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1 || !drag.active) return;
      e.preventDefault();
      const t = e.touches[0];
      mouse.x.t = t.clientX / viewportW;
      mouse.y.t = t.clientY / viewportH;
      scroll.target.x = drag.scrollX + (t.clientX - drag.startX) * dragFactor;
      scroll.target.y = drag.scrollY + (t.clientY - drag.startY) * dragFactor;
    };
    if (enableDrag) {
      canvas.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    let frame = requestAnimationFrame(function loop() {
      tick();
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      teardown();
    };
  }, [scrollSpeed, dragSpeed, ease, enableDrag, parallax.enabled, parallax.general, parallax.child]);

  return (
    <div
      ref={anchorRef}
      style={{
        height: "0px",
        width: "0px",
        position: "relative",
        overflow: "visible",
        backgroundColor: "transparent",
        transform: "translateZ(0)",
        transformStyle: "flat",
      }}
    />
  );
}
