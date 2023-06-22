export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif']
      },
      animation: {
        'shake': 'shake 0.2s ease-in-out 0s 2',
      }
    },
  },
  plugins: [],
};
