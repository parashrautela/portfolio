import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import CursorHost from "@/components/cursor/CursorHost";
import "@/styles/fonts.css";
import "@/styles/framer-base.css";
import "./globals.css";

const title = "Artist by design ";
const description = "Boilerpate designer ";

export const metadata: Metadata = {
  metadataBase: new URL("https://parashux.in"),
  title,
  description,
  icons: {
    icon: [
      { url: "/images/2JBoKvVS7xd1UcOSej73mBb6vE.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/6pvkGAu9dmalfR7aY8WUPravZU.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/images/6V1U39kYdiLH0XO4mqU8lj8rxyU.png",
  },
  openGraph: {
    type: "website",
    title,
    description,
    images: "/images/Oe015qMeMs2AODuODOLUAQgX66Y.png",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: "/images/Oe015qMeMs2AODuODOLUAQgX66Y.png",
  },
  robots: { "max-image-preview": "large" },
};

export const viewport: Viewport = { width: "device-width" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div id="main">{children}</div>
        <CursorHost />
      </body>
    </html>
  );
}
