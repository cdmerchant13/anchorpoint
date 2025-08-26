/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#B22234',
        'primary-blue': '#3C3B6E',
        'primary-white': '#FFFFFF',
        'light-red': '#D94F4F',
        'light-blue': '#5A5A99',
        'dark-blue': '#2C2B4E',
        'gray-50': '#F8F9FA',
        'gray-100': '#F1F3F5',
        'gray-200': '#E9ECEF',
        'gray-300': '#DEE2E6',
        'gray-400': '#CED4DA',
        'gray-500': '#ADB5BD',
        'gray-600': '#868E96',
        'gray-700': '#495057',
        'gray-800': '#343A40',
        'gray-900': '#212529',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['48px', '56px'],
        'heading-1': ['36px', '40px'],
        'heading-2': ['28px', '32px'],
        'heading-3': ['24px', '28px'],
        'body-large': ['18px', '24px'],
        'body-regular': ['16px', '20px'],
        'body-small': ['14px', '18px'],
        'caption': ['12px', '16px'],
      },
      spacing: {
        'xxs': '4px',
        'xs': '8px',
        's': '16px',
        'm': '24px',
        'l': '32px',
        'xl': '48px',
        'xxl': '64px',
      },
      borderRadius: {
        'button': '6px',
        'card': '8px',
      },
    },
  },
  plugins: [],
}
