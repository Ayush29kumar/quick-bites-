import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { OrdersContext } from '../context/OrdersContext'
import { ToastContext } from '../components/ui/Toast'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider')
  return ctx
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
