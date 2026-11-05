import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { imageUrl } from '../data/catalog'
import Icon from './Icon'

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link
        to={`/products?category=${encodeURIComponent(category.name)}`}
        className="block rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/50 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(168,85,247,0.25)]"
      >
        {/* Category Image Box */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#1f0e38]">
          <img
            src={imageUrl(category.image, 600)}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140827] via-[#140827]/30 to-transparent" />

          {/* Number badge */}
          <span className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-widest text-purple-300/80 bg-purple-950/70 border border-purple-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
            0{index + 1}
          </span>
        </div>

        {/* Caption */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-['Playfair_Display',serif] text-white group-hover:text-purple-300 transition-colors">
              {category.name}
            </h3>
            <span className="text-[11px] text-purple-300/70 block mt-0.5">
              {category.count}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full border border-purple-500/40 bg-purple-950/60 group-hover:bg-purple-600 group-hover:border-purple-400 text-purple-300 group-hover:text-white flex items-center justify-center transition-all duration-300">
            <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
