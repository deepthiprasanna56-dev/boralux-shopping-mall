import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useShop } from '../context/useShop'
import Icon from './Icon'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'Stores', path: '/stores' },
  { name: 'Offers', path: '/offers' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  const { cart, wishlist, user, signOut } = useShop()

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const wishlistCount = wishlist.length

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-[#170a2f] via-[#240e46] to-[#170a2f] border-b border-purple-500/20 text-purple-200 text-[11px] sm:text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 tracking-widest uppercase text-[10px] text-purple-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            BTS-INSPIRED PURPLE SHOPPING UNIVERSE
          </div>
          <div className="mx-auto md:mx-0 text-center tracking-wide font-medium flex items-center gap-2">
            <span>✨ BTS FESTA 2026: Enjoy up to <b>70% OFF</b> with code</span>
            <span className="px-2 py-0.5 rounded bg-purple-900/80 border border-purple-400/40 text-purple-200 font-mono font-bold text-[10px]">
              BTSARMY20
            </span>
          </div>
          <Link
            to="/offers"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-white transition-colors uppercase tracking-wider"
          >
            Explore Deals <Icon name="chevronRight" size={12} />
          </Link>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d071d]/90 backdrop-blur-xl border-b border-purple-500/30 shadow-[0_10px_30px_rgba(5,2,12,0.7)]'
            : 'bg-[#0d071d]/75 backdrop-blur-md border-b border-purple-950/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-purple-300 hover:text-white hover:bg-purple-950/60 border border-purple-500/20 transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={22} />
          </button>

          {/* Logo with BTS-inspired emblem */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-purple-700 via-violet-600 to-fuchsia-600 border border-purple-400/50 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_28px_rgba(192,132,252,0.6)] transition-all">
              <Icon name="bts" size={24} className="text-white drop-shadow-[0_0_8px_#fff]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-extrabold tracking-[0.18em] uppercase font-['Cinzel',serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 group-hover:to-fuchsia-300 transition-colors">
                BORALUX
              </span>
              <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.25em] text-purple-300/80 uppercase -mt-0.5">
                Luxury Shopping Mall
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.18em] font-medium py-1 relative transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-purple-200/75 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-violet-500 rounded-full shadow-[0_0_10px_#c084fc]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:flex items-center w-48 lg:w-56"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-[#180d2e]/80 border border-purple-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all"
              />
              <button
                type="submit"
                className="absolute left-3 text-purple-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Icon name="search" size={15} />
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-purple-400/70 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Wishlist Link */}
            <Link
              to="/products?filter=wishlist"
              className="relative p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/25 text-purple-200 hover:text-white transition-all group"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Saved Wishlist"
            >
              <Icon
                name="heart"
                size={18}
                className={wishlistCount > 0 ? 'text-pink-400 fill-pink-500/40' : ''}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-900/50 to-violet-900/50 hover:from-purple-800/60 hover:to-violet-800/60 border border-purple-500/40 text-purple-100 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all group"
              aria-label={`Shopping Cart with ${totalCartCount} items`}
            >
              <Icon name="bag" size={18} className="text-purple-300 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider">BAG</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_#c084fc]">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Auth / Profile */}
            {user?.signedIn ? (
              <div className="flex items-center gap-2 pl-1">
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-200 hover:border-purple-400/50 transition-all"
                  title={`Logged in as ${user.name}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-500 text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden xl:inline text-xs font-medium text-purple-200">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  className="hidden sm:block text-[11px] text-purple-400 hover:text-purple-200 underline"
                  title="Sign Out"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/sign-in"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider text-purple-200 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-400/30 transition-all"
                >
                  Join VIP
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d071d]/98 border-b border-purple-500/30 px-6 py-6 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, BTS merch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b0d36] border border-purple-500/30 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-purple-400"
              />
              <Icon name="search" size={17} className="absolute left-3 top-3 text-purple-400" />
            </form>

            <nav className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-900/40 text-white font-bold border border-purple-500/30'
                        : 'text-purple-200/80 hover:bg-purple-950/30 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
              {user?.signedIn ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-purple-300">Signed in as <b>{user.name}</b></span>
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="text-xs text-purple-400 hover:text-white underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-xs font-semibold text-white"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
