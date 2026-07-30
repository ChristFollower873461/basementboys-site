import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basementboys.org"),
  title: {
    default: "Basement Boys — A Dev Group for Fun",
    template: "%s — Basement Boys",
  },
  description:
    "A loose dev group making weird little tools, internet experiments, and side projects for fun.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Basement Boys — A Dev Group for Fun",
    description:
      "Weird little tools, internet experiments, and side projects made for fun.",
    url: "https://basementboys.org/",
    siteName: "Basement Boys",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Basement Boys — A Dev Group for Fun",
    description:
      "Weird little tools, internet experiments, and side projects made for fun.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ecebe6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
