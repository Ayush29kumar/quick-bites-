import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'
import { CART_STORAGE_KEY } from '../context/CartContext'

describe('navigation', () => {
  it.each([
    ['Restaurants', /^restaurants$/i, '/restaurants'],
    ['Categories', /^categories$/i, '/categories'],
    ['Cart', /your cart/i, '/cart'],
    ['Orders', /your orders/i, '/orders'],
  ])('navbar link %s opens its page', async (label, heading) => {
    const user = userEvent.setup()
    renderApp('/')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    await user.click(within(nav).getByRole('link', { name: new RegExp(`^${label}`) }))
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    await user.click(within(nav).getByRole('link', { name: 'Home' }))
    expect(await screen.findByRole('heading', { level: 1, name: /delicious food/i })).toBeInTheDocument()
  })

  it('shows the 404 page for unknown routes', () => {
    renderApp('/does-not-exist')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })

  it('home page shows categories, popular restaurants and recommended food', () => {
    renderApp('/')
    for (const name of ['Pizza', 'Burgers', 'Indian', 'Chinese', 'Desserts', 'Beverages']) {
      expect(screen.getAllByRole('link', { name }).length).toBeGreaterThan(0)
    }
    expect(screen.getByRole('heading', { name: /popular restaurants/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /recommended for you/i })).toBeInTheDocument()
  })
})

describe('restaurants and categories', () => {
  it('restaurant page lists only that restaurant\'s foods', () => {
    renderApp('/restaurants/dragon-wok')
    expect(screen.getByRole('heading', { level: 1, name: 'Dragon Wok' })).toBeInTheDocument()
    expect(screen.getByText('Veg Momos')).toBeInTheDocument()
    expect(screen.queryByText('Margherita Pizza')).not.toBeInTheDocument()
  })

  it('category page lists foods in that category', () => {
    renderApp('/categories/desserts')
    expect(screen.getByRole('heading', { level: 1, name: 'Desserts' })).toBeInTheDocument()
    expect(screen.getByText('Fudgy Brownie')).toBeInTheDocument()
    expect(screen.queryByText('Butter Chicken')).not.toBeInTheDocument()
  })

  it('shows a not-found state for unknown restaurant', () => {
    renderApp('/restaurants/nope')
    expect(screen.getByText(/restaurant not found/i)).toBeInTheDocument()
  })
})

describe('search', () => {
  it('shows matching results', () => {
    renderApp('/search?q=biryani')
    expect(screen.getByText('Chicken Biryani')).toBeInTheDocument()
    expect(screen.queryByText('Margherita Pizza')).not.toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', () => {
    renderApp('/search?q=zzzzqqq')
    expect(screen.getByRole('heading', { name: /no results found/i })).toBeInTheDocument()
  })

  it('navigates to results when submitting the search form', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.type(screen.getAllByRole('searchbox')[0], 'momos{enter}')
    expect(await screen.findByText('Veg Momos')).toBeInTheDocument()
  })
})

describe('food detail', () => {
  it('adds the chosen quantity to the cart', async () => {
    const user = userEvent.setup()
    renderApp('/foods/butter-chicken')
    await user.click(screen.getByRole('button', { name: /increase quantity of butter chicken/i }))
    await user.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY))).toEqual([
      { foodId: 'butter-chicken', quantity: 2 },
    ])
  })
})
