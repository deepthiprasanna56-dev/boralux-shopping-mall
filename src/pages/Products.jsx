import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { categories, products, money } from '../data/catalog'
import { useShop } from '../context/useShop'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlist } = useShop()

  // URL Query Sync
  const categoryParam = searchParams.get('category') || 'All'
  const searchParam = searchParams.get('search') || ''
  const filterParam = searchParams.get('filter') || ''

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchTerm, setSearchTerm] = useState(searchParam)
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(30000)
  const [sortBy, setSortBy] = useState('popular') // popular, newest, price-asc, price-desc
  const [visibleCount, setVisibleCount] = useState(12)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Sync state when URL params change
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam)
    if (searchParam) setSearchTerm(searchParam)
  }, [categoryParam, searchParam])

  // Extract unique brands for brand filter
  const brandsList = useMemo(() => {
    return ['All', ...new Set(products.map((p) => p.brand))]
  }, [])

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Wishlist filter check
        if (filterParam === 'wishlist' && !wishlist.includes(product.id)) {
          return false
        }

        // Category filter
        if (selectedCategory === 'BTS Merch' && !product.isMerch) {
          return false
        }
        if (selectedCategory !== 'All' && selectedCategory !== 'BTS Merch') {
          const target = selectedCategory.toLowerCase()
          const prodCat = product.category.toLowerCase()
          const matches =
            prodCat === target ||
            prodCat.includes(target) ||
            target.includes(prodCat) ||
            (target.includes('fashion') && prodCat.includes('clothes')) ||
            (target.includes('clothes') && prodCat.includes('fashion')) ||
            (target.includes('food') && prodCat.includes('food')) ||
            (target.includes('game') && (prodCat.includes('game') || prodCat.includes('arcade')))
          if (!matches) return false
        }

        // Search filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase()
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            (product.tag && product.tag.toLowerCase().includes(q))
          if (!matches) return false
        }

        // Brand filter
        if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
          return false
        }

        // Rating filter
        if (minRating > 0 && parseFloat(product.rating) < minRating) {
          return false
        }

        // Price filter
        if (product.price > maxPrice) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating)
        // Default popular
        return (b.reviewsCount || 0) - (a.reviewsCount || 0)
      })
  }, [
    selectedCategory,
    searchTerm,
    selectedBrand,
    minRating,
    maxPrice,
    sortBy,
    filterParam,
    wishlist,
  ])

  const paginatedProducts = filteredProducts.slice(0, visibleCount)

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName)
    const next = new URLSearchParams(searchParams)
    if (catName === 'All') next.delete('category')
    else next.set('category', catName)
    setSearchParams(next)
    setVisibleCount(12)
  }

  const resetFilters = () => {
    setSelectedCategory('All')
    setSearchTerm('')
    setSelectedBrand('All')
    setMinRating(0)
    setMaxPrice(30000)
    setSortBy('popular')
    setSearchParams({})
  }

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Purple Shopping Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1b0933] via-[#2a0e4e] to-[#140628] border-b border-purple-500/25 py-14 sm:py-18 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-400/30 text-purple-200 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            BORALUX CURATED COLLECTION
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Cinzel',serif] text-white uppercase tracking-tight mb-3">
            {filterParam === 'wishlist' ? 'Your Saved Wishlist' : 'Explore Our Collection'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-purple-200/80 max-w-xl mx-auto font-light leading-relaxed">
            From iconic high-fashion to official BTS apparel, fine gems, and spatial audio gear — every piece is handpicked for quality and elegance.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar: Search input, Mobile Filter Toggle, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#140827] border border-purple-500/20 mb-8 shadow-md">
          {/* Search box inside page */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by product name, brand, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-purple-400"
            />
            <Icon name="search" size={16} className="absolute left-3 top-3 text-purple-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-purple-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-2"
            >
              <Icon name="filter" size={14} />
              <span>Filters</span>
            </button>

            {/* Total Results Count */}
            <span className="text-xs text-purple-300/80 hidden sm:inline">
              Showing <b>{filteredProducts.length}</b> pieces
            </span>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-purple-400 uppercase tracking-wider hidden md:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-purple-200 text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside
            className={`lg:block ${
              mobileFilterOpen ? 'block fixed inset-0 z-50 p-6 bg-[#0e061c] overflow-y-auto' : 'hidden'
            } space-y-6 lg:static`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 lg:hidden">
                <span className="font-bold text-white uppercase text-sm">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg bg-purple-950 text-purple-300"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            )}

            {/* Categories Filter */}
            <div className="p-5 rounded-2xl bg-[#140827] border border-purple-500/20 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Categories
              </h3>
              <div className="flex flex-col space-y-1 text-xs">
                {['All', 'BTS Merch', ...categories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryChange(cat)
                      if (mobileFilterOpen) setMobileFilterOpen(false)
                    }}
                    className={`text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white font-bold shadow-md'
                        : 'text-purple-300/80 hover:bg-purple-950/60 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'BTS Merch' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300">
                        💜 Fandom
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="p-5 rounded-2xl bg-[#140827] border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                  Max Price
                </h3>
                <span className="text-xs font-mono font-bold text-purple-300">
                  {money(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-400/60">
                <span>{money(1000)}</span>
                <span>{money(30000)}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="p-5 rounded-2xl bg-[#140827] border border-purple-500/20 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Brand & Studio
              </h3>
              <div className="flex flex-col space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                {brandsList.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-left px-3 py-1.5 rounded-lg transition-all flex items-center justify-between ${
                      selectedBrand === brand
                        ? 'bg-purple-900/60 text-white font-bold border border-purple-400/40'
                        : 'text-purple-300/80 hover:text-white'
                    }`}
                  >
                    <span>{brand}</span>
                    {selectedBrand === brand && <Icon name="check" size={13} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="p-5 rounded-2xl bg-[#140827] border border-purple-500/20 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Customer Rating
              </h3>
              <div className="flex flex-col space-y-1.5 text-xs">
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '★ 4.8 & Above', value: 4.8 },
                  { label: '★ 4.5 & Above', value: 4.5 },
                ].map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setMinRating(r.value)}
                    className={`text-left px-3 py-1.5 rounded-lg transition-all ${
                      minRating === r.value
                        ? 'bg-purple-900/60 text-amber-300 font-bold border border-purple-400/40'
                        : 'text-purple-300/80 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters button */}
            <button
              onClick={resetFilters}
              className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Product Grid Area (3–4 columns on desktop) */}
          <main className="lg:col-span-3">
            {paginatedProducts.length > 0 ? (
              <div className="space-y-10">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>

                {/* Load More Button if more remain */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-8 py-3.5 rounded-xl bg-purple-900/50 hover:bg-purple-700/60 border border-purple-500/40 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-md transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                      Load More Pieces ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Helpful Empty State */
              <div className="py-20 px-6 text-center rounded-3xl bg-[#140827] border border-purple-500/20 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4">
                  <Icon name="search" size={28} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                  No Pieces Match Your Search
                </h3>
                <p className="text-xs text-purple-300/80 max-w-sm mx-auto mb-6 leading-relaxed">
                  We couldn't find items matching your active category or price range. Try broadening your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-semibold uppercase tracking-[0.18em] shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
