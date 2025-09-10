## Birthday Celebration App

A festive, responsive birthday page built with React, TypeScript, Vite, and styled-components. It features:

- A bright birthday theme using Google Fonts (Pacifico + Poppins)
- A modal greeting that appears on first load with close button and keyboard support
- A responsive, animated photo gallery (supports local photos or placeholder URLs)

### Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

### Customize the greeting

- In `src/App.tsx`, edit the `Title` (hero heading) and the modal message text:
  - Title: look for `<Title>🎂 Happy Birthday, Friend! 🎉</Title>`
  - Modal: inside `<Modal>Happy Birthday, [Friend's Name(s)]! ...</Modal>`

### Customize photos

- The gallery looks for local images `/photo1.jpg`, `/photo2.jpg`, etc. Place your photos in the `public/` folder (e.g., `public/photo1.jpg`).
- If no local image is found, the component falls back to placeholder images from `https://picsum.photos/`.
- To pass your own URLs programmatically, provide the `images` prop to `Gallery` in `src/App.tsx`:

```tsx
<Gallery images={["/photo1.jpg", "/photo2.jpg", "https://example.com/my.jpg"]} />
```

### Styling and theme

- Theme variables live in `src/styles/theme.ts` (colors, shadows, breakpoints).
- Global styles are in `src/styles/GlobalStyles.ts` (fonts, background, container, selection color).
- Components use `styled-components` for scoped, maintainable styles.

### Animations

- Modal uses fade and slide transitions.
- Gallery cards fade in with a slight upward animation and subtle hover scale.

### Accessibility

- Modal is dismissible via the Escape key and by clicking the overlay.
- Close button has an accessible label.

### Build

```bash
npm run build
npm run preview
```

### Tech

- React + Vite + TypeScript
- styled-components
- Google Fonts (Pacifico, Poppins)
