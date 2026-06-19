import { profile } from "@/data/profile";

export const navLinks = [
  { label: "홈", href: "#hero" },
  { label: "소개", href: "#about" },
  { label: "경력", href: "#experience" },
  { label: "프로젝트", href: "#projects" },
  { label: "Resume", href: profile.resumeUrl, external: true },
  { label: "GitHub", href: profile.githubUrl, external: true },
  { label: "LinkedIn", href: profile.linkedinUrl, external: true },
  { label: "기술 블로그", href: profile.writingsUrl },
];
