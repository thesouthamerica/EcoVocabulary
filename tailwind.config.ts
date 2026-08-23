/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#27ae60',
        'eco-green-light': '#2ecc71',
        'eco-blue': '#2980b9',
        'eco-blue-light': '#3498db',
        'eco-yellow': '#f39c12',
        'eco-yellow-light': '#f1c40f',
        'eco-bg': '#f0f9ff'
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], 
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
