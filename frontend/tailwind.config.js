/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#122620",
          moss: "#2E5E4E",
          sage: "#89A894",
          sand: "#F2E6D0",
          cream: "#FBF8F1",
          coral: "#F97352"
        }
      },
      boxShadow: {
        card: "0 20px 50px rgba(18, 38, 32, 0.08)"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["'Trebuchet MS'", "sans-serif"]
      }
    }
  },
  plugins: []
};
