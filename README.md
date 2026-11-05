# BORALUX

**Shop. Explore. Be You.**

BORALUX is a responsive, purple-themed shopping mall demo built with React. Explore a curated product catalog, browse flagship stores, discover offers and events, and try a complete client-side shopping flow.

> This is a front-end demonstration. It does not connect to a real inventory, authentication service, payment provider, or order-processing backend. Checkout, sign-in, and other form flows are simulated in the browser.

## Features

- **Storefront:** animated hero carousel, featured brands, shopping categories, trending products, and BTS-inspired merchandise.
- **Product discovery:** search and filter the catalog, sort results, and open product details with image galleries, options, and related products.
- **Shopping bag and wishlist:** add products, adjust quantities, save favorites, apply promo codes, and review the order summary.
- **Demo checkout:** see a simulated order confirmation without submitting a real payment.
- **Store directory:** browse mall stores and view additional store information.
- **Offers and events:** explore promotions, event listings, and interactive event dialogs.
- **Sign-in and contact pages:** try the client-side interface and form interactions.
- **Responsive design:** custom dark-and-purple styling, motion effects, and layouts for different screen sizes.
- **Browser persistence:** cart, wishlist, and related shopping state are saved in `localStorage`; the intro screen uses `sessionStorage`.

## Tech stack

- React 19
- Vite
- React Router
- Tailwind CSS 4
- Framer Motion

## Getting started

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
public/                  Static files and SPA redirect configuration
src/
  assets/                Images and other imported assets
  components/            Shared UI components and dialogs
  context/               Shopping state and related hooks
  data/
    catalog.js           Demo products, stores, events, and promotions
  pages/                 Home, products, cart, stores, offers, and other routes
  App.jsx                App layout and route definitions
  main.jsx               React entry point
  index.css              Global styles and Tailwind import
vercel.json              Vercel SPA routing configuration
vite.config.js           Vite configuration
```

## Demo notes

- The catalog and promotional content are local demo data in `src/data/catalog.js`.
- Cart and wishlist changes are stored in the browser, not in a user account or remote database.
- Promo codes are validated against the local demo catalog.
- Authentication and checkout do not provide real account security or payment processing.
- Clearing this site's browser storage resets locally saved shopping state.

## Build and deployment

Create and verify a production build:

```bash
npm run build
npm run preview
```

The generated site is a static Vite app. Deploy the contents of `dist/` to a static hosting provider configured for single-page application routing. The repository includes a `vercel.json` for Vercel and `public/_redirects` for hosts that support that redirect-file convention.

## Disclaimer

BORALUX is an independent fan-inspired design demo. It is not affiliated with or endorsed by BTS, HYBE, or the brands shown in the sample catalog. Product, store, event, and offer details are illustrative.
