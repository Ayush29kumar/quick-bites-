export const DELIVERY_FEE = 40
export const TAX_RATE = 0.05

const round2 = (n) => Math.round(n * 100) / 100

export function calculateTotals(subtotal) {
  const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE
  const tax = round2(subtotal * TAX_RATE)
  const total = round2(subtotal + deliveryFee + tax)
  return { subtotal: round2(subtotal), deliveryFee, tax, total }
}

// Joins cart lines ({ foodId, quantity }) with catalog items. Unknown ids are dropped.
export function buildCartLines(cartItems, getFoodById) {
  return cartItems
    .map(({ foodId, quantity }) => {
      const food = getFoodById(foodId)
      return food ? { food, quantity, lineTotal: food.price * quantity } : null
    })
    .filter(Boolean)
}

export function getSubtotal(lines) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0)
}

export function getItemCount(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}
