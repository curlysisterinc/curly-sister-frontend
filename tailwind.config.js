/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"],
    purge: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
    ],
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
          350: "#443C4D",
          400: "#443C4D",
          450: "rgba(68, 60, 77, 0.5)",
          500: "#E1E6EB",
          550: "rgba(89, 11, 169, 0.05)",
          600: "#EEEDEF",
          650: "rgba(89, 11, 169, 0.25)",
          // 650: "#F7F7F8",
          700: "#A49DAA",
          800: "#D5D2D7",
        },
        orange: {
          50: "rgba(255, 133, 0, 0.1)",
          100: "rgba(255, 133, 0, 0.25)",
          150: "rgba(254, 247, 239, 1)",
          200: "rgba(255, 133, 0, 1)",
          250: "rgba(255, 133, 0, 0.05)",
          300: "rgba(255, 133, 0, 0.03)",
          350: "rgba(255, 133, 0, 0.15)",
        },
        black: {
          50: "rgba(0, 0, 0, 0.2)",
          100: "rgba(0, 0, 0, 0.6)",
          "modal": "rgba(68, 60, 77, 0.65)"
        },
        alert: {
          success:"#47B881",
          error: "#EE6D52",
          warning: "#FF8500",
          info:"#590BA9"
        }
      },
      height: {
        69: "69px",
        36: "36px",
        46: "46px",
        86: "86px",
        120: "120px",
        316: "316px",
        500: "500px",
        150: "150px",
        520: "520px",
      },
      width: {
        36: "36px",
        55: "55%",
        86: "86px",
        120: "120px",
        140: "140px",
        196: "196px",
        220:"220px",
        300: "300px",
        358: "358px",
        489: "489px",
        480: "480px",
        543: "543px",
      },
      spacing: {
        69: "69px",
        500: "500px",
        600: "600px",
        "tablet":"768px"
      },
      minWidth: {
        30: "30%",
      },
      maxWidth: {
        480: "480px",
        280: "280px",
        375: "375px",
        640: "640px",
        1000: "1000px"
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
      screens: {
"xs": '480px'
      },
      backgroundImage: {
        "service-image": "url('/src/assets/images/service-image.png')",
        "purple-pattern": "url('/src/assets/images/bg-one.png')",
      },
      boxShadow: {
        s01:"0px 2px 4px -2px rgba(68, 60, 77, 0.12), 0px 4px 4px -2px rgba(68, 60, 77, 0.08)",
        s07: "0px 8px 22px -6px rgba(68, 60, 77, 0.12), 0px 14px 64px -4px rgba(68, 60, 77, 0.12)",
        sinput:"0 0 0 2px #590BA9"
      }
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
