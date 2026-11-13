import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { seedOrders } from '../data/seedOrders'
import { loadJSON, saveJSON } from '../utils/storage'

export const ORDERS_STORAGE_KEY = 'quickbite.orders'
export const OrdersContext = createContext(null)

const init = () => {
  const stored = loadJSON(ORDERS_STORAGE_KEY, [])
  return Array.isArray(stored) ? stored : []
}

export function OrdersProvider({ children }) {
  // Only user-placed orders are persisted; demo orders are always prepended.
  const [placedOrders, setPlacedOrders] = useState(init)

  useEffect(() => {
    saveJSON(ORDERS_STORAGE_KEY, placedOrders)
  }, [placedOrders])

  const placeOrder = useCallback((order) => {
    const newOrder = {
      id: `QB-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      status: 'Confirmed',
      ...order,
    }
    setPlacedOrders((prev) => [newOrder, ...prev])
    return newOrder
  }, [])

  const orders = useMemo(() => [...placedOrders, ...seedOrders], [placedOrders])

  const value = useMemo(() => ({ orders, placeOrder }), [orders, placeOrder])
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}
