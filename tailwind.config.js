module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'classs'
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#590BA9",
          200: "#140226",
        },
        gray: {
          50: "#FAF9FA",
          100: "#C6C2CA",
          200: "#72687B",
          300: "#8E8695",
          400: "#443C4D",
        },
        orange: {
          50: "rgba(255, 133, 0, 0.1)",
          100: "rgba(255, 133, 0, 0.25)",
          200: "rgba(255, 133, 0, 1)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
