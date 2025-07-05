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
        // New luxury color palette
        'golden-opal': '#c4b75b',
        'imperial-emerald': '#0b2e2b',
        'ivory-silk': '#f7f5f2',
        'onyx-black': '#0b0f0e',
        'muted-jade': '#668b77',
        'petrol-smoke': '#21514e',
        
        // Legacy colors (keeping for backward compatibility during transition)
        'luxury-gold': '#c4b75b',
        'luxury-deep-black': '#0b0f0e',
        'luxury-pure-white': '#f7f5f2',
        'luxury-charcoal': '#0b0f0e',
        'luxury-sage': '#0b2e2b',
        'luxury-dark-sage': '#21514e',
        'luxury-cream': '#f7f5f2',
      },
      fontFamily: {
        'luxury': ['Inter', 'system-ui', 'sans-serif'],
        'luxury-sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-delay': 'fadeIn 0.8s ease-in-out 0.2s both',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(196, 183, 91, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(196, 183, 91, 0.6)' },
        },
      },
      boxShadow: {
        'luxury': '0 20px 40px rgba(11, 47, 43, 0.1)',
        'luxury-hover': '0 25px 50px rgba(11, 47, 43, 0.2)',
        'subtle': '0 2px 10px rgba(11, 15, 14, 0.1)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #c4b75b 0%, #668b77 100%)',
        'luxury-pattern': 'radial-gradient(circle at 50% 50%, rgba(196, 183, 91, 0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
} 