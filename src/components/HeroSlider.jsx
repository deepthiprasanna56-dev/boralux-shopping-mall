import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { imageUrl } from '../data/catalog'

const slides = [
  {
    id: 1,
    kicker: 'BORALUX EXCLUSIVE · CHAPTER 01',
    title: (
      <>
        BTS <br />
        <span className="font-['Playfair_Display',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-violet-400">
          The Ultimate Edit.
        </span>
      </>
    ),
    description:
      'Immerse yourself in our purple universe. Official BTS merchandise, luxury fashion, and exclusive pop-up experiences gathered in one iconic destination.',
    ctaText: 'SHOP BTS MERCH',
    ctaLink: '/products?category=Fashion',
    image: 'photo-1514525253161-7a46d19cd819',
    badge: 'NEW DROP',
  },
  {
    id: 2,
    kicker: 'SUMMER LUXURY 2026 · CHAPTER 02',
    title: (
      <>
        Find Your <br />
        <span className="font-['Playfair_Display',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-300 to-pink-300">
          Purple Style.
        </span>
      </>
    ),
    description:
      'Explore over 220 designer boutiques featuring international high fashion, fine jewelry, artisan leather, and seasonal runway staples.',
    ctaText: 'EXPLORE THE EDIT',
    ctaLink: '/products',
    image: 'photo-1490481651871-ab68de25d43d',
    badge: 'NEW SEASON',
  },
  {
    id: 3,
    kicker: 'BTS FESTA 2026 · CHAPTER 03',
    title: (
      <>
        Make Room <br />
        <span className="font-['Playfair_Display',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-violet-300">
          For The Fandom.
        </span>
      </>
    ),
    description:
      'Shop, connect, and celebrate at our flagship annual purple festival with live lightshows, dance showcases, and complimentary VIP access.',
    ctaText: 'RESERVE FESTA PASS',
    ctaLink: '/events',
    image: 'photo-1508700115892-45ecd05ae2ad',
    badge: 'JUNE 13—14',
  },
  {
    id: 4,
    kicker: 'CURATED AUDIOPHILE & TECH · CHAPTER 04',
    title: (
      <>
        Sound & <br />
        <span className="font-['Playfair_Display',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-indigo-200 to-purple-300">
          Spatial Magic.
        </span>
      </>
    ),
    description:
      'Discover high-fidelity studio headphones, smart wearables, and next-generation devices curated for the modern connoisseur.',
    ctaText: 'DISCOVER TECH',
    ctaLink: '/products?category=Electronics',
    image: 'photo-1505740420928-5e560c06d30e',
    badge: 'SPATIAL AUDIO',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  const activeSlide = slides[current]

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden rounded-2xl lg:rounded-3xl border border-purple-500/30 bg-[#120824] shadow-[0_15px_50px_rgba(10,4,24,0.7),0_0_30px_rgba(147,51,234,0.2)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={imageUrl(activeSlide.image, 1920)}
            alt={activeSlide.kicker}
            className="w-full h-full object-cover object-center filter saturate-110"
          />
          {/* Multi-layered cinematic purple galaxy wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d061c] via-[#16082ee6] 45% to-[#12062633] 100%" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d061c] via-transparent to-[#0d061c]/40" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlays */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              {activeSlide.kicker}
            </div>

            {/* Slide Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-['Cinzel',serif] leading-[0.98] mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {activeSlide.title}
            </h1>

            {/* Slide Description */}
            <p className="text-sm sm:text-base text-purple-100/85 font-light leading-relaxed mb-8 max-w-lg">
              {activeSlide.description}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={activeSlide.ctaLink}
                className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-purple-400/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{activeSlide.ctaText}</span>
                <Icon name="arrow" size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/stores"
                className="inline-flex items-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 transition-all"
              >
                <span>View Mall Stores</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Stamp Element (Matching Reference) */}
      <div className="hidden md:flex absolute right-12 bottom-16 w-24 h-24 rounded-full border border-purple-400/40 bg-purple-950/40 backdrop-blur-md items-center justify-center text-center rotate-12 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
        <div className="text-[9px] uppercase tracking-[0.18em] font-semibold text-purple-200 leading-tight">
          BORALUX <br />
          <b className="text-purple-400">UNIVERSE</b>
        </div>
      </div>

      {/* Bottom Bar: Slider Controls & Pagination */}
      <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-purple-500/20 bg-[#0d061c]/80 backdrop-blur-md px-6 sm:px-10 flex items-center justify-between text-xs text-purple-300/80">
        <span className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase text-purple-300/60">
          SHOP • EXPLORE • BE YOU · 220+ LUXURY BOUTIQUES
        </span>

        {/* Slide navigation controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-7 bg-purple-400' : 'w-2 bg-purple-800 hover:bg-purple-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-mono text-purple-200">
            <span>0{current + 1}</span>
            <span className="text-purple-500">/</span>
            <span className="text-purple-400/60">0{slides.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="p-1.5 rounded-lg hover:bg-purple-900/60 text-purple-300 hover:text-white transition-colors"
              aria-label="Previous Slide"
            >
              <Icon name="arrowLeft" size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded-lg hover:bg-purple-900/60 text-purple-300 hover:text-white transition-colors"
              aria-label="Next Slide"
            >
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
