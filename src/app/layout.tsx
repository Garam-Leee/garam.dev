import "@/styles/globals.css";
import "@/styles/fonts.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { siteUrl, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: absoluteUrl("/") },
  title: {
    default: "Garam Lee — Product Frontend Engineer",
    template: "%s | Garam Lee",
  },
  description:
    "서비스 성장과 사용자 경험 개선을 함께 고민하는 Product Frontend Engineer 이가람의 포트폴리오입니다. React, Next.js, TypeScript 기반 프론트엔드 개발과 데이터 기반 서비스 개선, 성능 최적화 경험을 담고 있습니다.",
  keywords: [
    "Garam Lee",
    "이가람",
    "Product Frontend Engineer",
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
    title: "Garam Lee — Product Frontend Engineer",
    description:
      "React, Next.js, TypeScript 기반으로 서비스 성장과 사용자 경험 개선을 만들어가는 프론트엔드 엔지니어 포트폴리오.",
    siteName: "Garam Lee Portfolio",
  },
  twitter: {
    images: ["/og"],
    card: "summary_large_image",
    title: "Garam Lee — Product Frontend Engineer",
    description:
      "서비스 성장, 사용자 경험, 성능 최적화를 고민하는 프론트엔드 엔지니어 포트폴리오.",
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
