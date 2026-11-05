import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/useShop'
import { money } from '../data/catalog'
import Icon from './Icon'

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    setCheckoutModalOpen,
    cart,
    cartTotal,
    cartSubtotal,
    couponDiscount,
    shippingFee,
    clearCart,
    user,
  } = useShop()

  const [step, setStep] = useState('details') // 'details' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [formData, setFormData] = useState({
    name: user?.name || 'Purple Fan',
    email: user?.email || 'fandom@boralux.in',
    phone: user?.phone || '+91 98765 43210',
    address: 'Suite 404, Star View Residences, MG Road',
    city: 'Bengaluru',
    pincode: '560001',
  })
  const [orderNumber, setOrderNumber] = useState('')

  if (!isCheckoutModalOpen) return null

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const generatedOrder = `BX-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderNumber(generatedOrder)
    setStep('success')
    clearCart()
  }

  const handleClose = () => {
    setCheckoutModalOpen(false)
    setTimeout(() => setStep('details'), 300)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#070312]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#120824] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(147,51,234,0.25)] text-purple-100 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <Icon name="close" size={16} />
          </button>

          {step === 'details' ? (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white">
                  <Icon name="bag" size={16} />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] text-white">
                  BORALUX VIP Checkout
                </h2>
              </div>
              <p className="text-xs text-purple-300/70 mb-6">
                Complimentary luxury delivery or reserved in-store concierge pickup.
              </p>

              <form onSubmit={handlePlaceOrder} className="space-y-5">
                {/* Contact & Shipping */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300">
                    Shipping & Delivery Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-purple-300/80 mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0e30] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-purple-300/80 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0e30] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-purple-300/80 mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0e30] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-purple-300/80 mb-1">City</label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0e30] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-purple-300/80 mb-1">Postal Code</label>
                      <input
                        required
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a0e30] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-300">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'upi', label: 'Instant UPI / QR', icon: '✦' },
                      { id: 'card', label: 'Credit / Debit', icon: '💳' },
                      { id: 'cod', label: 'Concierge Pay', icon: '🛍' },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === m.id
                            ? 'bg-purple-900/40 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                            : 'bg-[#180c2e] border-purple-500/20 text-purple-300/80 hover:border-purple-500/40'
                        }`}
                      >
                        <div className="text-base mb-1">{m.icon}</div>
                        <div className="text-[11px] font-medium">{m.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-xl bg-[#170b2c] border border-purple-500/20 space-y-1.5 text-xs">
                  <div className="flex justify-between text-purple-300">
                    <span>Items Total ({cart.length} items):</span>
                    <span>{money(cartSubtotal)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-purple-400 font-medium">
                      <span>Discount Applied:</span>
                      <span>−{money(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-purple-300">
                    <span>Shipping:</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : money(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-purple-500/20">
                    <span>Grand Total:</span>
                    <span className="text-purple-300">{money(cartTotal)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="check" size={16} />
                  Confirm & Place Order ({money(cartTotal)})
                </button>
              </form>
            </div>
          ) : (
            /* Success Celebration */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white mb-5 shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-bounce">
                <Icon name="check" size={32} />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-purple-300 font-semibold mb-2">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                Thank You for Shopping at BORALUX! 💜
              </h2>
              <p className="text-xs text-purple-300/80 max-w-md mb-6 leading-relaxed">
                Your order <b className="text-purple-200">{orderNumber}</b> has been received and is being prepared with our signature purple velvet packaging. A confirmation has been sent to your email.
              </p>

              <div className="p-4 rounded-xl bg-[#190c30] border border-purple-500/20 text-xs text-purple-300/90 max-w-sm w-full mb-6 space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Order Reference:</span>
                  <b className="text-white">{orderNumber}</b>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <b className="text-white">{formData.name}</b>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <b className="text-white uppercase">{paymentMethod}</b>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <b className="text-purple-300">Within 24 Hours</b>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-white text-xs uppercase tracking-[0.2em] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
