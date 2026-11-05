import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl, money } from '../data/catalog'
import Icon from './Icon'

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop()

  const [selectedSize, setSelectedSize] = useState('Standard')
  const [selectedColor, setSelectedColor] = useState('#8b5cf6')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || 'Standard')
      setSelectedColor(quickViewProduct.colors?.[0] || quickViewProduct.color || '#8b5cf6')
      setQuantity(1)
    }
  }, [quickViewProduct])

  if (!quickViewProduct) return null

  const handleClose = () => setQuickViewProduct(null)
  const isFavorite = isInWishlist(quickViewProduct.id)
  const discountPercent = quickViewProduct.oldPrice
    ? Math.round(((quickViewProduct.oldPrice - quickViewProduct.price) / quickViewProduct.oldPrice) * 100)
    : 0

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#06020f]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#140827] border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.3)] text-purple-100 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <Icon name="close" size={16} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image Box */}
            <div className="relative aspect-square sm:aspect-auto h-64 sm:h-full w-full bg-[#1b0d36] overflow-hidden">
              <img
                src={imageUrl(quickViewProduct.image, 800)}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-[#140827]/40" />

              {/* Tag / Discount Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {quickViewProduct.tag && (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-purple-100 bg-purple-950/85 border border-purple-400/40">
                    {quickViewProduct.tag}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 w-fit">
                    −{discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Details Box */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-400">
                  {quickViewProduct.brand} • {quickViewProduct.category}
                </span>

                <h2 className="text-xl font-bold font-['Playfair_Display',serif] text-white mt-1 mb-2 leading-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-center gap-2 text-xs text-amber-300 mb-3">
                  <Icon name="star" size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{quickViewProduct.rating}</span>
                  <span className="text-purple-400/60 text-[11px]">
                    ({quickViewProduct.reviewsCount || 140} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-2.5 mb-3">
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {money(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-xs text-purple-400/60 line-through font-mono">
                      {money(quickViewProduct.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-purple-200/80 line-clamp-3 leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {/* Size picker */}
                {quickViewProduct.sizes && (
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-purple-300 font-semibold block">
                      Size:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            selectedSize === s
                              ? 'bg-purple-600 text-white border border-purple-300'
                              : 'bg-purple-950/60 border border-purple-500/25 text-purple-300 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color picker */}
                {quickViewProduct.colors && (
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-purple-300 font-semibold block">
                      Color:
                    </span>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            selectedColor === c ? 'border-white scale-120 shadow-md' : 'border-purple-400/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center rounded-lg bg-[#1c0d36] border border-purple-500/30 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded flex items-center justify-center text-purple-300 hover:text-white text-xs font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-purple-300 hover:text-white text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-purple-500/15">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, selectedSize, selectedColor, quantity)
                      handleClose()
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="bag" size={15} />
                    <span>Add to Bag ({money(quickViewProduct.price * quantity)})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                      isFavorite
                        ? 'bg-pink-600/30 border-pink-500 text-pink-400'
                        : 'bg-purple-950/60 border-purple-500/30 text-purple-300 hover:text-white'
                    }`}
                  >
                    <Icon name="heart" size={16} className={isFavorite ? 'fill-pink-500' : ''} />
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.id}`}
                  onClick={handleClose}
                  className="block text-center text-[11px] text-purple-400 hover:text-white uppercase tracking-wider py-1 underline"
                >
                  View Full Specifications & Gallery →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
