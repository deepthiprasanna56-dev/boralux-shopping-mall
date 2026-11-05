import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../components/Icon'

const faqs = [
  {
    question: 'What are the official mall operating hours?',
    answer:
      'BORALUX is open seven days a week from 10:00 AM to 10:30 PM. The Food Court, fine dining terraces, and rooftop cinema remain open until 11:30 PM.',
  },
  {
    question: 'Where is the official BTS Atelier & Fandom Lounge located?',
    answer:
      'The BTS Atelier is located on Level 3, adjacent to the Central Star Atrium. It features official licensed merchandise, photocard booths, interactive music pods, and VIP event staging.',
  },
  {
    question: 'Is valet parking and EV charging available?',
    answer:
      'Yes, complimentary valet parking is available at the North and West Grand Porticos for all VIP shoppers. We also feature 40+ high-speed universal EV charging bays on Basement Levels B1 and B2.',
  },
  {
    question: 'What is the return and exchange policy for purchases?',
    answer:
      'All purchases made at BORALUX boutiques and through our online storefront come with a 30-day luxury exchange guarantee. Items must be in original condition with tags and receipts intact.',
  },
  {
    question: 'How do I register for BTS FESTA 2026 or shopping festivals?',
    answer:
      'You can register for free digital VIP passes on our Events page. Simply click "Register Now" on the event card to generate your personalized entry pass.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="space-y-16 pb-20 pt-4">
      {/* 1. Contact Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#16072b] p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)]">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              WE ARE HERE FOR YOU
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel',serif] text-white uppercase tracking-tight">
              Concierge <em>& Guest Relations</em>
            </h1>

            <p className="text-xs sm:text-base text-purple-200/85 leading-relaxed font-light">
              Questions regarding boutique collections, event passes, private stylist bookings, or feedback? Our team is dedicated to providing an extraordinary experience.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'pin',
              title: 'Mall Location',
              details: 'BORALUX Promenade, MG Road, Bengaluru, Karnataka 560001',
              action: 'Get Directions',
              link: 'https://maps.google.com',
            },
            {
              icon: 'phone',
              title: 'VIP Concierge Phone',
              details: '+91 80 4920 7777 / Toll Free: 1800-BORALUX',
              action: 'Call Concierge',
              link: 'tel:+918049207777',
            },
            {
              icon: 'mail',
              title: 'Email Inquiries',
              details: 'concierge@boralux.in / support@boralux.in',
              action: 'Send Email',
              link: 'mailto:concierge@boralux.in',
            },
            {
              icon: 'clock',
              title: 'Operating Hours',
              details: 'Open Daily: 10:00 AM – 10:30 PM (Dining till 11:30 PM)',
              action: 'Plan Your Visit',
              link: '/stores',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#140827] border border-purple-500/20 hover:border-purple-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-4">
                  <Icon name={card.icon} size={20} />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-purple-300/80 leading-relaxed font-light mb-4">
                  {card.details}
                </p>
              </div>
              <a
                href={card.link}
                target={card.link.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className="text-xs font-semibold text-purple-400 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <span>{card.action}</span>
                <Icon name="arrow" size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Contact Form & Map Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#140827] border border-purple-500/30 shadow-xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-400">
                SEND US A NOTE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white mt-1">
                How Can We <em>Assist You?</em>
              </h2>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-purple-300 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kim Taehyung"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-purple-300 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-semibold mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-purple-200 text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="BTS Festa VIP Passes">BTS Festa VIP Passes</option>
                    <option value="Store Booking & Styling">Store Booking & Personal Styling</option>
                    <option value="Lost & Found">Lost & Found</option>
                    <option value="Corporate / Partnership">Corporate & Brand Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-semibold mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell us a little more about how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1d0e37] border border-purple-500/30 text-white placeholder-purple-400/40 text-xs focus:outline-none focus:border-purple-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="mail" size={16} />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-900/40 border border-green-500/40 text-green-300 flex items-center justify-center mx-auto">
                  <Icon name="check" size={28} />
                </div>
                <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white">
                  Message Delivered Successfully! 💜
                </h3>
                <p className="text-xs text-purple-300/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our Head Concierge will review your note and respond within 2-4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Mall Directions & Map Simulation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#140827] border border-purple-500/30 space-y-4">
              <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-white">
                Getting to BORALUX
              </h3>
              <p className="text-xs text-purple-300/80 leading-relaxed font-light">
                Conveniently located at the intersection of MG Road and Brigade Boulevard, direct metro connectivity is available via Mahatma Gandhi Road Station (Exit Gate 3).
              </p>

              <div className="space-y-2 pt-2 text-xs text-purple-200/90">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <b>Metro:</b> Purple Line · MG Road Station (Direct Skywalk)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <b>Valet:</b> Available at North Gate & Central Courtyard
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <b>EV Charging:</b> 40 Fast Chargers in Basement Level 1
                </div>
              </div>

              {/* Map Illustration Simulation */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-purple-500/25 bg-[#1f0e38] flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <Icon name="pin" size={32} className="text-purple-400 mx-auto animate-bounce" />
                  <span className="text-xs font-bold text-white block">
                    BORALUX Shopping Mall
                  </span>
                  <span className="text-[10px] text-purple-300/70 block">
                    12.9716° N, 77.5946° E · MG Road
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-semibold uppercase tracking-wider"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-white">
            Everything You Need <em>to Know</em>
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#140827] border border-purple-500/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left gap-4 hover:bg-purple-950/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-white font-['Playfair_Display',serif]">
                    {faq.question}
                  </span>
                  <span className={`text-purple-400 text-sm transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-5 text-xs text-purple-200/80 leading-relaxed font-light border-t border-purple-500/10 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
