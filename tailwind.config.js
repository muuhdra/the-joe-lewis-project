/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // optionnel: si tu utilises des CSS vars pour le thème
        ink: "var(--ink)",
        text: "var(--text)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        chip: "var(--chip)",
        border: "var(--border)",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0,0,0,.15)",
      },
    },
  },
  plugins: [],
}