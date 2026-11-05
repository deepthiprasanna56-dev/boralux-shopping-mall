import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/useShop'
import Icon from './Icon'

export default function IntroSplash() {
  const { showIntro, dismissIntro } = useShop()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!showIntro) return

    // Animate progress smoothly over ~3 seconds
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => window.clearInterval(interval)
  }, [showIntro])

  // Particles for the galaxy background
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.sin(i * 99) * 45 + 50}%`,
    left: `${Math.cos(i * 33) * 45 + 50}%`,
    size: (i % 3) + 1.5,
    delay: (i % 10) * 0.25,
    duration: 3 + (i % 4),
  }))

  if (!showIntro) return null

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#07040f] text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          role="dialog"
          aria-label="Welcome to BORALUX Luxury Mall"
        >
          {/* Deep Galaxy Nebulae Gradients */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-900/40 via-violet-600/25 to-fuchsia-600/10 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-950/40 blur-[100px]" />
            <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-purple-950/35 blur-[90px]" />

            {/* Glowing Star Particles */}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full bg-purple-200"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  boxShadow: '0 0 8px #c084fc, 0 0 16px #9333ea',
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Skip Intro Button Top-Right */}
          <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20">
            <button
              onClick={dismissIntro}
              className="text-xs uppercase tracking-[0.25em] text-purple-300/70 hover:text-white px-4 py-2 rounded-full border border-purple-500/20 hover:border-purple-400/50 bg-purple-950/20 backdrop-blur-md transition-all duration-300 group flex items-center gap-2"
            >
              Skip Intro
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* Central Animated Content */}
          <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
            {/* BTS-inspired Emblem with Neon Violet Glow */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              {/* Pulsing ring aura */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/30 to-violet-500/30 blur-xl animate-pulse" />

              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-b from-[#1f103d] to-[#120726] border border-purple-500/40 p-4 shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                <Icon name="bts" size={54} className="text-purple-300 drop-shadow-[0_0_12px_#c084fc]" />
              </div>
            </motion.div>

            {/* Subtitle / Brand Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(147,51,234,0.25)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              SHOP • EXPLORE • BE YOU
            </motion.div>

            {/* Main Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.2em] uppercase font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)] mb-3"
            >
              BORALUX
            </motion.h1>

            {/* Tagline / Welcome Text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-purple-200/90 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-md font-['Playfair_Display',serif] italic mb-8"
            >
              Welcome to BORALUX – Your Purple Shopping Universe
            </motion.p>

            {/* Subtle Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="w-56 sm:w-64 mb-8 flex flex-col items-center gap-2"
            >
              <div className="w-full h-1 bg-purple-950/80 rounded-full overflow-hidden border border-purple-500/20 p-[0.5px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-violet-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] tracking-[0.2em] text-purple-400/80 uppercase">
                {progress < 100 ? `Preparing Luxury Experience • ${progress}%` : 'Ready to Explore'}
              </span>
            </motion.div>

            {/* Glowing Enter Shopping Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <button
                onClick={dismissIntro}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase text-white bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_45px_rgba(192,132,252,0.8)] border border-purple-400/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Icon name="sparkles" size={16} className="text-purple-200 group-hover:rotate-12 transition-transform" />
                <span>Enter Shopping</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Luxury Footer Details */}
          <div className="absolute bottom-6 left-0 right-0 px-8 flex items-center justify-between text-[10px] tracking-[0.2em] text-purple-400/50 uppercase">
            <span>BTS-INSPIRED LUXURY DESTINATION</span>
            <span>SEOUL • BANGALORE • WORLDWIDE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
