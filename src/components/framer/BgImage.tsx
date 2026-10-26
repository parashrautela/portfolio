import type { CSSProperties } from "react";

type Props = {
  /** File name inside /public/images, e.g. "UM4G6C01dOAos8wYlsZbi0CtvTE.png" */
  src: string;
  /** Intrinsic size of the original image */
  width?: number;
  height?: number;
  /** Downscaled copies available as /images/<name>-<scale>.<ext> (longest side in px) */
  scales?: number[];
  sizes?: string;
  fit?: "cover" | "contain" | "fill";
  position?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  alt?: string;
  imgStyle?: CSSProperties;
};

const wrapperStyle: CSSProperties = {
  position: "absolute",
  borderRadius: "inherit",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/** Builds the same srcset Framer serves: one entry per downscaled copy plus the original. */
export function srcSetFor(src: string, width: number, height: number, scales: number[]) {
  const dot = src.lastIndexOf(".");
  const name = src.slice(0, dot);
  const ext = src.slice(dot + 1);
  const longest = Math.max(width, height);
  const entries = scales.map(
    (scale) => `/images/${name}-${scale}.${ext} ${Math.floor(width * Math.min(1, scale / longest))}w`,
  );
  entries.push(`/images/${src} ${width}w`);
  return entries.join(",");
}

/** Absolutely positioned background image that fills its parent (Framer "Fill" image). */
export default function BgImage({
  src,
  width,
  height,
  scales,
  sizes,
  fit = "cover",
  position = "center",
  loading,
  decoding = "async",
  alt = "",
  imgStyle,
}: Props) {
  const srcSet = width && height && scales?.length ? srcSetFor(src, width, height, scales) : undefined;
  return (
    <div style={wrapperStyle}>
      <img
        decoding={decoding}
        loading={loading}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={srcSet}
        src={`/images/${src}`}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          objectPosition: position,
          objectFit: fit,
          ...imgStyle,
        }}
      />
    </div>
  );
}
