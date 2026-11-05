import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl, money } from '../data/catalog'
import Icon from '../components/Icon'

export default function Cart() {
  const {
    cart,
    cartSubtotal,
    cartSavings,
    couponDiscount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    updateQty,
    removeFromCart,
    moveToWishlist,
    applyCoupon,
    removeCoupon,
    setCheckoutModalOpen,
  } = useShop()

  const [couponInput, setCouponInput] = useState('')

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponInput) return
    applyCoupon(couponInput)
    setCouponInput('')
  }

  return (
    <div className="space-y-12 pb-20 pt-4">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          YOUR BORALUX FINDS
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-['Playfair_Display',serif] text-white">
          Shopping Bag <em>& Curated Pieces</em>
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/80 font-light mt-1">
          Review your chosen items, apply VIP promotional codes, and enjoy complimentary luxury delivery.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 text-xs text-purple-300/70 uppercase tracking-wider">
                <span>Product Item ({cart.length})</span>
                <span className="hidden sm:inline">Price / Qty</span>
              </div>

              {cart.map((item) => (
                <motion.article
                  key={item.cartKey}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/40 transition-all"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#1f0e38] flex-shrink-0"
                  >
                    <img
                      src={imageUrl(item.image, 300)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-400">
                      {item.brand}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="text-sm sm:text-base font-bold font-['Playfair_Display',serif] text-white hover:text-purple-300 transition-colors block truncate"
                    >
                      {item.name}
                    </Link>

                    {/* Variant specs */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-purple-300/70 mt-1">
                      {item.size && (
                        <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/20 text-[10px]">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/20 text-[10px]">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: item.color }}
                          />
                          Color
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold font-mono text-white mt-2 sm:hidden">
                      {money(item.price * item.qty)}
                    </div>
                  </div>

                  {/* Quantity adjustment & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="hidden sm:block text-sm sm:text-base font-bold font-mono text-white">
                      {money(item.price * item.qty)}
                    </div>

                    {/* Quantity Selector */}
                    <div className="inline-flex items-center rounded-xl bg-[#1b0c34] border border-purple-500/30 p-1">
                      <button
                        onClick={() => updateQty(item.cartKey, -1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.cartKey, 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Save to Wishlist & Remove Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToWishlist(item.cartKey)}
                        className="text-[11px] text-purple-400 hover:text-purple-200 underline"
                      >
                        Save for Later
                      </button>
                      <span className="text-purple-500/40">•</span>
                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-[11px] text-pink-400 hover:text-pink-300 underline"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}

              <div className="pt-4 flex justify-between items-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 hover:text-white transition-colors"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Continue Exploring</span>
                </Link>
              </div>
            </div>

            {/* Right Order Summary Column (4-5 cols) */}
            <aside className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-24">
              <div className="p-6 rounded-3xl bg-[#140827] border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(147,51,234,0.2)] space-y-5">
                <h2 className="text-base font-bold uppercase tracking-[0.2em] font-['Cinzel',serif] text-white pb-3 border-b border-purple-500/20">
                  Order Summary
                </h2>

                {/* Subtotal breakdown */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-white">{money(cartSubtotal)}</span>
                  </div>

                  {cartSavings > 0 && (
                    <div className="flex justify-between text-pink-400">
                      <span>Total Savings</span>
                      <span className="font-mono">−{money(cartSavings)}</span>
                    </div>
                  )}

                  {appliedCoupon && couponDiscount > 0 && (
                    <div className="flex justify-between text-purple-300">
                      <span className="flex items-center gap-1.5">
                        Promo ({appliedCoupon.code})
                        <button
                          onClick={removeCoupon}
                          className="text-[10px] text-pink-400 hover:text-pink-200 underline"
                        >
                          ✕
                        </button>
                      </span>
                      <span className="font-mono font-bold text-green-400">
                        −{money(couponDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-purple-300">
                    <span>Estimated Shipping</span>
                    <span className="font-mono text-white">
                      {shippingFee === 0 ? (
                        <b className="text-green-400 font-normal">Complimentary</b>
                      ) : (
                        money(shippingFee)
                      )}
                    </span>
                  </div>

                  {cartSubtotal < 2000 && (
                    <div className="text-[10px] text-purple-400/80 italic">
                      Add {money(2000 - cartSubtotal)} more for complimentary express delivery!
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-purple-500/20 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-white">
                      Grand Total
                    </span>
                    <span className="text-[10px] text-purple-400 block">Including all luxury taxes</span>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {money(cartTotal)}
                  </span>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 block">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. BORALUX10 or BTSARMY20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1b0d34] border border-purple-500/30 text-white placeholder-purple-400/50 text-xs uppercase focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-700 border border-purple-500/40 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="text-[10px] text-purple-400/70">
                    Active samples: <b>BORALUX10</b> (10% off), <b>BTSARMY20</b> (20% off)
                  </div>
                </form>

                {/* Checkout CTA */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Icon name="bag" size={16} />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="text-[10px] text-purple-400/70 text-center tracking-wider uppercase">
                  🔒 256-bit Encrypted Luxury Checkout
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty Cart Illustration & CTA */
          <div className="text-center py-20 px-6 rounded-3xl bg-[#140827] border border-purple-500/20 max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-900/60 to-violet-700/60 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-5 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              <Icon name="bag" size={36} />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-semibold">
              YOUR BAG IS CURRENTLY EMPTY
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white mt-1 mb-3">
              Waiting for <em>Something Lovely</em>
            </h2>

            <p className="text-xs sm:text-sm text-purple-300/80 max-w-sm mx-auto mb-8 font-light leading-relaxed">
              Explore our BTS merchandise, runway fashion, and luxury tech. Discover pieces crafted to brighten your universe.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              <span>Explore Collection</span>
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
