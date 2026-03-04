import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Inter", "Arial"] },
      boxShadow: { luxe: "0 10px 30px rgba(0,0,0,.12)" }
    }
  },
  plugins: []
} satisfies Config;