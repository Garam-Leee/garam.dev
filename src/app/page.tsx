import LenisProvider from "@/components/providers/LenisProvider";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Nav from "@/components/ui/Nav";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main className="portfolio-main">
          <Hero />
          <Projects />
          <About />
          <Experience />
          <TechStack />
      </main>
      <Footer />
    </LenisProvider>
  );
}
