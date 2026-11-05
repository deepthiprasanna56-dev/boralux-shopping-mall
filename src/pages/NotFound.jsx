import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-800 to-violet-600 border border-purple-400/40 text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <Icon name="bts" size={40} />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
          ERROR 404 · LOST IN THE GALAXY
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-['Cinzel',serif] text-white">
          Page <em>Not Found</em>
        </h1>

        <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-light">
          The page or boutique you are looking for has migrated to another corner of our purple universe. Let's guide you back to our flagship stores.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="px-6 py-3.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all"
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
