module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        main: {
          100: "#7A787E",
          200: "#514E57",
          300: "#36343B",
          400: "#232226",
          500: "#181818",
        },
        whitesmoke: "whitesmoke",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
