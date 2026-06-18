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
      <main className="glass-paint-stage relative overflow-hidden bg-[#f8fbff]">
        <div className="glass-paint-wash" />
        <div className="glass-paint-veil" />
        <div className="glass-paint-sheen" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.42)_100%)] backdrop-blur-[2px]" />

        <div className="relative">
          <Hero />
          <About />
          <TechStack />
          <Experience />
          <Projects />
        </div>
      </main>
    </LenisProvider>
  );
}
