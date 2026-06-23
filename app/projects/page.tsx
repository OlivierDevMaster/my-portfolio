import Navbar from "@/components/Navbar";
import ProjectsFilter from "./projects-filter";

const projects = [
  {
    projectPic: "/Fedhubs.jpg",
    title: "Fedhubs",
    category: "Mobile Applications",
    description:
      "A restaurant discovery and booking product that helps people move from search to reservation without friction.",
    techStack: ["Flutter", "React js", "Laravel", "MySQL"],
    codeAvailable: false,
    previewUrl: "https://app.fedhubs.com",
  },
  {
    projectPic: "/Fedhubs_pro.png",
    title: "Fedhubs Pro",
    category: "Internal Tools",
    description:
      "An operations workspace for restaurants to manage menus, bookings, and customer loyalty from one place.",
    techStack: ["Flutter", "Laravel", "MySQL"],
    codeAvailable: false,
    previewUrl: "https://pro.fedhubs.com",
  },
  {
    projectPic: "/hero.png",
    title: "Prompt AI",
    category: "AI Projects",
    description:
      "A prompt discovery product for reusable writing, design, and development workflows.",
    techStack: ["React", "Node", "MongoDB"],
    codeAvailable: true,
    previewUrl: null,
  },
  {
    projectPic: "/hero.png",
    title: "DevChronicles",
    category: "Open Source",
    description:
      "A technical writing space for product engineering notes and implementation decisions.",
    techStack: ["Under Development"],
    codeAvailable: true,
    previewUrl: null,
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pt-32 md:px-10">
        <section className="container mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            Projects
          </p>
          <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] text-gray-950 md:text-7xl">
            Product work shaped around real constraints.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-500 md:text-xl">
            A focused collection of builds showing how I connect product
            context, engineering decisions, and the path to release.
          </p>
        </section>

        <section className="container mx-auto pt-16">
          <ProjectsFilter projects={projects} />
        </section>
      </main>
    </div>
  );
}
