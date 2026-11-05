import React, { createContext, useContext, useEffect, useState } from 'react'
import { coupons, products } from '../data/catalog'

export const ShopContext = createContext(null)

const restore = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => restore('boralux_cart', []))
  const [wishlist, setWishlist] = useState(() => restore('boralux_wishlist', ['bts-1', 'bts-2']))
  const [user, setUser] = useState(() =>
    restore('boralux_user', {
      name: 'ARMY VIP',
      email: 'fandom@boralux.in',
      phone: '+91 98765 43210',
      signedIn: true,
    })
  )
  const [appliedCoupon, setAppliedCoupon] = useState(() => restore('boralux_coupon', null))
  const [notice, setNotice] = useState(null)
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [activeEventModal, setActiveEventModal] = useState(null)
  const [activeStoreModal, setActiveStoreModal] = useState(null)

  // Session intro state
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('boralux_intro_seen')
  })

  useEffect(() => {
    localStorage.setItem('boralux_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('boralux_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (user) {
      localStorage.setItem('boralux_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('boralux_user')
    }
  }, [user])

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('boralux_coupon', JSON.stringify(appliedCoupon))
    } else {
      localStorage.removeItem('boralux_coupon')
    }
  }, [appliedCoupon])

  const notify = (message, type = 'success') => {
    setNotice({ message, type, id: Date.now() })
    window.clearTimeout(notify.timer)
    notify.timer = window.setTimeout(() => setNotice(null), 3000)
  }

  const addToCart = (product, selectedSize = '', selectedColor = '', quantity = 1) => {
    const size = selectedSize || product.sizes?.[0] || 'Standard'
    const color = selectedColor || product.colors?.[0] || product.color || '#9333ea'
    const cartKey = `${product.id}-${size}-${color}`

    setCart((prev) => {
      const exists = prev.find((item) => item.cartKey === cartKey)
      if (exists) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + quantity } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          cartKey,
          name: product.name,
          brand: product.brand,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          category: product.category,
          size,
          color,
          qty: quantity,
        },
      ]
    })

    notify(`Added "${product.name}" to your shopping bag! 💜`, 'success')
  }

  const updateQty = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartKey === cartKey) {
            const nextQty = item.qty + delta
            return nextQty > 0 ? { ...item, qty: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey))
    notify('Item removed from your bag.', 'info')
  }

  const clearCart = () => {
    setCart([])
    setAppliedCoupon(null)
  }

  const moveToWishlist = (cartKey) => {
    const item = cart.find((i) => i.cartKey === cartKey)
    if (item) {
      if (!wishlist.includes(item.id)) {
        setWishlist((prev) => [...prev, item.id])
      }
      removeFromCart(cartKey)
      notify(`Moved "${item.name}" to your wishlist.`, 'wishlist')
    }
  }

  const toggleWishlist = (product) => {
    const id = typeof product === 'string' ? product : product.id
    const prodObj = typeof product === 'string' ? products.find((p) => p.id === id) : product
    const name = prodObj?.name || 'Item'

    if (wishlist.includes(id)) {
      setWishlist((prev) => prev.filter((itemId) => itemId !== id))
      notify(`Removed "${name}" from your wishlist.`, 'info')
    } else {
      setWishlist((prev) => [...prev, id])
      notify(`Saved "${name}" to your wishlist! 💜`, 'wishlist')
    }
  }

  const isInWishlist = (id) => wishlist.includes(id)

  const applyCoupon = (codeStr) => {
    const trimmed = (codeStr || '').trim().toUpperCase()
    const found = coupons.find((c) => c.code === trimmed)
    if (!found) {
      notify(`Invalid promo code "${trimmed}". Try BORALUX10 or BTSARMY20.`, 'error')
      return { success: false, message: 'Invalid promo code' }
    }
    setAppliedCoupon(found)
    notify(`Coupon "${found.code}" applied! ${found.description} ✨`, 'success')
    return { success: true, coupon: found }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    notify('Coupon removed.', 'info')
  }

  const signIn = (userData) => {
    const newUser = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      signedIn: true,
    }
    setUser(newUser)
    notify(`Welcome to BORALUX, ${newUser.name}! 💜`, 'success')
    return true
  }

  const signUp = (userData) => {
    const newUser = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      signedIn: true,
    }
    setUser(newUser)
    notify(`Welcome to BORALUX Purple Universe, ${newUser.name}! 💜`, 'success')
    return true
  }

  const signOut = () => {
    setUser(null)
    notify('Signed out successfully. See you again soon!', 'info')
  }

  const replayIntro = () => {
    sessionStorage.removeItem('boralux_intro_seen')
    setShowIntro(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const dismissIntro = () => {
    sessionStorage.setItem('boralux_intro_seen', '1')
    setShowIntro(false)
  }

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartSavings = cart.reduce(
    (sum, item) => sum + (item.oldPrice ? (item.oldPrice - item.price) * item.qty : 0),
    0
  )

  let couponDiscount = 0
  if (appliedCoupon && cartSubtotal >= (appliedCoupon.minSpend || 0)) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    } else if (appliedCoupon.flatDiscount) {
      couponDiscount = appliedCoupon.flatDiscount
    }
  }

  // Complimentary shipping over ₹2000
  const shippingFee = cartSubtotal >= 2000 || cartSubtotal === 0 ? 0 : 199
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee)

  const value = {
    cart,
    wishlist,
    user,
    appliedCoupon,
    notice,
    cartSubtotal,
    cartSavings,
    couponDiscount,
    shippingFee,
    cartTotal,
    isCheckoutModalOpen,
    setCheckoutModalOpen,
    activeEventModal,
    setActiveEventModal,
    activeStoreModal,
    setActiveStoreModal,
    showIntro,
    dismissIntro,
    replayIntro,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    moveToWishlist,
    toggleWishlist,
    isInWishlist,
    applyCoupon,
    removeCoupon,
    signIn,
    signUp,
    signOut,
    notify,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}
