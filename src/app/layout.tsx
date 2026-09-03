import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "이가람 — Frontend Engineer",
    template: "%s | 이가람",
  },
  description:
    "UX를 데이터로 증명하는 5년 차 프론트엔드 엔지니어 이가람입니다. Next.js, TypeScript, 성능 최적화, GA4 데이터 분석을 전문으로 합니다.",
  keywords: ["프론트엔드", "포트폴리오", "Next.js", "TypeScript", "React", "성능 최적화"],
  authors: [{ name: "이가람", url: "https://garam.dev" }],
  creator: "이가람",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://garam.dev",
    title: "이가람 — Frontend Engineer",
    description: "UX를 데이터로 증명하는 5년 차 프론트엔드 엔지니어",
    siteName: "garam.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "이가람 — Frontend Engineer",
    description: "UX를 데이터로 증명하는 5년 차 프론트엔드 엔지니어",
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
      <head>
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
