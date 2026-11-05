import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { stores, imageUrl } from '../data/catalog'
import StoreCard from '../components/StoreCard'
import Icon from '../components/Icon'

const categoryOptions = [
  'All',
  'Clothes & Fashion',
  'Food & Dining',
  'Games & Arcade',
  'Sports & Footwear',
  'Beauty',
  'Electronics',
  'Groceries',
]

export default function StoreDirectory() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      // Category match
      if (selectedCategory !== 'All') {
        const target = selectedCategory.toLowerCase()
        const storeCat = store.category.toLowerCase()
        const matchesCategory =
          storeCat.includes(target) ||
          target.includes(storeCat) ||
          (target.includes('clothes') && (storeCat.includes('clothes') || storeCat.includes('fashion') || storeCat.includes('fandom'))) ||
          (target.includes('fashion') && (storeCat.includes('fashion') || storeCat.includes('clothes'))) ||
          (target.includes('food') && storeCat.includes('food')) ||
          (target.includes('game') && (storeCat.includes('game') || storeCat.includes('arcade')))
        if (!matchesCategory) return false
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          store.name.toLowerCase().includes(q) ||
          store.category.toLowerCase().includes(q) ||
          store.floor.toLowerCase().includes(q) ||
          store.description.toLowerCase().includes(q)
        )
      }

      return true
    })
  }, [searchQuery, selectedCategory])

  const featuredStores = stores.filter((s) => s.featured)

  return (
    <div className="space-y-14 pb-20">
      {/* 1. Hero Banner with Shopping Mall Ambiance */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#17072f] via-[#240a46] to-[#120526] border-b border-purple-500/25 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={imageUrl('photo-1519567241046-7f570eee3ce6', 1800)}
            alt="Mall Atrium"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            220+ PRESTIGE BOUTIQUES & FLAGSHIPS
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Cinzel',serif] text-white uppercase tracking-tight mb-3">
            Mall Store <em>Directory</em>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-purple-200/80 max-w-xl mx-auto font-light leading-relaxed">
            Navigate through world-class luxury ateliers, sports labs, organic beauty sanctuaries, and our exclusive BTS fandom lounge.
          </p>

          {/* Search Box inside Hero */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search stores by brand, floor or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 rounded-2xl bg-[#1d0e37]/90 border border-purple-500/40 text-white placeholder-purple-400/60 text-xs sm:text-sm focus:outline-none focus:border-purple-400 shadow-xl"
            />
            <Icon name="search" size={18} className="absolute left-3.5 top-3.5 text-purple-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-purple-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-[#140827] border border-purple-500/25 text-purple-300 hover:text-white hover:border-purple-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Flagships Showcase Section */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
                  ICONIC FLAGSHIPS
                </span>
                <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-white">
                  Featured <em>Brands</em>
                </h2>
              </div>
              <span className="text-xs text-purple-300/70">
                {featuredStores.length} Flagship Stores
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStores.slice(0, 4).map((store, idx) => (
                <StoreCard key={store.id} store={store} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Full Directory Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
                FLOOR BY FLOOR DISCOVERY
              </span>
              <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-white">
                All <em>Stores ({filteredStores.length})</em>
              </h2>
            </div>
          </div>

          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store, idx) => (
                <StoreCard key={store.id} store={store} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-[#140827] border border-purple-500/20 max-w-md mx-auto">
              <Icon name="search" size={28} className="text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Stores Found</h3>
              <p className="text-xs text-purple-300/80 mb-4">
                We couldn't find stores matching "{searchQuery}". Try a different name or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
