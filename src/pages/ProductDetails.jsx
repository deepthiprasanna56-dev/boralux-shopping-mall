import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { products, imageUrl, money } from '../data/catalog'
import { useShop } from '../context/useShop'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id) || products[0]

  const { addToCart, toggleWishlist, isInWishlist } = useShop()

  // Gallery state
  const galleryImages = product.gallery?.length ? product.gallery : [product.image]
  const [activeImage, setActiveImage] = useState(galleryImages[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || product.color || '#8b5cf6')
  const [quantity, setQuantity] = useState(1)

  // Reset image when id changes
  useEffect(() => {
    if (product.gallery?.length) {
      setActiveImage(product.gallery[0])
    } else {
      setActiveImage(product.image)
    }
    if (product.sizes?.length) setSelectedSize(product.sizes[0])
    if (product.colors?.length) setSelectedColor(product.colors[0])
    setQuantity(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id, product])

  const isFavorite = isInWishlist(product.id)
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  // Related products from same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4)

  return (
    <div className="space-y-16 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-purple-400/80 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-purple-200">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-200">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-purple-200"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Grid: Left Gallery + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery with Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image with Zoom View */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-[#180a2d] border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(168,85,247,0.2)] group">
              <img
                src={imageUrl(activeImage, 1200)}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.tag && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-purple-100 bg-purple-950/85 border border-purple-400/50 backdrop-blur-md shadow-lg">
                    {product.tag}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-md w-fit">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button on image */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
                  isFavorite
                    ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.7)]'
                    : 'bg-black/60 hover:bg-black/80 text-purple-200 border border-white/20'
                }`}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Icon name="heart" size={18} className={isFavorite ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img
                        ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-102'
                        : 'border-purple-500/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imageUrl(img, 300)}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Specs, Selectors & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-purple-400 mb-2">
                <Icon name="bts" size={13} className="text-purple-400" />
                {product.brand}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-purple-500/20">
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={15}
                      className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-purple-900'}
                    />
                  ))}
                  <span className="font-bold text-white text-sm ml-1.5">{product.rating}</span>
                </div>
                <span className="text-purple-400/50">•</span>
                <span className="text-xs text-purple-300/80">
                  {product.reviewsCount || 128} Verified Reviews
                </span>
                <span className="text-purple-400/50">•</span>
                <span className="text-xs font-semibold text-green-400">In Stock</span>
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {money(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base sm:text-lg text-purple-400/60 line-through font-mono">
                    {money(product.oldPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-purple-200 bg-purple-900/60 border border-purple-400/40">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-purple-200/85 leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Color Swatches if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 block">
                    Color Variant
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === c
                            ? 'border-white scale-120 shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                            : 'border-purple-400/30 hover:scale-110'
                        }`}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold uppercase tracking-wider text-purple-300">
                      Select Size
                    </span>
                    <span className="text-purple-400/70 text-[11px] underline cursor-pointer">
                      Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                          selectedSize === s
                            ? 'bg-purple-600 text-white border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                            : 'bg-[#180a2d] border border-purple-500/25 text-purple-300 hover:border-purple-400/50 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-xl bg-[#180a2d] border border-purple-500/30 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-900/40 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist Actions */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
                >
                  <Icon name="bag" size={18} />
                  <span>Add to Bag • {money(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${
                    isFavorite
                      ? 'bg-pink-600/30 border-pink-500 text-pink-400'
                      : 'bg-purple-950/60 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Icon name="heart" size={20} className={isFavorite ? 'fill-pink-500' : ''} />
                </button>
              </div>

              {/* Perks / Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#15092c] border border-purple-500/20 text-xs text-purple-200/90">
                <div className="flex items-center gap-2">
                  <Icon name="truck" size={17} className="text-purple-400 flex-shrink-0" />
                  <span>Free Express Delivery over ₹2,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="rotate" size={17} className="text-purple-400 flex-shrink-0" />
                  <span>30-Day Hassle-Free Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="shield" size={17} className="text-purple-400 flex-shrink-0" />
                  <span>100% Guaranteed Authentic</span>
                </div>
              </div>
            </div>

            {/* Specifications Accordion / Table */}
            {product.specifications && (
              <div className="p-5 rounded-2xl bg-[#130727] border border-purple-500/20 space-y-2.5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-2">
                  Material & Specifications
                </h3>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-purple-500/10">
                      <span className="text-purple-400/80">{k}:</span>
                      <b className="text-white text-right font-normal">{v}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-20 border-t border-purple-500/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
                  YOU MAY ALSO LOVE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white">
                  Related <em>Selections</em>
                </h2>
              </div>
              <Link
                to="/products"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300 hover:text-white transition-colors"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct, idx) => (
                <ProductCard key={relProduct.id} product={relProduct} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
