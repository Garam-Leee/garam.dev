import { profile } from "@/data/profile";

export const navLinks = [
  { label: "기술 사례", href: "#projects" },
  { label: "핵심 역량", href: "#about" },
  { label: "경력", href: "#experience" },
  { label: "글", href: profile.writingsUrl },
  { label: "연락", href: "#contact" },
  {
    label: "이력서",
    href: profile.resumeUrl,
    external: true,
    download: "garam-lee-product-frontend-engineer.pdf",
  },
];
