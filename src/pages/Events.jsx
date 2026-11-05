import React from 'react'
import { motion } from 'framer-motion'
import { events, imageUrl } from '../data/catalog'
import EventCard from '../components/EventCard'
import Icon from '../components/Icon'
import { useShop } from '../context/useShop'

const pastEvents = [
  {
    title: 'Spring Fashion Runway 2026',
    date: 'March 20, 2026',
    attendees: '1,400+ Guests',
    image: 'photo-1469334031218-e382a71b716b',
    highlight: 'Haute couture showcase with international models & live jazz.',
  },
  {
    title: 'Sound & Soul Audiophile Night',
    date: 'February 14, 2026',
    attendees: '850+ Music Connoisseurs',
    image: 'photo-1511671782779-c97d3d27a1d4',
    highlight: 'Vinyl listening session with vintage tube amplification & craft coffee.',
  },
  {
    title: 'Winter BTS Fandom Gathering',
    date: 'December 30, 2025',
    attendees: '2,200+ Fans',
    image: 'photo-1514525253161-7a46d19cd819',
    highlight: 'Purple ocean laser show celebrating V’s birthday with charity donation drive.',
  },
]

export default function Events() {
  const { setActiveEventModal } = useShop()

  return (
    <div className="space-y-16 pb-20 pt-4">
      {/* 1. Large Event Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#16072b] p-8 sm:p-14 lg:p-18 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(168,85,247,0.3)]">
          <div className="absolute inset-0 opacity-25">
            <img
              src={imageUrl('photo-1514525253161-7a46d19cd819', 1600)}
              alt="BTS Galaxy Event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#110522] via-[#16072be6] 60% to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              LIVE EXPERIENCES & CELEBRATIONS
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Cinzel',serif] text-white uppercase leading-tight">
              Mall Events & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-violet-300">
                Purple Festivals
              </span>
            </h1>

            <p className="text-xs sm:text-base text-purple-200/85 leading-relaxed font-light">
              Join thousands of fans and visitors at BORALUX for landmark shopping festivals, DJ nights, K-Pop choreography battles, and exclusive merchandise drop parties.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveEventModal(events[0])}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
              >
                <Icon name="ticket" size={15} />
                <span>Reserve VIP Festa Pass</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300/80 text-center">
          ℹ️ <b>Community & Promotional Notice:</b> All listed events are promotional mall celebrations organized by BORALUX to celebrate lifestyle, art, and fandom. Complimentary passes are free for all registered guests.
        </div>
      </div>

      {/* 2. Upcoming Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between pb-3 border-b border-purple-500/20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
              UPCOMING CALENDAR
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Scheduled <em>Events & Experiences</em>
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {events.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </section>

      {/* 3. Past Events Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between pb-3 border-b border-purple-500/20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-purple-400">
              MEMORIES IN PURPLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Playfair_Display',serif] text-white">
              Past <em>Highlights Gallery</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastEvents.map((pe, idx) => (
            <motion.div
              key={pe.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="rounded-2xl overflow-hidden bg-[#140827] border border-purple-500/20 group"
            >
              <div className="relative h-48 overflow-hidden bg-purple-950">
                <img
                  src={imageUrl(pe.image, 600)}
                  alt={pe.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140827] via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono text-purple-200 bg-black/70 border border-white/20">
                  {pe.date}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-purple-400 font-semibold">
                  {pe.attendees}
                </span>
                <h3 className="text-base font-bold font-['Playfair_Display',serif] text-white">
                  {pe.title}
                </h3>
                <p className="text-xs text-purple-300/80 leading-relaxed font-light">
                  {pe.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
