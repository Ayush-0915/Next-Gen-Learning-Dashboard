import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SFMono-Regular', 'monospace']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: 'var(--surface)',
        surfaceMuted: 'var(--surface-muted)',
        stroke: 'var(--stroke)',
        accent: {
          purple: 'var(--accent-purple)',
          blue: 'var(--accent-blue)',
          green: 'var(--accent-green)',
          pink: 'var(--accent-pink)',
          amber: 'var(--accent-amber)'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(147, 51, 234, 0.16), 0 24px 80px rgba(0, 0, 0, 0.45)',
        insetGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      },
      backgroundImage: {
        'dashboard-grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;