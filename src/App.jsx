import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IntroSplash from './components/IntroSplash'
import Toast from './components/Toast'
import CheckoutModal from './components/CheckoutModal'
import EventModal from './components/EventModal'
import StoreModal from './components/StoreModal'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import StoreDirectory from './pages/StoreDirectory'
import Offers from './pages/Offers'
import Events from './pages/Events'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function RouteTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Storefront() {
  const location = useLocation()

  // Scroll to top on route change or to hash element
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-[#0b0518] text-[#f7f2ff] selection:bg-[#9333ea] selection:text-white flex flex-col justify-between overflow-x-hidden font-['DM_Sans',sans-serif]">
      {/* 0. Cinematic Intro Splash Screen */}
      <IntroSplash />

      {/* Main App Layout */}
      <div>
        <Navbar />

        <main className="min-h-[70vh]">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<RouteTransition><Home /></RouteTransition>} />
              <Route path="/products" element={<RouteTransition><Products /></RouteTransition>} />
              <Route path="/product/:id" element={<RouteTransition><ProductDetails /></RouteTransition>} />
              <Route path="/stores" element={<RouteTransition><StoreDirectory /></RouteTransition>} />
              <Route path="/offers" element={<RouteTransition><Offers /></RouteTransition>} />
              <Route path="/events" element={<RouteTransition><Events /></RouteTransition>} />
              <Route path="/cart" element={<RouteTransition><Cart /></RouteTransition>} />
              <Route path="/sign-in" element={<RouteTransition><Login /></RouteTransition>} />
              <Route path="/sign-up" element={<RouteTransition><Signup /></RouteTransition>} />
              <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
              <Route path="*" element={<RouteTransition><NotFound /></RouteTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      {/* Global Interactive Modals and Toast */}
      <Toast />
      <CheckoutModal />
      <EventModal />
      <StoreModal />
    </div>
  )
}

export default function App() {
  return (
    <ShopProvider>
      <Storefront />
    </ShopProvider>
  )
}
