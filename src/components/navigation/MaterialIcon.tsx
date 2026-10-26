// The two Material icons the navigation uses (filled style, 24x24 viewBox).
const paths = {
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
};

export default function MaterialIcon({ name, color, onClick }: { name: keyof typeof paths; color: string; onClick?: () => void }) {
  return (
    <div style={{ display: "contents" }} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ userSelect: "none", width: "100%", height: "100%", display: "inline-block", fill: color, flexShrink: 0 }}
        focusable="false"
        viewBox="0 0 24 24"
        color={color}
      >
        <path d={paths[name]} />
      </svg>
    </div>
  );
}
