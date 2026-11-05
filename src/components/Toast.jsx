import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/useShop'
import Icon from './Icon'

export default function Toast() {
  const { notice } = useShop()

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          key={notice.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1c0f33]/95 border border-purple-500/40 text-purple-100 shadow-[0_10px_35px_rgba(10,5,20,0.8),0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md text-xs sm:text-sm font-medium tracking-wide max-w-md w-auto"
          role="status"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            {notice.type === 'wishlist' ? (
              <Icon name="heart" size={15} className="fill-white" />
            ) : notice.type === 'error' ? (
              <Icon name="close" size={15} />
            ) : (
              <Icon name="check" size={15} />
            )}
          </span>
          <span className="leading-tight">{notice.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
