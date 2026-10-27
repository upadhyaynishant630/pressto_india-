# Pressto India Homepage — React + Vite

This is a responsive, single-page React recreation of the Pressto India homepage. Homepage photographs and videos from the supplied ZIP have been mapped to stable filenames, and assets not used by the homepage have been removed.

## Run locally

1. Install Node.js (LTS) if it is not already installed.
2. Open this folder in Terminal / PowerShell.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` — homepage section layout and shared modal/toast state
- `src/components/Header.jsx` — sticky header, navigation and mobile menu
- `src/components/Hero.jsx` — rotating hero banner
- `src/components/TwoCards.jsx` — promotional cards and main services
- `src/components/Sliders.jsx` — expertise and logo carousels
- `src/components/Stories.jsx` — review cards and testimonial videos
- `src/components/Gallery.jsx` — spotlight and luxury-experience image grids
- `src/components/Footer.jsx` — newsletter form and footer links
- `src/components/PickupModal.jsx` — validated pickup request modal
- `src/styles.css` — layout, responsive breakpoints, hover and motion styles
- `src/data/content.js` — slide, navigation, services and carousel content
- `public/images/` — only the homepage photos, logo and visible brand/press logos
- `public/videos/` — the three testimonial videos used on the homepage

## Notes

- Hero and content imagery is stored locally; no homepage photos are hotlinked from external sites.
- The pickup modal and newsletter demo store submissions in browser `localStorage`. They do not submit to a live backend.
- The missing brochure PDF from the starter ZIP was not recreated or linked as a broken download; the card now points to Pressto India’s official website.
- The Stores navigation item opens Pressto India’s official contact/store information page.
