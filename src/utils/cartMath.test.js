import { describe, expect, it } from 'vitest'
import {
  buildCartLines,
  calculateTotals,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  getItemCount,
  getSubtotal,
} from './cartMath'

describe('calculateTotals', () => {
  it('returns zeros for an empty cart', () => {
    expect(calculateTotals(0)).toEqual({ subtotal: 0, deliveryFee: 0, tax: 0, total: 0 })
  })

  it('adds delivery fee and 5% tax below the free delivery threshold', () => {
    expect(calculateTotals(200)).toEqual({ subtotal: 200, deliveryFee: DELIVERY_FEE, tax: 10, total: 250 })
  })

  it('waives delivery at or above the threshold', () => {
    const result = calculateTotals(FREE_DELIVERY_THRESHOLD)
    expect(result.deliveryFee).toBe(0)
    expect(result.total).toBe(525)
  })
})

describe('cart lines', () => {
  const catalog = { a: { id: 'a', price: 100 }, b: { id: 'b', price: 50 } }
  const getFood = (id) => catalog[id]

  it('builds lines, computes line totals and drops unknown foods', () => {
    const lines = buildCartLines(
      [
        { foodId: 'a', quantity: 2 },
        { foodId: 'b', quantity: 1 },
        { foodId: 'gone', quantity: 5 },
      ],
      getFood,
    )
    expect(lines).toHaveLength(2)
    expect(lines[0].lineTotal).toBe(200)
    expect(getSubtotal(lines)).toBe(250)
  })

  it('counts total items', () => {
    expect(getItemCount([{ quantity: 2 }, { quantity: 3 }])).toBe(5)
  })
})
