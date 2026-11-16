import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Lighter violet for dark backgrounds (the open mobile menu). */
  inverted?: boolean;
};

/**
 * The brand mark ("Trail"): an open O with a violet dot escaping from it.
 * Drawn on a 32×32 grid; the O uses currentColor so it follows the text color.
 * On mount the O draws itself, then the dots pop out (CSS only, so it runs
 * before hydration, and it is off under prefers-reduced-motion).
 */
export default function Logo({ className, inverted = false }: LogoProps) {
  const dot = cn(
    "animate-logo-pop transition-colors duration-300 [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none",
    inverted ? "fill-violet-400" : "fill-violet-600"
  );

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <path
        d="M23.86 15.44A9 9 0 1 1 16.56 8.14"
        pathLength={1}
        strokeDasharray={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        className="animate-logo-draw motion-reduce:animate-none"
      />
      <circle
        cx={21.36}
        cy={10.64}
        r={1.2}
        fillOpacity={0.55}
        className={cn(dot, "[animation-delay:450ms]")}
      />
      <circle
        cx={24.9}
        cy={7.1}
        r={2.6}
        className={cn(dot, "[animation-delay:550ms]")}
      />
    </svg>
  );
}
