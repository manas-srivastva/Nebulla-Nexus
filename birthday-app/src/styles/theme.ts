export const theme = {
  colors: {
    backgroundStart: '#fff1f2', // light pink
    backgroundEnd: '#e0f7fa', // light teal
    primary: '#ff4d6d', // bright pink/red
    secondary: '#ffd166', // warm yellow
    accent: '#06d6a0', // mint/green
    text: '#1f2937', // slate-800
    textOnPrimary: '#ffffff',
  },
  shadows: {
    soft: '0 8px 20px rgba(0,0,0,0.08)',
    medium: '0 12px 30px rgba(0,0,0,0.15)',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
} as const

export type AppTheme = typeof theme

