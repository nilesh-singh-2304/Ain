/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          green: "#00B75F",
          orange: "#FF9D33",
          pink: "#FF6CA1"
        }
      },
      spacing: {
        18: "4.5rem"
      }
    }
  },
  plugins: []
}