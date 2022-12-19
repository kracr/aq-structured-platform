/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  content: [],
  theme: {
    extend: {},
  },
  purge: ["./index.html", './src/**/*.{svelte,js,ts}'],
  variants: {
    extend: {},
  },
  plugins: [],
}
