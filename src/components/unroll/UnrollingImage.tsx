"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  DoubleSide,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  Vector4,
  WebGLRenderer,
} from "three";
import { fragmentShader, vertexShader } from "./shaders";

type Props = {
  src: string;
  /** Angle of the roll in degrees */
  angle?: number;
  rolls?: number;
  /** 0.1 - 1 */
  rollRadius?: number;
  /** Which point of the layer has to cross the bottom of the viewport to start unrolling */
  startAlign?: "top" | "center" | "bottom";
  duration?: number;
  /** Roll the image back up once it is below the viewport again */
  replay?: boolean;
};

const CAMERA_Z = 400;
const NEAR = 100;
const FAR = 1000;
const SEGMENTS = 80;
/** The canvas is larger than the layer so the roll can overflow its frame */
const OVERSIZE = 1.6;

const radiusUniform = (r: number) => (r <= 0.1 ? 0.01 : r >= 1 ? 0.13 : 0.01 + ((r - 0.1) / 0.9) * 0.12);
const fovFor = (width: number, height: number, distance: number) =>
  2 * Math.atan(width / (width / height) / (2 * distance)) * (180 / Math.PI);

/** Applies object-fit: cover to the texture through the `resolution` uniform. */
function coverResolution(material: ShaderMaterial, width: number, height: number) {
  const image = (material.uniforms.texture1.value as Texture | null)?.image as HTMLImageElement | undefined;
  if (!image) return material.uniforms.resolution.value.set(width, height, 1, 1);
  const frame = width / height;
  const picture = image.width / image.height;
  const [a, b] = frame > picture ? [1, picture / frame] : [frame / picture, 1];
  material.uniforms.resolution.value.set(width, height, a, b);
}

/**
 * An image that unrolls like a sheet of paper (WebGL) when it scrolls into view.
 * Port of the "Unrolling Image" code component.
 */
export default function UnrollingImage({
  src,
  angle = 17,
  rolls = 8,
  rollRadius = 0.5,
  startAlign = "top",
  duration = 1.7,
  replay = true,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gl = useRef<{
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    mesh: Mesh<PlaneGeometry, ShaderMaterial>;
  }>(null);
  const [inView, setInView] = useState(false);
  const [below, setBelow] = useState(false);
  const [textureReady, setTextureReady] = useState(false);
  const tween = useRef<gsap.core.Tween | null>(null);

  const render = () => {
    const g = gl.current;
    if (g) g.renderer.render(g.scene, g.camera);
  };

  // Scene setup + texture loading
  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;
    const width = frame.clientWidth || frame.offsetWidth || 1;
    const height = frame.clientHeight || frame.offsetHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = width * OVERSIZE;
    const ch = height * OVERSIZE;

    const scene = new Scene();
    const camera = new PerspectiveCamera(fovFor(cw, ch, CAMERA_Z), cw / ch, NEAR, FAR);
    camera.position.set(0, 0, CAMERA_Z);
    camera.lookAt(0, 0, 0);
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      // No WebGL available: leave the layer empty, like Framer's crash boundary does
      return;
    }
    renderer.setSize(Math.round(cw * dpr), Math.round(ch * dpr), false);
    renderer.setPixelRatio(1);
    renderer.sortObjects = false;
    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;

    const material = new ShaderMaterial({
      side: DoubleSide,
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        angle: { value: (angle * Math.PI) / 180 },
        rolls: { value: rolls },
        rollRadius: { value: radiusUniform(rollRadius) },
        texture1: { value: null },
        resolution: { value: new Vector4(width, height, 1, 1) },
      },
    });
    const mesh = new Mesh(new PlaneGeometry(1, 1, SEGMENTS, SEGMENTS), material);
    mesh.scale.set(width, height, width / 2);
    scene.add(mesh);
    gl.current = { renderer, scene, camera, mesh };
    render();

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const texture = new Texture(image);
      texture.needsUpdate = true;
      texture.minFilter = LinearFilter;
      material.uniforms.texture1.value = texture;
      coverResolution(material, frame.clientWidth || 1, frame.clientHeight || 1);
      setTextureReady(true);
      render();
    };
    image.onerror = () => console.error("Texture loading error");
    const loadTimer = setTimeout(() => (image.src = src), 0);

    let size = { width, height };
    const onResize = () => {
      const w = frame.clientWidth || frame.offsetWidth || 1;
      const h = frame.clientHeight || frame.offsetHeight || 1;
      if (Math.abs(w - size.width) <= 1 && Math.abs(h - size.height) <= 1) return;
      size = { width: w, height: h };
      const rw = w * OVERSIZE;
      const rh = h * OVERSIZE;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      camera.aspect = rw / rh;
      camera.fov = fovFor(rw, rh, CAMERA_Z);
      camera.updateProjectionMatrix();
      renderer.setSize(Math.round(rw * ratio), Math.round(rh * ratio), false);
      canvas.style.width = `${rw}px`;
      canvas.style.height = `${rh}px`;
      mesh.scale.set(w, h, w / 2);
      coverResolution(material, w, h);
      render();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(frame);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(loadTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      tween.current?.kill();
      renderer.dispose();
      scene.clear();
      gl.current = null;
    };
  }, [src, angle, rolls, rollRadius]);

  // Track whether the layer has entered the viewport
  useEffect(() => {
    let raf = 0;
    const check = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const edge = startAlign === "top" ? r.top : startAlign === "center" ? r.top + r.height / 2 : r.bottom;
      setInView(edge <= vh && r.bottom >= 0);
      setBelow(r.top > vh);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
    };
  }, [startAlign]);

  // Unroll when in view, reset when the layer is back below the fold
  useEffect(() => {
    const material = gl.current?.mesh.material;
    if (!textureReady || !material) return;
    const progress = material.uniforms.progress;
    tween.current?.kill();
    tween.current = null;
    if (below) {
      if (replay && progress.value > 0.01) {
        progress.value = 0;
        render();
      }
      return;
    }
    if (inView && progress.value < 0.99) {
      tween.current = gsap.to(progress, {
        value: 1,
        duration,
        ease: "power2.out",
        onUpdate: render,
        onComplete: () => {
          render();
          tween.current = null;
        },
      });
    }
    return () => {
      tween.current?.kill();
      tween.current = null;
    };
  }, [inView, below, replay, textureReady, duration]);

  const offset = ((OVERSIZE - 1) / 2) * 100;
  return (
    <div
      ref={frameRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        display: "block",
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ position: "absolute", width: 20, height: 20, opacity: 0, pointerEvents: "none" }} />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: `-${offset}%`, left: `-${offset}%`, display: "block" }}
      />
    </div>
  );
}
