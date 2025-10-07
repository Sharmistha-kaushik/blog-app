/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ enable dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2ff",
          100: "#fce7ff",
          200: "#f5c2ff",
          300: "#ec9bff",
          400: "#e066ff",
          500: "#d633ff",  // 💜 purple-pink accent
          600: "#b22bd6",
          700: "#7e1f9b",
          800: "#56136b",
          900: "#300b3d",
        },
        darkbg: "#0f172a", // dark navy background
        darkcard: "#1e293b", // dark card background
        chatgradient: {
          from: "#5b21b6",  // deep purple
          to: "#db2777",    // hot pink
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(216, 33, 133, 0.5)",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
