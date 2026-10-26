/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: `npm run build` writes a self-contained site to /out
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
