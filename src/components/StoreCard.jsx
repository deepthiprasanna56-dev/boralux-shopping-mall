import React from 'react'
import { motion } from 'framer-motion'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from './Icon'

export default function StoreCard({ store, index = 0 }) {
  const { setActiveStoreModal } = useShop()

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/50 p-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.2)] flex flex-col justify-between"
    >
      <div>
        {/* Cover / Logo Area */}
        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-[#1b0d36] mb-3.5">
          <img
            src={imageUrl(store.cover, 500)}
            alt={store.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140827] via-[#140827]/40 to-transparent" />

          {/* Brand Letter / Emblem */}
          <div className="absolute bottom-2.5 left-2.5 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-700 to-violet-900 border border-purple-400/40 text-white font-bold text-lg flex items-center justify-center shadow-md">
            {store.letter}
          </div>

          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-bold text-amber-300 bg-black/60 border border-amber-400/30 backdrop-blur-sm">
            ★ {store.rating}
          </span>
        </div>

        {/* Store Info */}
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-purple-400">
          {store.category}
        </span>
        <h3 className="text-base font-bold font-['Playfair_Display',serif] text-white mt-0.5 mb-1 group-hover:text-purple-300 transition-colors">
          {store.name}
        </h3>
        <p className="text-xs text-purple-300/70 line-clamp-2 leading-relaxed mb-3">
          {store.description}
        </p>
      </div>

      {/* Floor & View Store button */}
      <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs">
        <span className="text-[11px] text-purple-300/80 truncate max-w-[55%]">
          {store.floor}
        </span>

        <button
          onClick={() => setActiveStoreModal(store)}
          className="text-xs font-semibold text-purple-300 hover:text-white uppercase tracking-wider flex items-center gap-1 group/btn"
        >
          <span>View Store</span>
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </motion.article>
  )
}
