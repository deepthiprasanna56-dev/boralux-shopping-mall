import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from './Icon'

export default function OfferBanner({ offer }) {
  const { applyCoupon } = useShop()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(offer.code)
    applyCoupon(offer.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <article className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-[#170a2c] min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(147,51,234,0.25)] group">
      {/* Background Cover */}
      <img
        src={imageUrl(offer.image, 1000)}
        alt={offer.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#120624fa] via-[#1a0833cc] 60% to-[#12062444]" />

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
          <span>{offer.discount}</span>
          <span>•</span>
          <span className="text-purple-300/80">{offer.expiry}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white leading-tight mb-1">
          {offer.title}
        </h3>

        <p className="text-xs text-purple-200/80 mb-4 leading-relaxed">
          {offer.subtitle}
        </p>

        {/* Actions: Copy Code & Shop */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-purple-950/90 border border-purple-400/40 hover:border-purple-300 text-purple-100 text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all"
            title="Click to copy and apply code"
          >
            <span>{offer.code}</span>
            <Icon name={copied ? 'check' : 'copy'} size={14} className="text-purple-400" />
            {copied && <span className="text-[10px] text-green-400 font-sans">Applied!</span>}
          </button>

          <Link
            to={`/products?category=${encodeURIComponent(
              offer.category.includes('All') ? 'All' : offer.category.split(' ')[0]
            )}`}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-md transition-all group/btn"
          >
            <span>{offer.cta || 'Shop Now'}</span>
            <Icon name="arrow" size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
