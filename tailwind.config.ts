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
        // Primary colors - modern and clean
        primary: {
          blue: '#4A90E2',
          darkBlue: '#1F3A93',
          yellow: '#F1C40F',
          green: '#48BB78',
          orange: '#F39C12',
          purple: '#9F7AEA',
          pink: '#F687B3',
          red: '#E74C3C',
        },
        // Subject-specific colors
        subjects: {
          math: '#4A90E2',
          english: '#48BB78',
          evs: '#F39C12',
          science: '#9F7AEA',
          art: '#F687B3',
        },
        // Text colors
        text: {
          primary: '#1F3A93',
          secondary: '#5C6B73',
        },
        // Background colors
        background: '#F4F6FB',
        foreground: '#1F3A93',
        card: '#FFFFFF',
        // Button colors
        button: {
          primary: '#4A90E2',
          hover: '#357ABD',
        },
        // Icon colors
        icons: {
          star: '#F1C40F',
          coin: '#F39C12',
          flame: '#E74C3C',
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'child-friendly': ['Comic Neue', 'Poppins', 'sans-serif'],
        'parent': ['Poppins', 'system-ui', 'sans-serif'],
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
        'card': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'child': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'child-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'colorful': '0 4px 12px rgba(74, 144, 226, 0.3)',
        'success': '0 4px 12px rgba(72, 187, 120, 0.3)',
        'warning': '0 4px 12px rgba(243, 156, 18, 0.3)',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(45deg, #9F7AEA 0%, #F687B3 50%, #FFD93D 100%)',
        'gradient-sky': 'linear-gradient(135deg, #4299E1 0%, #9F7AEA 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F687B3 0%, #F6AD55 100%)',
        'gradient-forest': 'linear-gradient(135deg, #48BB78 0%, #4299E1 100%)',
      }
    },
  },
  plugins: [],
};

export default config;