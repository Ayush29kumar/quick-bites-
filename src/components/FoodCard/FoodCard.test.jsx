import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FoodCard from './FoodCard'
import { getFoodById } from '../../services/catalog'
import { renderWithProviders } from '../../test/test-utils'
import { CART_STORAGE_KEY } from '../../context/CartContext'

describe('FoodCard', () => {
  const food = getFoodById('margherita-pizza')

  it('shows image, name, description, price, rating and restaurant', () => {
    renderWithProviders(<FoodCard food={food} />)
    expect(screen.getByRole('img', { name: food.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: food.name })).toBeInTheDocument()
    expect(screen.getByText(food.description)).toBeInTheDocument()
    expect(screen.getByText(/₹\s?249/)).toBeInTheDocument()
    expect(screen.getByLabelText(/rated 4.5 out of 5/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Napoli Slice House' })).toBeInTheDocument()
  })

  it('adds the item to the cart and persists it', async () => {
    const user = userEvent.setup()
    renderWithProviders(<FoodCard food={food} />)
    await user.click(screen.getByRole('button', { name: /add margherita pizza to cart/i }))
    await user.click(screen.getByRole('button', { name: /add margherita pizza to cart/i }))
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY))).toEqual([
      { foodId: 'margherita-pizza', quantity: 2 },
    ])
    expect(screen.getAllByText(/added to cart/i).length).toBeGreaterThan(0)
  })
})
