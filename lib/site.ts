import { Github, Linkedin, Twitter, type LucideIcon } from "lucide-react";

export const CONTACT_EMAIL = "herimanitraolivier@gmail.com";

export const CV_PATH = "/RASOLOMANANA_Herimanitra_Olivier.pdf";

/** Labels live in messages/<locale>/common.json under `nav.<key>`. */
export const navItems = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "resume", href: "/resume" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

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
