module.exports = {
    style: {
      postOptions: {
        plugins: [require("tailwindcss")("./tailwind.config.js"), require("autoprefixer"), require("postcss-nested")],
      },
    },
  };
