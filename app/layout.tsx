import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basementboys.org"),
  title: {
    default: "Basement Boys — Open Source for Fun",
    template: "%s — Basement Boys",
  },
  description:
    "Open-source tools, experiments, and reference projects from the Basement Boys dev group.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/bb-mark.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Basement Boys — Open Source for Fun",
    description:
      "Open-source tools, experiments, and reference projects worth reading, running, and remixing.",
    url: "https://basementboys.org/",
    siteName: "Basement Boys",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Basement Boys — open-source tools, experiments, and reference projects.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basement Boys — Open Source for Fun",
    description:
      "Open-source tools, experiments, and reference projects worth reading, running, and remixing.",
    images: [
      {
        url: "/og.png",
        alt: "Basement Boys — open-source tools, experiments, and reference projects.",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f05a24",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
