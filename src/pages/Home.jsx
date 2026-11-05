import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import StoreCard from '../components/StoreCard'
import EventCard from '../components/EventCard'
import Icon from '../components/Icon'
import {
  categories,
  products,
  stores,
  events,
  imageUrl,
} from '../data/catalog'
import { useShop } from '../context/useShop'

const featuredBrands = [
  { name: 'BTS ATELIER', label: 'OFFICIAL MERCH', symbol: 'Ⅱ', color: 'from-purple-600 to-violet-800' },
  { name: 'NIKE', label: 'SPORTS & LAB', symbol: '✓', color: 'from-zinc-800 to-black' },
  { name: 'ADIDAS', label: 'ORIGINALS & Y-3', symbol: '◢', color: 'from-zinc-800 to-black' },
  { name: 'ZARA', label: 'EUROPEAN HIGH FASHION', symbol: 'Z', color: 'from-neutral-900 to-black' },
  { name: 'H&M', label: 'CONSCIOUS LUXURY', symbol: 'H', color: 'from-neutral-900 to-black' },
  { name: 'SEPHORA', label: 'PRESTIGE BEAUTY', symbol: 'S', color: 'from-purple-950 to-black' },
  { name: 'PUMA', label: 'SELECT STREETWEAR', symbol: 'P', color: 'from-zinc-900 to-black' },
]

export default function Home() {
  const { notify } = useShop()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  // Filter trending products (non-merch or selected mix)
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8)

  // Dedicated BTS Merchandise items
  const btsMerchProducts = products.filter((p) => p.isMerch)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSuccess(true)
    notify('Welcome to BORALUX Purple VIP Club! Use code WELCOMEVIP for 15% off ✨', 'success')
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Banner: Large BTS-inspired purple galaxy banner with interactive slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <HeroSlider />
      </section>

      {/* 2. Featured Brands: BTS-inspired branding alongside Nike, Adidas, Zara, H&M, Sephora, Puma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              THE BRANDS YOU LOVE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Featured <em>Flagships & Boutiques</em>
            </h2>
          </div>
          <Link
            to="/stores"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View All Stores</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        {/* Brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {featuredBrands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -3 }}
            >
              <Link
                to={`/stores?search=${encodeURIComponent(brand.name.split(' ')[0])}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-[#180a2f] to-[#110620] border border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all h-24 text-center group"
              >
                <span className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white group-hover:text-purple-300 transition-colors">
                  {brand.symbol}
                </span>
                <span className="text-[11px] font-bold text-white mt-1 group-hover:text-purple-200">
                  {brand.name}
                </span>
                <span className="text-[8px] font-medium tracking-wider text-purple-400/70 uppercase">
                  {brand.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Shopping Categories: Six image cards for Fashion, Electronics, Footwear, Beauty, Groceries, Accessories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              EXPLORE OUR WORLD
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Shop by <em>Category</em>
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Explore All Pieces</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        {/* Categories Grid (Clothes, Food, Games, Electronics, Footwear, Beauty, Groceries, Accessories) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. Trending Products: Product cards with images, original prices, discounted prices, ratings, wishlist icons, Add to Cart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              HANDPICKED FOR YOU
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Trending <em>Now</em>
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View Full Catalog</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* 5. Special Offers: Large promotional banner displaying discounts up to 70% */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#17072f] via-[#240a46] to-[#120526] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.3)]">
          {/* Subtle background glow graphics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-fuchsia-600/15 blur-[90px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                LIMITED-TIME CELEBRATION
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Cinzel',serif] text-white leading-tight uppercase">
                Up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-violet-400">70% OFF</span>
                <br />
                The Grand Purple Edit
              </h2>

              <p className="text-sm sm:text-base text-purple-200/85 max-w-lg leading-relaxed font-light">
                Celebrate season high points with extraordinary discounts across 220+ luxury brands. Use code <b className="text-purple-300 font-mono">BORALUX10</b> or <b className="text-purple-300 font-mono">BTSARMY20</b> at checkout.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/offers"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center gap-2"
                >
                  <span>Shop Grand Sale</span>
                  <Icon name="arrow" size={15} />
                </Link>
                <Link
                  to="/products?category=Clothes%20%26%20Fashion"
                  className="px-6 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all"
                >
                  Fashion Deals
                </Link>
              </div>
            </div>

            {/* Visual Callout Card on the Right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-purple-400/40 shadow-2xl group">
                <img
                  src={imageUrl('photo-1607082349566-187342175e2f', 800)}
                  alt="Special seasonal discount"
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120526] via-[#120526]/50 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">
                    ACTIVE VOUCHER
                  </span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    BORALUX70
                  </div>
                  <span className="text-xs text-purple-200/80 mt-1">
                    Instant 10% to 70% automatic savings applied
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BTS Merchandise Collection: Dedicated promotional section for hoodies, T-shirts, caps, backpacks, and ARMY lightsticks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1b0a33] via-[#120626] to-[#0d041c] border border-purple-500/30 shadow-[0_0_40px_rgba(147,51,234,0.2)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-purple-500/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                <Icon name="bts" size={14} className="text-purple-300" />
                BORALUX FANDOM EXCLUSIVE
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-['Playfair_Display',serif] text-white">
                BTS <em>Merchandise Collection</em>
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mt-2 leading-relaxed font-light">
                Wear your love with pride. Authentic oversized velvet hoodies, official ARMY Bomb lightsticks, tour graphic tees, structured daypacks, and collectible vintage caps.
              </p>
            </div>

            <Link
              to="/products?category=BTS%20Merch"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 w-fit"
            >
              <span>Explore All Merch</span>
              <Icon name="arrow" size={15} />
            </Link>
          </div>

          {/* BTS Merch Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {btsMerchProducts.map((merch, idx) => (
              <ProductCard key={merch.id} product={merch} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Popular Stores: Attractive brand cards with View Store links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              DESTINATIONS & FLAGSHIPS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Popular <em>Stores</em>
            </h2>
          </div>
          <Link
            to="/stores"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View All 220+ Stores</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.slice(0, 6).map((store, idx) => (
            <StoreCard key={store.id} store={store} index={idx} />
          ))}
        </div>
      </section>

      {/* 8. Upcoming Events: BTS-inspired events, shopping festivals, seasonal promotions, event dates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="events">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              PURPLE FESTIVALS & EXPERIENCES
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Upcoming <em>Events</em>
            </h2>
          </div>
          <Link
            to="/events"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View Full Events Calendar</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="space-y-6">
          {events.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </section>

      {/* 9. Newsletter: Email subscription section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#140827] p-8 sm:p-12 lg:p-16 text-center shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(168,85,247,0.2)]">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Icon name="mail" size={22} />
            </span>

            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
              JOIN THE PURPLE GALAXY CLUB
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white mb-3">
              Unlock VIP Drops & <em>Private Previews</em>
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/80 mb-8 leading-relaxed font-light">
              Subscribe to the BORALUX newsletter for early event passes, BTS merchandise drop alerts, and exclusive secret discount vouchers directly in your inbox.
            </p>

            {!newsletterSuccess ? (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full sm:flex-1 px-4 py-3.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Icon name="arrow" size={14} />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs max-w-md mx-auto flex items-center justify-center gap-2">
                <Icon name="check" size={16} className="text-green-400" />
                <span>You're in! Welcome code <b>WELCOMEVIP</b> saved to your profile.</span>
              </div>
            )}

            <div className="text-[10px] text-purple-400/60 mt-4 tracking-wider uppercase">
              No spam. Unsubscribe at any time with one click.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
