"use client";

import { profile } from "@/lib/portfolio";
import { Mail, Link2, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-transparent px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-[#e5e8eb] pt-12 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-[15px] font-bold tracking-[-0.02em] text-[#191f28]">
              {profile.name}
            </p>
            <p className="mt-1 text-[13px] text-[#6b7684]">
              {profile.role} · {profile.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e8eb] bg-white text-[#6b7684] transition hover:border-[#3182f6] hover:bg-[#3182f6] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
              aria-label="Email"
            >
              <Mail size={18} strokeWidth={2} />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e8eb] bg-white text-[#6b7684] transition hover:border-[#3182f6] hover:bg-[#3182f6] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
              aria-label="GitHub"
              title="GitHub"
            >
              <ExternalLink size={18} strokeWidth={2} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e8eb] bg-white text-[#6b7684] transition hover:border-[#3182f6] hover:bg-[#3182f6] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#3182f6]/20"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Link2 size={18} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[12px] text-[#8b95a1]">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
