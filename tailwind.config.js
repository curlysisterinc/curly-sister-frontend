module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
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
          150: "#8A8077",
          200: "#72687B",
          250: "#E2E0E4",
          300: "#8E8695",
          400: "#443C4D",
          500: "#E1E6EB",
          600: "#EEEDEF",
          700: "#A49DAA",
        },
        orange: {
          50: "rgba(255, 133, 0, 0.1)",
          100: "rgba(255, 133, 0, 0.25)",
          150: "rgba(254, 247, 239, 1)",
          200: "rgba(255, 133, 0, 1)",
          300: "rgba(255, 133, 0, 0.03)",
        },
        black: {
          100: "rgba(0, 0, 0, 0.6)",
        },
      },
      height: {
        36: "36px",
        46: "46px",
      },
      width: {
        36: "36px",
        196: "196px",
      },
      fontFamily: {
        GTSuperTextBlack: "'GTSuperTextBlack', serif",
        BeatriceSemiBold: "'BeatriceSemiBold', serif",
        BeatriceSemiBoldItalic: "'BeatriceSemiBoldItalic', serif",
        BeatriceMediumItalic: "'BeatriceMediumItalic', serif",
        BeatriceRegular: "'BeatriceRegular', serif",
        BeatriceRegularItalic: "'BeatriceRegularItalic', serif",
        BeatriceMedium: "'BeatriceMedium', serif",
      },
      fontSize: {
        22: "1.375rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
