import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs sm:flex-row">
        <p className="text-fg-soft font-mono tracking-wider uppercase">
          © {year} {site.name}
        </p>
        <p className="text-fg-soft font-mono tracking-wider uppercase">
          made with{" "}
          <span aria-label="content content cat" className="text-accent">
            ◕‿◕
          </span>
        </p>
      </div>
    </footer>
  );
}
