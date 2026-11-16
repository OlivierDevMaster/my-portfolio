import { Github, Linkedin, Twitter, type LucideIcon } from "lucide-react";

export const CONTACT_EMAIL = "herimanitraolivier@gmail.com";

export const CV_PATH = "/RASOLOMANANA_Herimanitra_Olivier.pdf";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Notes", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "GitHub",
    href: "https://github.com/RasolomananaOlivier",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rasolomanana-herimanitra-olivier",
    icon: Linkedin,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/OlivierFullDev",
    icon: Twitter,
  },
];
