/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        lg: '16px',
      },
      borderOpacity: {
        10: '0.1',
        20: '0.2',
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        muted: "rgb(var(--muted))",
        accent: "rgb(var(--accent))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-move": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(100px, 100px)" },
        },
      },
      animation: {
        "bounce-move": "bounce-move 5s infinite alternate",
        "bounce-slow": "bounce 3s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
