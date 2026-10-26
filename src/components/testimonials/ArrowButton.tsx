const paths = {
  right:
    "M 16 11 L 16 13 L 15 13 L 15 14 L 14 14 L 14 15 L 13 15 L 13 16 L 12 16 L 12 17 L 11 17 L 11 18 L 10 18 L 10 19 L 9 19 L 9 20 L 8 20 L 8 19 L 7 19 L 7 18 L 8 18 L 8 17 L 9 17 L 9 16 L 10 16 L 10 15 L 11 15 L 11 14 L 12 14 L 12 13 L 13 13 L 13 11 L 12 11 L 12 10 L 11 10 L 11 9 L 10 9 L 10 8 L 9 8 L 9 7 L 8 7 L 8 6 L 7 6 L 7 5 L 8 5 L 8 4 L 9 4 L 9 5 L 10 5 L 10 6 L 11 6 L 11 7 L 12 7 L 12 8 L 13 8 L 13 9 L 14 9 L 14 10 L 15 10 L 15 11 Z",
  left: "M11 13H12V14H13V15H14V16H15V17H16V18H17V19H16V20H15V19H14V18H13V17H12V16H11V15H10V14H9V13H8V11H9V10H10V9H11V8H12V7H13V6H14V5H15V4H16V5H17V6H16V7H15V8H14V9H13V10H12V11H11V13Z",
};

const variantClass = {
  right: { enabled: "framer-v-1ntdco4", disabled: "framer-v-1qy0pfv" },
  left: { enabled: "framer-v-uwa4ki", disabled: "framer-v-6ew1y2" },
};
const variantName = {
  right: { enabled: "Right", disabled: "Right Disabled" },
  left: { enabled: "Left", disabled: "Left Disabled" },
};
const iconClass = { right: "framer-1ypevum", left: "framer-1l5p0i4" };

type Props = { direction: "left" | "right"; disabled?: boolean; onClick?: () => void };

/** Small black pixel-arrow button used to page through testimonials. */
export default function ArrowButton({ direction, disabled = false, onClick }: Props) {
  const state = disabled ? "disabled" : "enabled";
  return (
    <button
      className={`framer-9Lmfn framer-1ntdco4 ${variantClass[direction][state]}`}
      data-framer-name={variantName[direction][state]}
      data-highlight="true"
      data-reset="button"
      onClick={disabled ? undefined : onClick}
      style={{ backgroundColor: "rgb(0, 0, 0)", height: "100%", width: "100%", opacity: disabled ? 0.4 : 1 }}
    >
      <div
        data-framer-component-type="SVG"
        data-framer-name={direction === "right" ? "Pixel/Regular/Angle Right" : "Pixel/Regular/Angle Left"}
        className={disabled && direction === "left" ? "framer-1nq10eq" : iconClass[direction]}
        style={{ imageRendering: "pixelated", flexShrink: 0 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", display: "block" }}>
          <path d={paths[direction]} fill="white" />
        </svg>
      </div>
    </button>
  );
}
