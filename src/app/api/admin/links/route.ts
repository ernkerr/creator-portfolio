// POST/DELETE /api/admin/links — adds or removes a link in
// src/lib/links-data.json by committing to GitHub via the contents API.
// Vercel's git integration then auto-deploys, so a change is live on /links
// ~2 minutes later.
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

function errorJson(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// Auth + env + body preamble shared by POST and DELETE. Returns either the
// parsed context or a ready-to-return error response.
async function preflight(req: NextRequest): Promise<
  | { token: string; body: Record<string, unknown> }
  | { error: NextResponse }
> {
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(session))) {
    return { error: errorJson("Unauthorized", 401) };
  }
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { error: errorJson("GITHUB_TOKEN is not configured", 500) };
  }
  try {
    return { token, body: await req.json() };
  } catch {
    return { error: errorJson("Invalid JSON body", 400) };
  }
}

async function readLinksFile(
  token: string,
  branch: string,
): Promise<{ entries: BioLink[]; sha: string } | { error: NextResponse }> {
  const contentsUrl = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
  const res = await fetch(`${contentsUrl}?ref=${branch}`, {
    headers: githubHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    return { error: errorJson(`GitHub read failed (${res.status})`, 502) };
  }
  const file = (await res.json()) as { content: string; sha: string };
  try {
    const entries = JSON.parse(
      Buffer.from(file.content, "base64").toString("utf8"),
    );
    if (!Array.isArray(entries)) throw new Error("not an array");
    return { entries, sha: file.sha };
  } catch {
    return {
      error: errorJson("links-data.json on GitHub is not a valid JSON array", 502),
    };
  }
}

async function commitLinksFile(
  token: string,
  branch: string,
  entries: BioLink[],
  sha: string,
  message: string,
): Promise<NextResponse> {
  const contentsUrl = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
  const put = await fetch(contentsUrl, {
    method: "PUT",
    headers: { ...githubHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(
        JSON.stringify(entries, null, 2) + "\n",
        "utf8",
      ).toString("base64"),
      sha,
      branch,
    }),
  });
  if (!put.ok) {
    const detail = await put.text().catch(() => "");
    return errorJson(
      `GitHub commit failed (${put.status}): ${detail.slice(0, 200)}`,
      502,
    );
  }
  const result = (await put.json()) as {
    commit?: { html_url?: string };
  };
  return NextResponse.json({
    ok: true,
    commitUrl: result.commit?.html_url ?? null,
  });
}

export async function POST(req: NextRequest) {
  const pre = await preflight(req);
  if ("error" in pre) return pre.error;
  const { token, body } = pre;

  const title = cleanField(body.title);
  const url = cleanField(body.url);
  const note = cleanField(body.note);
  const code = cleanField(body.code);
  const category = cleanField(body.category) as LinkCategory | undefined;

  if (!title || !url) {
    return errorJson("Title and URL are required", 400);
  }
  if (!category || !CATEGORIES.includes(category)) {
    return errorJson("Invalid section", 400);
  }
  for (const [name, value] of Object.entries({ title, url, note, code })) {
    if (value && value.length > MAX_FIELD_LENGTH) {
      return errorJson(`${name} is too long (max ${MAX_FIELD_LENGTH} chars)`, 400);
    }
  }
  if (!/^https?:\/\//.test(url) && !url.startsWith("/")) {
    return errorJson(
      "URL must start with https:// (or / for a page on this site)",
      400,
    );
  }

  const entry: BioLink = { title, url, category };
  if (note) entry.note = note;
  if (code) entry.code = code;

  const branch = process.env.LINKS_COMMIT_BRANCH || "main";
  const file = await readLinksFile(token, branch);
  if ("error" in file) return file.error;

  file.entries.push(entry);
  return commitLinksFile(
    token,
    branch,
    file.entries,
    file.sha,
    `Add ${category} link: ${title} (via /admin/links)`,
  );
}

export async function DELETE(req: NextRequest) {
  const pre = await preflight(req);
  if ("error" in pre) return pre.error;
  const { token, body } = pre;

  const title = cleanField(body.title);
  const url = cleanField(body.url);
  if (!title || !url) {
    return errorJson("Title and URL are required", 400);
  }

  const branch = process.env.LINKS_COMMIT_BRANCH || "main";
  const file = await readLinksFile(token, branch);
  if ("error" in file) return file.error;

  const idx = file.entries.findIndex(
    (e) => e.title === title && e.url === url,
  );
  if (idx === -1) {
    return errorJson("Link not found (it may already be deleted)", 404);
  }
  file.entries.splice(idx, 1);

  return commitLinksFile(
    token,
    branch,
    file.entries,
    file.sha,
    `Remove link: ${title} (via /admin/links)`,
  );
}
