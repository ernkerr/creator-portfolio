export const tokens = {
  color: {
    bg: "#F2EEE1",
    bgAlt: "#EDEADF",
    bgPaper: "#FFFFFF",
    fg: "#2E2E2E",
    fgSoft: "#555555",
    border: "#E0DCCF",
    accent: "#001AFF",
    accentSoft: "#3B4DFF",
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
