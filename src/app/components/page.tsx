import type { Metadata } from "next";
import "@/styles/component-gallery.css";
import Nav from "@/components/ui/Nav";
import ComponentGallery from "@/components/ui/ComponentGallery";

export const metadata: Metadata = {
  title: "Components",
  description: "garam.dev에서 사용하는 UI 컴포넌트 미리보기",
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  return <>
    <Nav />
    <ComponentGallery />
  </>;
}
