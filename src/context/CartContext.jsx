import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import { cartActions, cartReducer, sanitizeCart } from './cartReducer'
import { getFoodById } from '../services/catalog'
import { loadJSON, saveJSON } from '../utils/storage'
import { buildCartLines, calculateTotals, getItemCount, getSubtotal } from '../utils/cartMath'

export const CART_STORAGE_KEY = 'quickbite.cart'
export const CartContext = createContext(null)

const init = () => sanitizeCart(loadJSON(CART_STORAGE_KEY, []), (id) => Boolean(getFoodById(id)))

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, init)

  useEffect(() => {
    saveJSON(CART_STORAGE_KEY, items)
  }, [items])

  const addItem = useCallback((foodId, quantity = 1) => dispatch({ type: cartActions.ADD, foodId, quantity }), [])
  const incrementItem = useCallback((foodId) => dispatch({ type: cartActions.INCREMENT, foodId }), [])
  const decrementItem = useCallback((foodId) => dispatch({ type: cartActions.DECREMENT, foodId }), [])
  const removeItem = useCallback((foodId) => dispatch({ type: cartActions.REMOVE, foodId }), [])
  const clearCart = useCallback(() => dispatch({ type: cartActions.CLEAR }), [])

  const value = useMemo(() => {
    const lines = buildCartLines(items, getFoodById)
    const totals = calculateTotals(getSubtotal(lines))
    return {
      items,
      lines,
      itemCount: getItemCount(items),
      ...totals,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    }
  }, [items, addItem, incrementItem, decrementItem, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
