import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from '../components/Icon'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, notify } = useShop()

  const [email, setEmail] = useState('v@bts.army')
  const [password, setPassword] = useState('boralux2026')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [forgotModal, setForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    // Success sign-in simulation
    signIn({ email, name: email.includes('@') ? email.split('@')[0].toUpperCase() : 'VIP Guest' })
    navigate('/')
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault()
    setForgotModal(false)
    notify(`Password reset instructions sent to ${forgotEmail || email} ✨`, 'info')
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/30 bg-[#120724] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(147,51,234,0.3)] grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Purple Galaxy & BTS Branding Visual */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#220c43] via-[#16072b] to-[#0c0418] overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src={imageUrl('photo-1514525253161-7a46d19cd819', 1000)}
              alt="Purple Galaxy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e041d] via-[#17072f]/80 to-transparent" />

          {/* Top Emblem */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-violet-600 border border-purple-400/50 flex items-center justify-center text-white shadow-lg">
              <Icon name="bts" size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-[0.2em] uppercase font-['Cinzel',serif] text-white">
                BORALUX
              </span>
              <span className="block text-[8px] font-medium tracking-[0.25em] text-purple-300 uppercase">
                Shop • Explore • Be You
              </span>
            </div>
          </div>

          {/* Center inspirational quote */}
          <div className="relative z-10 my-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 text-[10px] font-semibold tracking-[0.25em] uppercase">
              VIP MEMBERSHIP
            </span>
            <blockquote className="text-2xl font-bold font-['Playfair_Display',serif] text-white leading-relaxed italic">
              "In our purple universe, every shopper shines like a star."
            </blockquote>
            <p className="text-xs text-purple-300/80 leading-relaxed font-light">
              Access your personalized wishlist, track luxury white-glove orders, and receive private invites to BTS Festa celebrations.
            </p>
          </div>

          {/* Bottom note */}
          <div className="relative z-10 text-[10px] text-purple-400/70 uppercase tracking-widest">
            AUTHENTIC LUXURY DESTINATION · 2026
          </div>
        </div>

        {/* Right Side: Sign-In Form */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
              WELCOME BACK
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white mt-1">
              Sign In to <em>BORALUX</em>
            </h1>
            <p className="text-xs text-purple-300/70 mt-1">
              Enter your credentials to access your luxury account.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-200 text-xs mb-4 flex items-center gap-2">
              <Icon name="close" size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-purple-300 font-semibold mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="v@bts.army"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <Icon name="mail" size={16} className="absolute left-3.5 top-3.5 text-purple-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-[11px] text-purple-400 hover:text-purple-200 underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <Icon name="shield" size={16} className="absolute left-3.5 top-3.5 text-purple-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-purple-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  <Icon name={showPassword ? 'eyeOff' : 'eye'} size={16} />
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-purple-300/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600 bg-purple-950 border-purple-500/40 cursor-pointer"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Icon name="user" size={16} />
              <span>Sign In to Mall</span>
            </button>
          </form>

          {/* Link to Sign Up */}
          <p className="text-center text-xs text-purple-300/70 mt-8">
            New to BORALUX?{' '}
            <Link to="/sign-up" className="text-purple-300 font-bold hover:text-white underline">
              Create an Account
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-purple-500/15 text-center">
            <span className="text-[10px] text-purple-400/60 uppercase tracking-widest">
              Demo Credentials: v@bts.army / boralux2026
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16082c] border border-purple-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-white font-['Playfair_Display',serif]">
              Reset Password
            </h3>
            <p className="text-xs text-purple-300/80">
              Enter your email address and we'll send a luxury recovery link to reset your password.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#1e0e37] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setForgotModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-purple-950 text-purple-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
