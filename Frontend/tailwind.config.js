/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#8b5cf6',
        'neon-blue': '#3b82f6',
        'neon-cyan': '#06b6d4',
        'neon-pink': '#ec4899',
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
      },
      boxShadow: {
        'neon-glow': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'cyan-glow': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}