import { createGlobalStyle } from 'styled-components'

// Global styles establish fonts, base colors, reset, and a fun festive background.
export const GlobalStyles = createGlobalStyle`
  /* CSS Reset - minimal */
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { margin: 0; font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif; color: ${({ theme }) => (theme as any).colors.text}; background: linear-gradient(135deg, ${({ theme }) => (theme as any).colors.backgroundStart}, ${({ theme }) => (theme as any).colors.backgroundEnd}); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

  /* Festive confetti dots overlay (very subtle) */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 2px, transparent 3px),
      radial-gradient(circle at 70% 40%, rgba(255,255,255,0.25) 2px, transparent 3px),
      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 2px, transparent 3px);
    background-size: 40px 40px, 55px 55px, 65px 65px;
    mix-blend-mode: overlay;
  }

  h1, h2, h3 { font-family: 'Pacifico', cursive; margin: 0; }
  p { margin: 0; }

  /* Selection color */
  ::selection { background: ${({ theme }) => (theme as any).colors.primary}; color: ${({ theme }) => (theme as any).colors.textOnPrimary}; }

  /* Utility container */
  .container { width: min(1100px, 92%); margin-inline: auto; }
`

