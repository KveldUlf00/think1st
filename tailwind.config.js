/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "think-bg": "#F0EAF8",
        "think-dark": "#000853",
        "think-purple": "#761BE4",
        "think-dark-purple": "#6A19CD",
        "think-gray": "#CBB6E5",
        "think-dark-gray": "#898DA9",
        "think-light-gray": "#FAF9FA",
        "think-red": "#ED4545",
        "think-light-red": "#FEECEC",
      },
      width: {
        "think-w": "26.625rem",
        "think-parcel-w": "4.75rem",
        "think-calendar-w": "20.375rem",
      },
      height: {
        "think-parcel-h": "2.875rem",
        "think-calendar-h": "18.25rem",
      },
    },
  },
  plugins: [],
};
