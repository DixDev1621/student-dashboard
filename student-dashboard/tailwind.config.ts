import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#07070b",
          surface: "#0e0e14",
          elevated: "#15151f",
          border: "#1f1f2c",
        },
        accent: {
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          pink: "#ec4899",
          emerald: "#34d399",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(139, 92, 246, 0.45)",
        "glow-cyan": "0 0 40px -10px rgba(34, 211, 238, 0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(139,92,246,0.15), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
