import React from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop'
import Icon from './Icon'

export default function Footer() {
  const { replayIntro } = useShop()

  return (
    <footer className="bg-[#0b0518] text-purple-200 border-t border-purple-500/20 pt-16 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-purple-500/20">
          {/* Col 1: Brand & BTS Emblem */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-violet-600 border border-purple-400/40 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Icon name="bts" size={24} className="text-white" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-[0.18em] uppercase font-['Cinzel',serif] text-white">
                  BORALUX
                </span>
                <span className="block text-[9px] font-medium tracking-[0.3em] text-purple-400 uppercase">
                  Shop • Explore • Be You
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-purple-300/80 max-w-sm leading-relaxed">
              India’s premier BTS-inspired luxury shopping destination. Discover high-end fashion, official fan merchandise, world-class gastronomy, and luminous cultural events in our purple universe.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={replayIntro}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                title="Watch opening galaxy intro again"
              >
                <Icon name="sparkles" size={14} className="text-purple-400" />
                <span>Replay Intro</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Explore Mall
            </h4>
            <ul className="space-y-2 text-xs text-purple-300/80">
              <li>
                <Link to="/" className="hover:text-purple-200 hover:underline">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-purple-200 hover:underline">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-purple-200 hover:underline">
                  BTS Merch Edit
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-purple-200 hover:underline">
                  Brand Directory
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-purple-200 hover:underline">
                  Offers & Up to 70% Off
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-purple-200 hover:underline">
                  Upcoming Festivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs text-purple-300/80">
              <li>
                <Link to="/contact" className="hover:text-purple-200 hover:underline">
                  Concierge Desk
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-purple-200 hover:underline">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="hover:text-purple-200 hover:underline">
                  VIP Club Membership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-200 hover:underline">
                  Valet & Parking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-200 hover:underline">
                  FAQs & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Mall Timings
            </h4>
            <div className="text-xs text-purple-300/80 space-y-1.5 leading-relaxed">
              <p>
                <b className="text-white block">Monday — Sunday</b>
                10:00 AM — 10:30 PM
              </p>
              <p className="pt-2">
                <b className="text-white block">Central Concierge</b>
                +91 80 4920 7777 <br />
                hello@boralux.in
              </p>
              <p className="pt-1 text-[11px] text-purple-400">
                MG Road Atrium, Bengaluru 560001
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-400/70">
          <p>© 2026 BORALUX Shopping Mall. All Rights Reserved. Crafted for the Purple Galaxy 💜</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-purple-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-purple-200 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-purple-200 transition-colors">
              Mall Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
