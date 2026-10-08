import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Every token is a CSS variable defined in globals.css, so the whole
      // palette flips with [data-theme="ink"] without a second class set.
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        tt: "var(--tt)",
        lc: "var(--lc)",
      },
      borderColor: {
        DEFAULT: "var(--line)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        brand: ["var(--font-epilogue)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
