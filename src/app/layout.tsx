import "@/styles/globals.css";
import "@/styles/fonts.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { siteUrl, absoluteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: absoluteUrl("/") },
  title: {
    default: "Garam Lee — Frontend Engineer",
    template: "%s | Garam Lee",
  },
  description: profile.introduction,
  keywords: [
    "Garam Lee",
    "이가람",
    "Frontend Architecture",
    "Frontend Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Performance",
    "Data Driven UX",
    "Design System",
    "Portfolio",
  ],
  authors: [{ name: "Garam Lee", url: siteUrl.toString() }],
  creator: "Garam Lee",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl.toString(),
    images: [{ url: "/og", width: 1200, height: 630, alt: "Garam Lee Portfolio" }],
    title: "Garam Lee — Frontend Engineer",
    description: profile.introduction,
    siteName: "Garam Lee Portfolio",
  },
  twitter: {
    images: ["/og"],
    card: "summary_large_image",
    title: "Garam Lee — Frontend Engineer",
    description: profile.introduction,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
