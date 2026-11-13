import { describe, expect, it } from 'vitest'
import { cartActions, cartReducer, MAX_QUANTITY, sanitizeCart } from './cartReducer'

const { ADD, INCREMENT, DECREMENT, REMOVE, CLEAR } = cartActions

describe('cartReducer', () => {
  it('adds a new item with quantity 1', () => {
    expect(cartReducer([], { type: ADD, foodId: 'a' })).toEqual([{ foodId: 'a', quantity: 1 }])
  })

  it('increases quantity when adding an existing item', () => {
    const state = [{ foodId: 'a', quantity: 1 }]
    expect(cartReducer(state, { type: ADD, foodId: 'a', quantity: 2 })).toEqual([{ foodId: 'a', quantity: 3 }])
  })

  it('caps quantity at MAX_QUANTITY', () => {
    const state = [{ foodId: 'a', quantity: MAX_QUANTITY }]
    expect(cartReducer(state, { type: INCREMENT, foodId: 'a' })[0].quantity).toBe(MAX_QUANTITY)
  })

  it('decrements quantity', () => {
    const state = [{ foodId: 'a', quantity: 3 }]
    expect(cartReducer(state, { type: DECREMENT, foodId: 'a' })).toEqual([{ foodId: 'a', quantity: 2 }])
  })

  it('removes the item when decremented to zero', () => {
    const state = [{ foodId: 'a', quantity: 1 }]
    expect(cartReducer(state, { type: DECREMENT, foodId: 'a' })).toEqual([])
  })

  it('removes a specific item', () => {
    const state = [
      { foodId: 'a', quantity: 1 },
      { foodId: 'b', quantity: 2 },
    ]
    expect(cartReducer(state, { type: REMOVE, foodId: 'a' })).toEqual([{ foodId: 'b', quantity: 2 }])
  })

  it('clears the cart', () => {
    expect(cartReducer([{ foodId: 'a', quantity: 1 }], { type: CLEAR })).toEqual([])
  })

  it('ignores unknown actions', () => {
    const state = [{ foodId: 'a', quantity: 1 }]
    expect(cartReducer(state, { type: 'NOPE' })).toBe(state)
  })
})

describe('sanitizeCart', () => {
  const known = (id) => id === 'a'

  it('returns an empty cart for non-array input', () => {
    expect(sanitizeCart({ bad: true }, known)).toEqual([])
    expect(sanitizeCart(null, known)).toEqual([])
  })

  it('drops malformed lines and unknown foods', () => {
    const raw = [
      { foodId: 'a', quantity: 2 },
      { foodId: 'zzz', quantity: 1 },
      { foodId: 'a', quantity: -1 },
      { foodId: 'a', quantity: 1.5 },
      null,
      { quantity: 1 },
    ]
    expect(sanitizeCart(raw, known)).toEqual([{ foodId: 'a', quantity: 2 }])
  })
})
