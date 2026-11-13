export const MAX_QUANTITY = 20

export const cartActions = {
  ADD: 'ADD',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
}

export function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD: {
      const qty = action.quantity ?? 1
      const existing = state.find((i) => i.foodId === action.foodId)
      if (existing) {
        return state.map((i) =>
          i.foodId === action.foodId ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + qty) } : i,
        )
      }
      return [...state, { foodId: action.foodId, quantity: Math.min(MAX_QUANTITY, qty) }]
    }
    case cartActions.INCREMENT:
      return state.map((i) =>
        i.foodId === action.foodId ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + 1) } : i,
      )
    case cartActions.DECREMENT:
      return state
        .map((i) => (i.foodId === action.foodId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    case cartActions.REMOVE:
      return state.filter((i) => i.foodId !== action.foodId)
    case cartActions.CLEAR:
      return []
    default:
      return state
  }
}

// Keeps only well-formed lines whose food still exists in the catalog.
export function sanitizeCart(raw, isKnownFood) {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(
      (i) =>
        i &&
        typeof i.foodId === 'string' &&
        Number.isInteger(i.quantity) &&
        i.quantity > 0 &&
        isKnownFood(i.foodId),
    )
    .map((i) => ({ foodId: i.foodId, quantity: Math.min(MAX_QUANTITY, i.quantity) }))
}
