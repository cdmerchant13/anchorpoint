/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': 'var(--primary-red)',
        'primary-blue': 'var(--primary-blue)',
        'primary-white': 'var(--primary-white)',
        'secondary-red-light': 'var(--secondary-red-light)',
        'secondary-blue-light': 'var(--secondary-blue-light)',
        'secondary-blue-dark': 'var(--secondary-blue-dark)',
        'gray-50': 'var(--gray-50)',
        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-400': 'var(--gray-400)',
        'gray-500': 'var(--gray-500)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-800': 'var(--gray-800)',
        'gray-900': 'var(--gray-900)',
      },
    },
  },
  plugins: [],
}
