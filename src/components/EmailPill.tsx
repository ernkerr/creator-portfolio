import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  size?: "sm" | "lg";
  variant?: "default" | "inverse";
};

export function EmailPill({ className, size = "sm", variant = "default" }: Props) {
  const baseColors =
    variant === "inverse"
      ? "border-on-accent text-on-accent hover:bg-on-accent hover:text-accent"
      : "border-accent text-accent hover:bg-accent hover:text-on-accent";

  return (
    <a
      href={`mailto:${site.email}`}
      className={cn(
        "inline-flex items-center rounded-full border-2 font-mono tracking-wider uppercase transition",
        baseColors,
        size === "sm" ? "px-5 py-2 text-xs" : "px-8 py-4 text-base",
        className,
      )}
    >
      {site.email}
    </a>
  );
}
