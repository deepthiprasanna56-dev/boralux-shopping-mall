import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { offers, products, imageUrl } from '../data/catalog'
import OfferBanner from '../components/OfferBanner'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'

export default function Offers() {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 48,
    seconds: 35,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Discounted products for flash deals
  const flashDeals = products
    .filter((p) => p.oldPrice && (p.oldPrice - p.price) / p.oldPrice >= 0.25)
    .slice(0, 4)

  return (
    <div className="space-y-16 pb-20 pt-4">
      {/* 1. Main Seasonal Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#1b0933] via-[#2a0e4e] to-[#140628] p-8 sm:p-14 lg:p-18 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.3)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              SEASONAL LUXURY EXTRAVAGANZA
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Cinzel',serif] text-white uppercase leading-tight">
              Exclusive Offers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-violet-300">
                Up to 70% OFF
              </span>
            </h1>

            <p className="text-xs sm:text-base text-purple-200/85 leading-relaxed font-light">
              Elevate your wardrobe and collection with seasonal price drops. Complimentary gift wrapping and express concierge delivery on all festive orders.
            </p>

            {/* Live Countdown Timer Banner Component */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#140726]/90 border border-purple-500/30 text-white shadow-lg">
                <span className="text-xs text-purple-300 uppercase tracking-widest mr-2 flex items-center gap-1.5 font-semibold">
                  <Icon name="clock" size={14} className="text-purple-400" />
                  Flash Deals End In:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-200">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span className="text-purple-400">:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-200">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span className="text-purple-400">:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-200">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              <Link
                to="/products"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
              >
                <span>Shop All Deals</span>
                <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categorized Department Offers (Fashion, Electronics, Beauty, Footwear) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between pb-3 border-b border-purple-500/20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
              DEPARTMENT SAVINGS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Category <em>Promotions</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <OfferBanner key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* 3. Limited-Time Flash Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-3 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              HOT PICKS
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Flash <em>Deals with 25%+ Off</em>
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View All Discounted Items</span>
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {flashDeals.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. Special BTS Merchandise Promo Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#250d44] via-[#1b0833] to-[#120526] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold tracking-[0.2em] uppercase">
              <Icon name="bts" size={13} className="text-purple-300" />
              FANDOM REWARDS PROGRAM
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white">
              Get an Extra 20% Off on Official BTS Merch
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-light">
              Apply coupon <b className="text-white font-mono bg-purple-950/80 px-2 py-0.5 rounded border border-purple-400/40">BTSARMY20</b> in your cart on any order above ₹2,500. Complimentary collectible photocard pack included.
            </p>
          </div>

          <Link
            to="/products?category=Fashion"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Claim Fan Reward</span>
            <Icon name="arrow" size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
