/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#0fb4bb',
        // secondary: '#51c0d0',
        primarybg: '#ffffff',
        accent:'#d4e6f1',
        secondarybg: '#c4f1f4',
        tertiarybg:'#e0f7fa'
      },
    },
  },
  plugins: [],
};
