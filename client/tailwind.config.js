/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Masari design language (project paper §9)
        brand: {
          DEFAULT: "#1768ad", // primary blue
          dark: "#0d4f93",
          soft: "#eaf7fc",
        },
        success: { DEFAULT: "#16a34a", soft: "#dcfce7" },
        urgent: { DEFAULT: "#e62626", soft: "#fee2e2" },
        warn: { DEFAULT: "#f59e0b", soft: "#ffedd5" },
      },
      fontFamily: {
        sans: ["Tajawal", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(28, 92, 135, 0.08)",
      },
    },
  },
  plugins: [],
};
