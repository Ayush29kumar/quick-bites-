import { describe, expect, it } from 'vitest'
import { searchAll } from '../services/catalog'

describe('searchAll', () => {
  it('returns everything for an empty query', () => {
    const { foods, restaurants } = searchAll('')
    expect(foods.length).toBeGreaterThan(0)
    expect(restaurants.length).toBeGreaterThan(0)
  })

  it('finds foods by name, case-insensitively', () => {
    const { foods } = searchAll('PIZZA')
    expect(foods.some((f) => f.id === 'margherita-pizza')).toBe(true)
  })

  it('finds restaurants by name and cuisine', () => {
    expect(searchAll('dragon').restaurants.map((r) => r.id)).toEqual(['dragon-wok'])
    expect(searchAll('kebabs').restaurants.map((r) => r.id)).toEqual(['tandoori-nights'])
  })

  it('finds foods by restaurant name', () => {
    const { foods } = searchAll('Burger Barn')
    expect(foods.length).toBeGreaterThan(0)
    expect(foods.every((f) => f.restaurantId === 'burger-barn')).toBe(true)
  })

  it('returns nothing for a nonsense query', () => {
    const { foods, restaurants } = searchAll('xyzzy-no-match')
    expect(foods).toEqual([])
    expect(restaurants).toEqual([])
  })
})
