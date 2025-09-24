import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - bright and cheerful
        primary: {
          blue: '#4299E1',
          yellow: '#FFD93D',
          green: '#48BB78',
          orange: '#F6AD55',
          purple: '#9F7AEA',
          pink: '#F687B3',
        },
        // Subject-specific colors
        subjects: {
          math: '#4299E1',
          english: '#48BB78',
          evs: '#F6AD55',
          science: '#9F7AEA',
          art: '#F687B3',
        },
        // Background colors
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'child-friendly': ['Comic Neue', 'Fredoka One', 'sans-serif'],
        'parent': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'child-xs': ['12px', '16px'],
        'child-sm': ['14px', '20px'],
        'child-base': ['16px', '24px'],
        'child-lg': ['18px', '28px'],
        'child-xl': ['20px', '32px'],
        'child-2xl': ['24px', '36px'],
        'child-3xl': ['30px', '42px'],
        'child-4xl': ['36px', '48px'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '70': '17.5rem',
      },
      borderRadius: {
        'child': '1rem',
        'child-lg': '1.5rem',
        'child-xl': '2rem',
      },
      animation: {
        'bounce-slow': 'bounce 1s infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'child': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'child-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'colorful': '0 4px 12px rgba(66, 153, 225, 0.3)',
        'success': '0 4px 12px rgba(72, 187, 120, 0.3)',
        'warning': '0 4px 12px rgba(246, 173, 85, 0.3)',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'gradient-sky': 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
        'gradient-forest': 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
      }
    },
  },
  plugins: [],
};

export default config;