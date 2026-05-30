import { site, enabledSocials } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const socials = enabledSocials
    .map(([key, url]) => `- ${key}: ${url}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.tagline}

${site.description}

## Contact
- Email: ${site.email}
- Site: ${site.url}

## Links
${socials}

## Pages
- ${site.url}/#home — Hero / overview
- ${site.url}/#work — Selected brand work
- ${site.url}/#about — About / background
- ${site.url}/#contact — Get in touch
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
