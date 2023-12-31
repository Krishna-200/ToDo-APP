/** @type {import('tailwindcss').Config} */
const colorSafeList = [];

const colors = ["todo", "inProgress", "toReview", "completed"];
const shades = ["primary", "secondary", "textPrimary", "textSecondary"];
colors.map((color) => {
  shades.map((shade) => {
    colorSafeList.push(`bg-${color}-${shade}`);
    colorSafeList.push(`text-${color}-${shade}`);
  });
});
export default {
  safelist: colorSafeList,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 1px 5px 1px rgb(0 0 0 / 0.1)",
      },
      colors: {
        todo: {
          primary: "#EBEEFC",
          secondary: "#D8E0FD",
          textPrimary: "#3659E2",
          textSecondary: "#3151CE",
        },

        inProgress: {
          primary: "#FDF2FA",
          secondary: "#FCE7F6",
          textPrimary: "#EE46BC",
          textSecondary: "#DD2590",
        },

        toReview: {
          primary: "#EFF8FF",
          secondary: "#D1E9FF",
          textPrimary: "#3FA1E3",
          textSecondary: "#3993CF",
        },

        completed: {
          primary: "#E7F8E9",
          secondary: "#B6EABB",
          textPrimary: "#12BB23",
          textSecondary: "#10AA20",
        },
      },
    },
  },
  plugins: [],
};
