/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Dark tech focused colors
        'pulse-purple': '#8b5cf6', // violet-500
        'pulse-purple-dark': '#6d28d9', // darker purple
        'pulse-cyan': '#22d3ee', // cyan-400
        'pulse-cyan-dark': '#0891b2', // darker cyan
        'bg-dark-1': '#080810', // Very dark almost black
        'bg-dark-2': '#0f0f1a', // Very dark blue-black
        'bg-dark-3': '#141428', // Dark with slight blue tint
        'bg-dark-4': '#1a1a35', // Slightly lighter dark blue
        'page-bg-dark': '#050507', // Near black for page bg start
        'page-bg-light': '#0a0a15', // Very dark blue/purple for page bg end
        
        // Original colors (keeping for compatibility)
        'brand-purple': '#6B46C1',
        'brand-blue': '#3B82F6',
        'dark-bg': '#080810',
        'dark-card': '#0c0c18',
        'pop-pink': '#EC4899',
        'pop-teal': '#14B8A6',
        'pulse-accent': '#F472B6',
        'pulse-accent-dark': '#DB2777',
        'slate-800': '#1e293b',
      },
      backgroundImage: theme => ({
        'dark-gradient': 'linear-gradient(to bottom right, #080810, #0c0c18, #151530)',
        'page-gradient': 'linear-gradient(to bottom, #050507, #0a0a15)',
        'section-gradient-1': 'linear-gradient(to bottom, #080810, #0c0c18)',
        'section-gradient-2': 'linear-gradient(to bottom, #0c0c18, #121225)',
        'section-gradient-3': 'linear-gradient(to bottom, #0a0a15, #151530)',
        'button-pop-gradient': 'linear-gradient(to right, #EC4899, #D946EF)',
        'pulse-gradient': 'linear-gradient(to right, #8b5cf6, #22d3ee)', // Gradient
        'card-gradient': 'linear-gradient(to bottom right, #080810, #0f0f1a)', // Darker card gradient
        'card-gradient-alt': 'linear-gradient(to bottom right, #0c0c18, #151530)', // Alternative card gradient
        'glow-border-gradient': `radial-gradient(circle at var(--x) var(--y), ${theme('colors.pulse-purple')}40, transparent 20%), linear-gradient(to right, ${theme('colors.pulse-purple')}, ${theme('colors.pulse-cyan')})`,
      }),
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'glow-lg': '0 0 15px 0px rgba(139, 92, 246, 0.3), 0 0 30px -5px rgba(34, 211, 238, 0.2)',
        'glow-sm': '0 0 5px rgba(139, 92, 246, 0.3)',
        'cta-glow': '0 0 20px 2px rgba(139, 92, 246, 0.3)',
        'pulse-glow': '0 0 25px 5px rgba(139, 92, 246, 0.25)',
        'inner-glow': 'inset 0 0 20px 5px rgba(139, 92, 246, 0.1)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      animation: {
        'border-glow': 'border-glow 4s linear infinite', // For animated glowing border
        'fade-in-bottom': 'fade-in-bottom 0.5s ease-out forwards',
      },
      keyframes: theme => ({
        'border-glow': {
          '0%, 100%': { 'border-color': theme('colors.pulse-purple') },
          '50%': { 'border-color': theme('colors.pulse-cyan') },
        },
        'fade-in-bottom': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'), // Added for better form styling
  ],
}; 