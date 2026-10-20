import Nav from "@/components/ui/Nav";
import LenisProvider from "@/components/providers/LenisProvider";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <LenisProvider><Nav />{children}</LenisProvider>;
}
