export const tokens = {
  color: {
    bg: "#FFFFFF",
    bgAlt: "#FAFAF7",
    bgPaper: "#FFFFFF",
    fg: "#1A1A1A",
    fgSoft: "#555555",
    border: "#EAEAEA",
    accent: "#001AFF",
    accentSoft: "#3B4DFF",
    onAccent: "#FFFFFF",
  },
  radius: {
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  motion: {
    fast: "120ms",
    base: "200ms",
    slow: "400ms",
  },
} as const;

export type Tokens = typeof tokens;
