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
    default: "Basement Boys — Definitely Have Opinions",
    template: "%s — Basement Boys",
  },
  description:
    "A public lab for small experiments, safe web-agent obstacle courses, and ideas worth testing before they get expensive.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Basement Boys — Definitely Have Opinions",
    description:
      "Small experiments, safe surfaces, and web-agent dogfooding.",
    url: "https://basementboys.org/",
    siteName: "Basement Boys",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Basement Boys — Definitely Have Opinions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basement Boys — Definitely Have Opinions",
    description:
      "Small experiments, safe surfaces, and web-agent dogfooding.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071127",
  colorScheme: "dark",
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
