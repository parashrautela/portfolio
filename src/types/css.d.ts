import "react";

// Framer's rich-text styling is driven by CSS custom properties (e.g. --framer-font-size),
// so allow them in inline style objects.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
