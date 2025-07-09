/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theatrical palette
        theatrical: {
          gold: '#FFD700',
          crimson: '#DC143C',
          spotlight: '#FFF8DC',
          curtain: '#8B0000',
        },
        // Tech palette
        tech: {
          cyan: '#00F5FF',
          electric: '#00FFFF',
          neon: '#39FF14',
          circuit: '#1E3A8A',
          matrix: '#0D0D0D',
        },
        // Neural network palette
        neural: {
          purple: '#8A2BE2',
          pink: '#FF1493',
          blue: '#4169E1',
          green: '#00FA9A',
        },
      },
      fontFamily: {
        'dramatic': ['Playfair Display', 'serif'],
        'tech': ['Space Mono', 'monospace'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'spotlight': 'spotlight 3s ease-in-out infinite',
        'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'stage-curtain': 'stage-curtain 2s ease-out',
        'circuit-flow': 'circuit-flow 3s linear infinite',
        // New animations for AnimatedIntro
        'flicker-name': 'flicker 5s ease-in-out infinite',
        'glow-letter': 'glow 2s ease-in-out infinite',
        'flicker-1': 'flicker 3s ease-in-out infinite',
        'flicker-2': 'flicker 2.5s ease-in-out infinite 0.5s',
        'flicker-3': 'flicker 4s ease-in-out infinite 1s',
        'flicker-4': 'flicker 3.5s ease-in-out infinite 0.7s',
        'flicker-5': 'flicker 2.7s ease-in-out infinite 0.3s',
        'fade-in': 'fadeIn 1s ease-in-out',
        'photo-reveal': 'reveal 1s ease-out',
        'photo-zoom': 'zoom 10s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'type-in': 'typeIn 2s steps(40, end)',
      },
      keyframes: {
        'spotlight': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'stage-curtain': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'center' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'center' },
        },
        'circuit-flow': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        // New keyframes for AnimatedIntro
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(66, 153, 225, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(66, 153, 225, 0.8), 0 0 30px rgba(66, 153, 225, 0.6)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'reveal': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'typeIn': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};