import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Garam Lee — Product Engineer",
    template: "%s | Garam Lee",
  },
  description:
    "사용자 경험과 비즈니스 가치를 함께 고민하는 Product Engineer 이가람의 포트폴리오입니다. 프론트엔드 개발, 데이터 기반 서비스 개선, 성능 최적화 경험을 담고 있습니다.",
  keywords: [
    "Garam Lee",
    "이가람",
    "Product Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Performance",
    "Data Driven",
    "Portfolio",
  ],
  authors: [{ name: "Garam Lee", url: "https://garam.dev" }],
  creator: "Garam Lee",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://garam.dev",
    title: "Garam Lee — Product Engineer",
    description:
      "데이터 기반 의사결정과 사용자 경험 개선을 통해 서비스 성장을 만드는 프론트엔드 개발자 포트폴리오.",
    siteName: "garam.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garam Lee — Product Engineer",
    description:
      "서비스 성장과 사용자 경험을 고민하는 프론트엔드 개발자 포트폴리오.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f0ff",
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}