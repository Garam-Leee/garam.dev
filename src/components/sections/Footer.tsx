import { profile } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="contact-shell">
      <div className="contact-panel">
        <p className="font-mono text-ds-14 tracking-[0.15em] text-white/50">LET'S TALK</p>
        <p className="mt-5 break-keep text-ds-32 font-medium tracking-[-0.04em] sm:text-ds-36">함께 풀어갈 문제가 있다면.</p>
        <a href={"mailto:" + profile.email} className="mt-5 inline-flex max-w-full items-center gap-3 break-all text-ds-18 text-white/75 hover:text-white sm:text-ds-24">{profile.email}<ArrowUpRight size={20} aria-hidden="true" /></a>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6 text-ds-14 text-white/50">
          <p>© {new Date().getFullYear()} Garam Lee</p>
          <div className="flex gap-6">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub ↗</a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn ↗</a>
            <a href={profile.resumeUrl} className="hover:text-white">이력서 ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
