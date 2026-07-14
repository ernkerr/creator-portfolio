// POST /api/admin/links — appends a link to src/lib/links-data.json by
// committing to GitHub via the contents API. Vercel's git integration then
// auto-deploys, so a submitted link is live on /links ~2 minutes later.
//
// Auth: the same `admin_session` passkey cookie that gates /admin. The proxy
// matcher doesn't cover /api/*, so the session is verified here directly.
//
// Env: GITHUB_TOKEN (contents read/write on ernkerr/creator-portfolio).
// LINKS_COMMIT_BRANCH overrides the target branch (used by tests; defaults
// to main).

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";
import type { BioLink, LinkCategory } from "@/lib/links";

const REPO = "ernkerr/creator-portfolio";
const FILE_PATH = "src/lib/links-data.json";
const CATEGORIES: LinkCategory[] = ["link", "affiliate", "portfolio"];
const MAX_FIELD_LENGTH = 300;

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function cleanField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(session))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured" },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = cleanField(body.title);
  const url = cleanField(body.url);
  const note = cleanField(body.note);
  const code = cleanField(body.code);
  const category = cleanField(body.category) as LinkCategory | undefined;

  if (!title || !url) {
    return NextResponse.json(
      { error: "Title and URL are required" },
      { status: 400 },
    );
  }
  if (!category || !CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }
  for (const [name, value] of Object.entries({ title, url, note, code })) {
    if (value && value.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { error: `${name} is too long (max ${MAX_FIELD_LENGTH} chars)` },
        { status: 400 },
      );
    }
  }
  if (!/^https?:\/\//.test(url) && !url.startsWith("/")) {
    return NextResponse.json(
      { error: "URL must start with https:// (or / for a page on this site)" },
      { status: 400 },
    );
  }

  const entry: BioLink = { title, url, category };
  if (note) entry.note = note;
  if (code) entry.code = code;

  const branch = process.env.LINKS_COMMIT_BRANCH || "main";
  const contentsUrl = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

  // Read the current file (content + blob sha for the optimistic-lock update).
  const current = await fetch(`${contentsUrl}?ref=${branch}`, {
    headers: githubHeaders(token),
    cache: "no-store",
  });
  if (!current.ok) {
    return NextResponse.json(
      { error: `GitHub read failed (${current.status})` },
      { status: 502 },
    );
  }
  const file = (await current.json()) as { content: string; sha: string };

  let entries: BioLink[];
  try {
    entries = JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
    if (!Array.isArray(entries)) throw new Error("not an array");
  } catch {
    return NextResponse.json(
      { error: "links-data.json on GitHub is not a valid JSON array" },
      { status: 502 },
    );
  }

  entries.push(entry);

  const put = await fetch(contentsUrl, {
    method: "PUT",
    headers: { ...githubHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Add ${category} link: ${title} (via /admin/links)`,
      content: Buffer.from(
        JSON.stringify(entries, null, 2) + "\n",
        "utf8",
      ).toString("base64"),
      sha: file.sha,
      branch,
    }),
  });
  if (!put.ok) {
    const detail = await put.text().catch(() => "");
    return NextResponse.json(
      { error: `GitHub commit failed (${put.status}): ${detail.slice(0, 200)}` },
      { status: 502 },
    );
  }
  const result = (await put.json()) as {
    commit?: { html_url?: string; sha?: string };
  };

  return NextResponse.json({
    ok: true,
    commitUrl: result.commit?.html_url ?? null,
  });
}
