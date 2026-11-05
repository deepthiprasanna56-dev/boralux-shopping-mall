import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function Auth({ mode = 'signin' }) {
  const signup = mode === 'signup'
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const submit = (event) => {
    event.preventDefault()
    setMessage(signup ? 'Your Boralux account is ready.' : 'Welcome back to Boralux.')
    window.setTimeout(() => navigate('/'), 900)
  }
  return <motion.main className="page-content auth-page" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><div className="auth-card"><span className="eyebrow">{signup ? 'MAKE YOURSELF AT HOME' : 'A LITTLE HELLO'}</span><h1>{signup ? <>Join the<br/><em>Boralux world.</em></> : <>Good to have<br/><em>you here.</em></>}</h1><p>{signup ? 'Create an account for saved favourites and special little perks.' : 'Sign in for saved favourites and a smoother day out.'}</p><form className="signin-form" onSubmit={submit}>{signup && <label>YOUR NAME<input type="text" autoComplete="name" required placeholder="How should we call you?"/></label>}<label>EMAIL ADDRESS<input type="email" autoComplete="email" required placeholder="you@somewhere.com"/></label><label>PASSWORD<input type="password" minLength="8" autoComplete={signup ? 'new-password' : 'current-password'} required placeholder="At least 8 characters"/></label><button className="button button-dark full-button">{signup ? 'CREATE ACCOUNT' : 'SIGN IN'} <Icon name="arrow" size={16}/></button></form>{message && <p className="form-success" role="status">{message}</p>}<p className="signup-note">{signup ? 'Already have an account?' : 'New around here?'} <Link to={signup ? '/sign-in' : '/sign-up'}>{signup ? 'Sign in' : 'Create an account'}</Link></p></div></motion.main>
}
