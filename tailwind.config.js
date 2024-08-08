/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "custom-shape": "100% 0% 0% 100% / 51% 51% 49% 49%",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        // Define your custom colors here
        "custom-blue": "#33a1fd",
        "custom-dark-blue": "#2176ff",
        "custom-heading-color": "rgb(0 17 54)",
        "custom-grey": "#31393c",
        "custom-yellow": "#fdca40",
        "custom-orange": "#f79824",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
