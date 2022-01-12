module.exports = {
  mode: "jit",
  purge: ['./public/**/*.html', './src/views/**/*.{vue,js,ts,jsx,tsx}', './src/components/*.vue', './src/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
