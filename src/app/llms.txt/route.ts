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
- ${site.url}/ — Home: hero, selected brand work, about, and contact
- ${site.url}/tools — Creator workflow tools (waitlist)
- ${site.url}/links — Links: tools, picks, and socials
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
