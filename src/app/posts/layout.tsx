import Nav from "@/components/ui/Nav";
import LenisProvider from "@/components/providers/LenisProvider";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Nav />
      <main className="pt-[60px]">{children}</main>
    </LenisProvider>
  );
}
