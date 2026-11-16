import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  /** Shows a "01"-style number in the first column when set. */
  index?: number;
};

export default function ProjectRow({ project, index }: ProjectRowProps) {
  const numbered = index !== undefined;
  const rowClass =
    "group -mx-5 grid grid-cols-12 items-baseline gap-x-4 gap-y-3 px-5 py-8 transition-colors md:-mx-10 md:gap-y-4 md:px-10 md:py-10";

  const content = (
    <>
      {numbered && (
        <span className="col-span-2 pt-2 font-mono text-xs text-gray-500 md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div
        className={
          numbered ? "col-span-10 md:col-span-3" : "col-span-12 md:col-span-4"
        }
      >
        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-gray-500">
          {project.year ? `${project.year} · ${project.tag}` : project.tag}
        </div>
        <h3 className="font-inter-tight text-3xl font-light transition-colors group-hover:text-violet-600 lg:text-4xl">
          {project.name}
        </h3>
      </div>
      <p className="col-span-12 text-sm leading-relaxed text-gray-600 md:col-span-5 lg:text-base">
        {project.description}
      </p>
      <div className="col-span-8 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500 md:col-span-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-gray-200 px-2 py-0.5"
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="col-span-4 justify-self-end whitespace-nowrap font-mono text-[11px] uppercase tracking-wider md:col-span-1">
        {project.url ? (
          <span className="inline-flex items-center gap-1 text-neutral-950 transition-colors group-hover:text-violet-600">
            {project.linkLabel ?? "Visit"}
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : (
          <span className="text-gray-500">Private</span>
        )}
      </span>
    </>
  );

  if (!project.url) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`${rowClass} hover:bg-gray-50`}
    >
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
