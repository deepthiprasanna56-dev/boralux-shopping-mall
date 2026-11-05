import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/useShop'
import { imageUrl } from '../data/catalog'
import Icon from '../components/Icon'

export default function Signup() {
  const navigate = useNavigate()
  const { signUp } = useShop()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please agree to the BORALUX Terms and Privacy Policy.')
      return
    }

    signUp({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })

    navigate('/')
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-500/30 bg-[#120724] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(147,51,234,0.3)] grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Purple Galaxy & BTS Branding Visual */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#220c43] via-[#16072b] to-[#0c0418] overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img
              src={imageUrl('photo-1518709268805-4e9042af9f23', 1000)}
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

          {/* Center text */}
          <div className="relative z-10 my-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 text-[10px] font-semibold tracking-[0.25em] uppercase">
              JOIN THE PURPLE UNIVERSE
            </span>
            <blockquote className="text-2xl font-bold font-['Playfair_Display',serif] text-white leading-relaxed italic">
              "Your journey to luxury, style and community begins right here."
            </blockquote>
            <ul className="text-xs text-purple-300/80 space-y-2 font-light">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✦</span> 15% Welcome Discount voucher automatically credited
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✦</span> First access to BTS FESTA 2026 VIP passes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✦</span> Complimentary luxury gift wrapping in-store
              </li>
            </ul>
          </div>

          <div className="relative z-10 text-[10px] text-purple-400/70 uppercase tracking-widest">
            EXCLUSIVE PRIVILEGES · GLOBAL FANDOM
          </div>
        </div>

        {/* Right Side: Sign-Up Form */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
              CREATE YOUR ACCOUNT
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white mt-1">
              Join the <em>Purple Club</em>
            </h1>
            <p className="text-xs text-purple-300/70 mt-1">
              Sign up in seconds for personalized recommendations and member perks.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-200 text-xs mb-4 flex items-center gap-2">
              <Icon name="close" size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Kim Taehyung"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 pr-8 py-2.5 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-3 text-purple-400 hover:text-white"
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={14} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0c34] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-purple-300/80 leading-normal">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded accent-purple-600 bg-purple-950 border-purple-500/40 cursor-pointer flex-shrink-0"
                />
                <span>
                  I agree to the BORALUX Terms of Service, Privacy Policy, and receive special fandom updates.
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Icon name="check" size={16} />
              <span>Create Account</span>
            </button>
          </form>

          {/* Link to Sign In */}
          <p className="text-center text-xs text-purple-300/70 mt-6">
            Already have a BORALUX account?{' '}
            <Link to="/sign-in" className="text-purple-300 font-bold hover:text-white underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
