/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        // Follows the runtime language: --app-font is swapped by LanguageService.
        sans: ['var(--app-font)', 'Inter', 'Cairo', 'system-ui', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  // Disable Tailwind's Preflight reset so it does not clobber Angular Material styles.
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
