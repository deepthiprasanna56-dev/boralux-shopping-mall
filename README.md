# BORALUX — Luxury BTS-Inspired Shopping Mall 💜

> **"Shop • Explore • Be You"** — Welcome to BORALUX, a luxury BTS-inspired shopping mall web application crafted with React.js, Vite, Tailwind CSS, and Framer Motion.

---

## 🌟 Key Highlights & Design Aesthetics

- **Midnight-Purple & Black Galaxy Palette**: Styled with deep obsidian `#0b0518`, violet gradients (`#9333ea`, `#a855f7`, `#c084fc`), lavender accents, neon glow borders, and glassmorphism.
- **BTS-Inspired Branding**: Custom dual-trapezoid door emblem, celebratory purple atmosphere, and dedicated merchandise drops.
- **Cinematic Galaxy Intro Screen**: Full-screen starry entrance with pulsing nebulae, loading progress indicator, glowing "Enter Shopping" button, and "Skip Intro" option (persisted via `sessionStorage` with a manual replay trigger in the footer).
- **Interactive Multi-Slide Hero Banner**: Large campaigns with animated transitions, slide counters, navigation arrows, pagination dots, and pause-on-hover.
- **6 Core Shopping Categories**: Fashion, Electronics, Footwear, Beauty, Groceries, and Accessories with high-definition imagery and store counts.
- **Dedicated BTS Merchandise Edit**: Official hoodies, ARMY Bomb lightsticks, tour tees, vegan leather daypacks, vintage caps, and insulated tumblers.
- **Real-Time Product Catalog & Filtering**:
  - Live search by product name, brand, or tag
  - Category filters + dedicated BTS Merch filter
  - Price range slider with dynamic maximum threshold
  - Brand filter & rating filter (4.8+, 4.5+)
  - Sorting (Most Popular, Top Rated, Price: Low to High, Price: High to Low)
  - Pagination / "Load More" capability
- **Product Details Page**:
  - Multi-image gallery with zoom-on-hover and thumbnail carousel
  - Color swatches & size selectors
  - Quantity controls with limits
  - Delivery perks & material specifications breakdown
  - Live toast feedback on adding to bag or wishlist
  - Related selections grid
- **Fully Functional Shopping Cart**:
  - Item listing with quantity increments and removals
  - Move to Wishlist / Save for Later
  - Live subtotal and savings calculation
  - Working coupon codes: `BORALUX10` (10% off), `BTSARMY20` (20% off), `LUXURY70` (₹700 off), `WELCOMEVIP` (15% off)
  - Complimentary shipping calculation (free over ₹2,000)
  - Interactive luxury checkout modal with order confirmation & generated order reference
  - Data persisted across reloads with `localStorage`
- **Store Directory**:
  - 12 flagship stores (BTS Atelier, Nike Innovation Lab, Adidas Originals, Zara, H&M, Sephora, Samsung Galaxy, Puma Select, Sound & Soul, The Skin Edit, Golden Hour, Fresh Market)
  - Category filters, floor details, phone numbers, ratings, and interactive store spotlight modals
- **Offers & Flash Deals**:
  - Seasonal sale banner with active live ticking countdown timer
  - Category-specific discounts
  - Flash deals with 25%+ price cuts
  - One-click coupon code copy & apply
- **Events & Festivals**:
  - BTS FESTA 2026, Luxury Midnight Shopping Gala, and K-Pop Cover Showcase
  - Interactive VIP Pass generator modal with personalized digital ticket codes
  - Past events memories gallery
- **Authentication (Sign In / Sign Up)**:
  - Luxury split-screen layout with inspirational quote and mall branding
  - Show/hide password toggles, remember me, forgot password modal
  - Form validation with demo accounts (`v@bts.army` / `boralux2026`)
- **Contact Us**:
  - Concierge info cards, directions, and direct messaging form with confirmation
  - Interactive FAQ accordion for mall timings, valet parking, returns, and events

---

## 📁 Project Structure

```text
boralux-shopping-mall/
├── public/
│   ├── favicon.svg          # Custom BTS-inspired purple logo
│   └── _redirects           # Netlify SPA client routing
├── src/
│   ├── assets/              # Static assets & graphics
│   ├── components/
│   │   ├── CheckoutModal.jsx # Interactive checkout flow
│   │   ├── EventModal.jsx    # VIP pass registration modal
│   │   ├── StoreModal.jsx    # Store spotlight modal
│   │   ├── HeroSlider.jsx    # Multi-slide hero campaign
│   │   ├── CategoryCard.jsx  # 6 Category image cards
│   │   ├── ProductCard.jsx   # Product card with zoom, rating & cart
│   │   ├── StoreCard.jsx     # Store directory card
│   │   ├── EventCard.jsx     # Upcoming event card
│   │   ├── OfferBanner.jsx   # Promotional offer cards
│   │   ├── IntroSplash.jsx   # Section 0 cinematic intro screen
│   │   ├── Navbar.jsx        # Sticky glassmorphism header & search
│   │   ├── Footer.jsx        # Mall hours, links & intro replay
│   │   ├── Icon.jsx          # Zero-dependency SVG icon system
│   │   └── Toast.jsx         # Global animated toast notifications
│   ├── context/
│   │   ├── ShopContext.jsx   # Cart, wishlist, user & modal state
│   │   └── useShop.js        # Hook export
│   ├── data/
│   │   └── catalog.js        # Products, categories, stores, events, coupons
│   ├── pages/
│   │   ├── Home.jsx          # 10 homepage sections in exact order
│   │   ├── Products.jsx      # Collection catalog, search, filters & sort
│   │   ├── ProductDetails.jsx# Multi-image gallery, sizes & specs
│   │   ├── Cart.jsx          # Cart calculations, coupons & checkout
│   │   ├── StoreDirectory.jsx# Store listings & category filters
│   │   ├── Offers.jsx        # Deals & live ticking countdown timer
│   │   ├── Events.jsx        # Festivals & VIP pass registration
│   │   ├── Login.jsx         # Split-screen sign-in
│   │   ├── Signup.jsx        # Split-screen account creation
│   │   ├── Contact.jsx       # Concierge form & FAQ accordion
│   │   └── NotFound.jsx      # 404 galaxy error page
│   ├── App.jsx               # React Router config & transitions
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind CSS & custom scrollbars
├── vercel.json               # Vercel SPA routing rewrite
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or later
- **npm** or **pnpm**

### 2. Installation
```bash
npm install
```

### 3. Local Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Production Build
```bash
npm run build
```
The optimized static bundle will be built in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

### Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `public/_redirects` ensures SPA routing functions correctly on page reloads.

### Vercel
1. Import project into Vercel.
2. Framework Preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. The included `vercel.json` provides URL rewrites to `/index.html`.

---

## 💜 Credits & Fandom Disclaimer
BORALUX is an artistic luxury shopping mall project inspired by BTS and the purple fandom community. All events and mall promotions are promotional lifestyle concepts celebrating design, music, and fashion.
