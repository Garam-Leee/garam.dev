import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import LenisProvider from "@/components/providers/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Footer />
      </main>
    </LenisProvider>
  );
}
