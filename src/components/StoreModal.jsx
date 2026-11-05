import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from './Icon'

export default function StoreModal() {
  const { activeStoreModal, setActiveStoreModal } = useShop()

  if (!activeStoreModal) return null

  const handleClose = () => setActiveStoreModal(null)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#06020f]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#140827] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.3)] text-purple-100 z-10"
        >
          {/* Header Image */}
          <div className="relative h-48 w-full overflow-hidden bg-purple-950">
            <img
              src={imageUrl(activeStoreModal.cover, 800)}
              alt={activeStoreModal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140827] via-[#140827]/40 to-transparent" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <Icon name="close" size={16} />
            </button>

            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-800 border border-purple-400/40 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                {activeStoreModal.letter}
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-300 font-semibold">
                  {activeStoreModal.category}
                </span>
                <h2 className="text-xl font-bold font-['Playfair_Display',serif] text-white">
                  {activeStoreModal.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-4">
            <p className="text-xs text-purple-200/80 leading-relaxed">
              {activeStoreModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#1b0d34] border border-purple-500/20 text-xs">
              <div>
                <span className="text-[10px] text-purple-400 block uppercase tracking-wider">Location</span>
                <b className="text-white text-[11px]">{activeStoreModal.floor}</b>
              </div>
              <div>
                <span className="text-[10px] text-purple-400 block uppercase tracking-wider">Hours</span>
                <b className="text-white text-[11px]">{activeStoreModal.hours}</b>
              </div>
              <div>
                <span className="text-[10px] text-purple-400 block uppercase tracking-wider">Phone</span>
                <b className="text-white text-[11px]">{activeStoreModal.phone}</b>
              </div>
              <div>
                <span className="text-[10px] text-purple-400 block uppercase tracking-wider">Rating</span>
                <b className="text-amber-300 text-[11px]">★ {activeStoreModal.rating} / 5.0</b>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to={`/products?search=${encodeURIComponent(activeStoreModal.name.split(' ')[0])}`}
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.15em] text-center shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Store Products</span>
                <Icon name="arrow" size={14} />
              </Link>
              <button
                onClick={handleClose}
                className="px-5 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-white text-xs uppercase tracking-[0.15em] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
