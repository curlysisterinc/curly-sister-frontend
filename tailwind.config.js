/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
          700: "#A49DAA",
          750: "#F7F7F8",
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
          modal: "rgba(68, 60, 77, 0.65)",
        },
        alert: {
          success: "#47B881",
          error: "#EE6D52",
          warning: "#FF8500",
          info: "#590BA9",
        },
      },
      height: {
        69: "69px",
        36: "36px",
        46: "46px",
        50: "50px",
        86: "86px",
        120: "120px",
        316: "316px",
        500: "500px",
        150: "150px",
        520: "520px",
        "90vh":"90vh"
      },
      width: {
        36: "36px",
        55: "55%",
        86: "86px",
        120: "120px",
        140: "140px",
        196: "196px",
        220: "220px",
        300: "300px",
        358: "358px",
        489: "489px",
        480: "480px",
        543: "543px",
        "95vw":"95vw"
      },
      spacing: {
        50: "50px",
        69: "69px",
        350: "350px",
        250: "250px",
        428:"428px",
        500: "500px",
        600: "600px",
        tablet: "768px",
      },
      maxHeight: {
        700: "700px",
      },
      minWidth: {
        30: "30%",
      },
      maxWidth: {
        480: "480px",
        250: "250px",
        280: "280px",
        358: "358px",
        375: "375px",
        640: "640px",
        1000: "1000px",
        1170: "1170px",
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
        xs: "480px",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
      },
      backgroundImage: {
        "service-image": "url('/src/assets/images/service-image.png')",
        "purple-pattern": "url('/src/assets/images/bg-one.png')",
      },
      boxShadow: {
        s01: "0px 2px 4px -2px rgba(68, 60, 77, 0.12), 0px 4px 4px -2px rgba(68, 60, 77, 0.08)",
        s07: "0px 8px 22px -6px rgba(68, 60, 77, 0.12), 0px 14px 64px -4px rgba(68, 60, 77, 0.12)",
        sinput: "0 0 0 2px #590BA9",
        s05: "0px 6px 14px -6px rgba(68, 60, 77, 0.12), 0px 10px 32px -4px rgba(68, 60, 77, 0.1)"
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
