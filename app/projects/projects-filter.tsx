"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/utils/types";

type ProjectWithCategory = Project & {
  category: string;
};

type ProjectsFilterProps = {
  projects: ProjectWithCategory[];
};

const projectImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
];

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            type="button"
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const card = (
            <article className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/10">
              <div
                aria-hidden="true"
                className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.24)), url('${
                    projectImages[index % projectImages.length]
                  }')`,
                }}
              />

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-950 text-xs text-white">
                    {project.category}
                  </Badge>
                  {project.techStack.slice(0, 2).map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-gray-100 text-xs text-gray-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <h2 className="mt-5 text-3xl font-black leading-none tracking-[-0.06em] text-gray-950">
                  {project.title}
                </h2>
                <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-950">
                    {project.previewUrl ? "Explore project" : "View details"}
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-medium tracking-wide text-gray-400">
                    Product build
                  </span>
                </div>
              </div>
            </article>
          );

          return project.previewUrl ? (
            <Link
              key={project.title}
              href={project.previewUrl}
              target="_blank"
              rel="noreferrer"
            >
              {card}
            </Link>
          ) : (
            <div key={project.title}>{card}</div>
          );
        })}
      </section>
    </>
  );
}
