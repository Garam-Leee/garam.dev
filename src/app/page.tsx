import LenisProvider from "@/components/providers/LenisProvider";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Nav from "@/components/ui/Nav";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
      </main>
    </LenisProvider>
  );
}
