import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/useShop'
import Icon from './Icon'

export default function EventModal() {
  const { activeEventModal, setActiveEventModal, user, notify } = useShop()
  const [registered, setRegistered] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [attendeeName, setAttendeeName] = useState(user?.name || '')
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || '')

  if (!activeEventModal) return null

  const handleRegister = (e) => {
    e.preventDefault()
    const passCode = `BX-PASS-${Math.floor(1000 + Math.random() * 9000)}`
    setTicketId(passCode)
    setRegistered(true)
    notify(`VIP Pass generated for ${activeEventModal.title}! 💜`, 'success')
  }

  const handleClose = () => {
    setActiveEventModal(null)
    setTimeout(() => setRegistered(false), 300)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#06020f]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#140827] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.3)] text-purple-100 z-10 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <Icon name="close" size={16} />
          </button>

          {!registered ? (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-[10px] tracking-[0.2em] uppercase mb-3">
                <Icon name="ticket" size={12} />
                VIP EVENT RSVP
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                {activeEventModal.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-purple-300/80 mb-4 pb-4 border-b border-purple-500/20">
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" size={13} className="text-purple-400" />
                  {activeEventModal.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" size={13} className="text-purple-400" />
                  {activeEventModal.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="pin" size={13} className="text-purple-400" />
                  {activeEventModal.location}
                </span>
              </div>

              <p className="text-xs text-purple-300/80 leading-relaxed mb-5">
                {activeEventModal.description}
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[11px] text-purple-300/90 mb-1">Your Full Name</label>
                  <input
                    required
                    type="text"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="Enter name for VIP pass"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1b0d34] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-purple-300/90 mb-1">Email for Digital Pass</label>
                  <input
                    required
                    type="email"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="you@somewhere.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1b0d34] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="text-[10px] text-purple-400/70 italic">
                  * Note: This is an exclusive promotional event at BORALUX shopping mall. Complimentary entry for all registered fans.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="ticket" size={16} />
                  Reserve VIP Pass (Complimentary)
                </button>
              </form>
            </div>
          ) : (
            /* Digital VIP Pass Generated */
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-200 mx-auto mb-4 animate-pulse">
                <Icon name="check" size={28} />
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-purple-300 font-semibold">
                Pass Confirmed
              </span>
              <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-white my-1">
                You're On The VIP List! 💜
              </h2>
              <p className="text-xs text-purple-300/80 mb-6">
                Present this digital pass at the entrance of {activeEventModal.location}.
              </p>

              {/* Boarding Pass Style Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#241045] to-[#160a2b] border border-purple-500/40 text-left relative overflow-hidden shadow-[0_0_25px_rgba(147,51,234,0.3)] mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-purple-400">BORALUX EVENT PASS</span>
                    <h3 className="text-sm font-bold text-white font-['Playfair_Display',serif]">
                      {activeEventModal.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-400/30 text-[10px] font-mono text-purple-300">
                    {ticketId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] text-purple-200/90 mb-4 pb-4 border-b border-dashed border-purple-500/30">
                  <div>
                    <span className="text-[9px] text-purple-400/70 block uppercase">Attendee</span>
                    <b>{attendeeName}</b>
                  </div>
                  <div>
                    <span className="text-[9px] text-purple-400/70 block uppercase">Date & Time</span>
                    <b>{activeEventModal.date}</b>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-purple-300/70">
                  <span>Admit: 1 VIP Guest</span>
                  <span className="text-purple-400 font-mono">STATUS: CONFIRMED</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-500/30 text-white text-xs uppercase tracking-[0.2em] transition-all"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
