/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}","./*.html"],
  theme: {
    extend: {keyframes: {
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      }
    },
    animation: {
      fadeInUp: 'fadeInUp 1s ease-out',
      fadeIn: 'fadeIn 2s ease-out',
    }},
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    //   '2xl': '1536px',
    // }
  },
  plugins: [],
};

