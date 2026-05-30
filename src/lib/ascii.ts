import { site } from "./site";

export function logAscii(): void {
  if (typeof window === "undefined") return;
  console.log(
    `%c
   .---.
  / .-. \\     hi ◕‿◕
  | '-' |     ${site.name.toLowerCase()}
   \\___/      built with ◕‿◕ and electric blue
`,
    "color: #001AFF; font-family: ui-monospace, monospace; font-size: 12px;",
  );
}
