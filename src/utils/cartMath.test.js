import { describe, expect, it } from 'vitest'
import {
  buildCartLines,
  calculateTotals,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  getAmountToFreeDelivery,
  getItemCount,
  getSubtotal,
  qualifiesForFreeDelivery,
} from './cartMath'

describe('calculateTotals', () => {
  it('returns zeros for an empty cart', () => {
    expect(calculateTotals(0)).toEqual({ subtotal: 0, deliveryFee: 0, tax: 0, total: 0 })
  })

  it('adds delivery fee and 5% tax below the free delivery threshold', () => {
    expect(calculateTotals(200)).toEqual({ subtotal: 200, deliveryFee: DELIVERY_FEE, tax: 10, total: 250 })
  })

  it('exposes the business constants', () => {
    expect(DELIVERY_FEE).toBe(40)
    expect(FREE_DELIVERY_THRESHOLD).toBe(400)
  })

  it.each([
    // subtotal, deliveryFee, tax, total
    [250, 40, 12.5, 302.5],
    [399, 40, 19.95, 458.95],
    [400, 0, 20, 420],
    [401, 0, 20.05, 421.05],
    [500, 0, 25, 525],
  ])('subtotal %i -> delivery %i, tax %d, payable %d', (subtotal, deliveryFee, tax, total) => {
    expect(calculateTotals(subtotal)).toEqual({ subtotal, deliveryFee, tax, total })
  })

  it('never includes the delivery fee in the qualifying subtotal', () => {
    // 380 + 40 delivery would be 420, but the food subtotal alone is below 400.
    const result = calculateTotals(380)
    expect(result.subtotal).toBe(380)
    expect(result.deliveryFee).toBe(DELIVERY_FEE)
    expect(result.total).toBe(439)
  })
})

describe('free delivery helpers', () => {
  it.each([
    [0, false],
    [250, false],
    [399, false],
    [400, true],
    [401, true],
  ])('qualifiesForFreeDelivery(%i) is %s', (subtotal, expected) => {
    expect(qualifiesForFreeDelivery(subtotal)).toBe(expected)
  })

  it.each([
    [0, 400],
    [250, 150],
    [300, 100],
    [399, 1],
    [400, 0],
    [401, 0],
    [1000, 0],
  ])('getAmountToFreeDelivery(%i) is %i', (subtotal, remaining) => {
    expect(getAmountToFreeDelivery(subtotal)).toBe(remaining)
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
