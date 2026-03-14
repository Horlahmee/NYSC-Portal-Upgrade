import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nysc: {
          green: '#006400',
          'green-light': '#2d8a2d',
          'green-dark': '#004d00',
          'green-deep': '#002800',
          gold: '#FFD700',
          'gold-dark': '#c9a800',
          'gold-light': '#fff8cc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'sidebar-active': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'dots': "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        'dots-dark': "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}

export default config
