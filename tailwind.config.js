/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Luxury Palette - Gold, Black, White
        luxury: {
          'deep-black': '#000000',
          'rich-black': '#1a1a1a',
          'charcoal': '#2d2d2d',
          'pure-white': '#ffffff',
          'cream': '#fafafa',
          'off-white': '#f8f8f8',
          'gold': '#d4af37',
          'light-gold': '#e6c554',
          'deep-gold': '#b8860b',
          'bronze': '#cd7f32',
        },
        primary: {
          navy: '#000000',
          orange: '#d4af37',
          blue: '#d4af37', // Using gold instead of blue
          white: '#ffffff',
          gray: '#2d2d2d',
          'light-gray': '#f8f8f8',
        },
      },
      fontFamily: {
        'luxury-serif': ['Playfair Display', 'serif'],
        'luxury-sans': ['Inter', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1.0s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'rotate-in': 'rotateIn 0.8s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'number-pop': 'numberPop 0.6s ease-out',
        'luxury-glow': 'luxuryGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'minimal-pulse': 'minimalPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-5deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        numberPop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '80%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        luxuryGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(212, 175, 55, 0.4)' 
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        minimalPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #e6c554 100%)',
        'minimal-gradient': 'linear-gradient(135deg, #000000 0%, #2d2d2d 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%)',
        'subtle-pattern': 'radial-gradient(circle at 1px 1px, rgba(212,175,55,0.1) 1px, transparent 0)',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'gold': '0 25px 50px -12px rgba(212, 175, 55, 0.2)',
        'minimal': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} 