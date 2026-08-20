export const themeConfig = {
  defaultTheme: "system",
  storageKey: "kotnala-theme",
  containers: {
    xs: "32rem",
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "72rem",
    "2xl": "80rem",
  },
  motion: {
    fast: 160,
    normal: 240,
    slow: 360,
  },
  zIndex: {
    skipLink: 60,
    header: 40,
    overlay: 80,
    modal: 100,
  },
} as const;
