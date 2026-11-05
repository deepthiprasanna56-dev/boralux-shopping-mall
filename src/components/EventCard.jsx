import React from 'react'
import { motion } from 'framer-motion'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from './Icon'

export default function EventCard({ event, index = 0 }) {
  const { setActiveEventModal } = useShop()

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/50 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(168,85,247,0.25)] flex flex-col md:flex-row"
    >
      {/* Event Photo */}
      <div className="relative md:w-5/12 h-56 md:h-auto overflow-hidden bg-[#1b0d36]">
        <img
          src={imageUrl(event.image, 800)}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#140827] via-transparent to-transparent" />

        {/* Badge & Date */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-purple-200 bg-purple-950/80 border border-purple-400/40 backdrop-blur-md">
            {event.badge}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-white bg-black/60 border border-white/20 backdrop-blur-md">
            {event.date}
          </span>
        </div>
      </div>

      {/* Event Copy */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-purple-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {event.category}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] text-white group-hover:text-purple-300 transition-colors mb-2 leading-tight">
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Meta specs */}
          <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs text-purple-300/80 mb-6">
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={14} className="text-purple-400" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="pin" size={14} className="text-purple-400" />
              {event.location}
            </span>
          </div>
        </div>

        {/* Register Button */}
        <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-300">
            {event.price}
          </span>

          <button
            onClick={() => setActiveEventModal(event)}
            className="px-5 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-400 text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center gap-2 group/btn shadow-md"
          >
            <span>Register Now</span>
            <Icon name="ticket" size={14} className="group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
