import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl, money } from '../data/catalog'
import Icon from './Icon'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop()

  const isFavorite = isInWishlist(product.id)
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/50 p-3 sm:p-3.5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.25)] hover:-translate-y-1"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#1b0d36] mb-3">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={imageUrl(product.image, 600)}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Tag / Discount Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag && (
            <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider text-purple-100 bg-purple-950/85 border border-purple-400/40 backdrop-blur-sm shadow-md">
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-sm w-fit">
              −{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button Top-Right */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product)
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorite
              ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)]'
              : 'bg-black/50 hover:bg-black/80 text-purple-200 border border-white/20'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon name="heart" size={15} className={isFavorite ? 'fill-white' : ''} />
        </button>

        {/* Quick View Link on hover */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-x-2 bottom-2 py-2 rounded-lg bg-purple-950/90 hover:bg-purple-900 border border-purple-400/40 text-purple-100 text-[10px] font-bold uppercase tracking-[0.18em] text-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 shadow-lg"
        >
          <span>Quick View</span>
          <Icon name="arrow" size={12} />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-400 mb-1">
          {product.brand}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="text-xs sm:text-sm font-semibold text-white font-['Playfair_Display',serif] hover:text-purple-300 transition-colors line-clamp-1 mb-1.5"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-[11px] text-amber-300 mb-2.5">
          <Icon name="star" size={12} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold text-purple-200">{product.rating}</span>
          <span className="text-purple-400/60 text-[10px]">
            ({product.reviewsCount || 120})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-2 border-t border-purple-500/15 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-white tracking-tight">
              {money(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] text-purple-400/60 line-through">
                {money(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-purple-900/40 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-400 text-purple-200 hover:text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm group/btn"
            title="Add to Shopping Bag"
            aria-label={`Add ${product.name} to Cart`}
          >
            <Icon name="bag" size={15} className="group-hover/btn:scale-110 transition-transform" />
            <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-wider">
              Add
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
