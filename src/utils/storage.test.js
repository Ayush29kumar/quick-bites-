import { describe, expect, it, vi } from 'vitest'
import { loadJSON, saveJSON } from './storage'
import { formatPrice } from './format'

describe('storage', () => {
  it('round-trips JSON values', () => {
    saveJSON('k', { a: 1 })
    expect(loadJSON('k', null)).toEqual({ a: 1 })
  })

  it('returns the fallback for missing keys', () => {
    expect(loadJSON('missing', 'fallback')).toBe('fallback')
  })

  it('returns the fallback for corrupt JSON', () => {
    window.localStorage.setItem('bad', '{not json')
    expect(loadJSON('bad', [])).toEqual([])
  })

  it('does not throw when storage writes fail', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota')
    })
    expect(() => saveJSON('k', 1)).not.toThrow()
    spy.mockRestore()
  })
})

describe('formatPrice', () => {
  it('formats rupees', () => {
    expect(formatPrice(249)).toContain('249')
    expect(formatPrice(249)).toContain('₹')
  })
})
