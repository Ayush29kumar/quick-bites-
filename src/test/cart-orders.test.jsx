import { describe, expect, it } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'
import { CART_STORAGE_KEY } from '../context/CartContext'
import { ORDERS_STORAGE_KEY } from '../context/OrdersContext'

describe('cart', () => {
  it('shows an empty state when the cart is empty', () => {
    renderApp('/cart')
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /browse restaurants/i })).toBeInTheDocument()
  })

  it('supports add, increase, decrease, remove and totals', async () => {
    const user = userEvent.setup()
    renderApp('/restaurants/napoli-slice-house')

    await user.click(screen.getByRole('button', { name: /add margherita pizza to cart/i }))
    await user.click(screen.getByRole('button', { name: /add garlic bread to cart/i }))

    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByLabelText('2 items in cart')).toBeInTheDocument()
    await user.click(within(nav).getByRole('link', { name: /cart/i }))

    const list = await screen.findByRole('list', { name: /cart items/i })
    expect(within(list).getByText('Margherita Pizza')).toBeInTheDocument()

    // subtotal = 249 + 129 = 378, delivery 40, tax 18.9 => 436.9
    const summary = screen.getByRole('complementary', { name: /order summary/i })
    expect(within(summary).getByText(/378/)).toBeInTheDocument()
    expect(within(summary).getByText(/436\.9/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /increase quantity of margherita pizza/i }))
    // subtotal 627 -> delivery still 40, tax 31.35 => 698.35
    expect(within(summary).getByText(/698\.35/)).toBeInTheDocument()
    expect(within(summary).queryByText('Free')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /decrease quantity of margherita pizza/i }))
    await user.click(screen.getByRole('button', { name: /decrease quantity of margherita pizza/i }))
    expect(within(list).queryByText('Margherita Pizza')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove garlic bread from cart/i }))
    expect(await screen.findByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument()
  })

  it('restores the cart from localStorage after a remount', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ foodId: 'fudgy-brownie', quantity: 3 }]))
    renderApp('/cart')
    expect(screen.getByText('Fudgy Brownie')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /quantity for fudgy brownie/i })).toHaveTextContent('3')
  })

  it('ignores corrupt cart data in localStorage', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, '{broken')
    renderApp('/cart')
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument()
  })
})

describe('checkout and orders', () => {
  it('lists the demo orders', () => {
    renderApp('/orders')
    expect(screen.getByText('Order QB-10001')).toBeInTheDocument()
    expect(screen.getByText('Order QB-10002')).toBeInTheDocument()
    expect(screen.getByText('Order QB-10003')).toBeInTheDocument()
  })

  it('validates checkout fields', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ foodId: 'masala-chai', quantity: 1 }]))
    renderApp('/cart')
    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }))
    await user.click(screen.getByRole('button', { name: /^pay/i }))
    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/valid phone number/i)).toBeInTheDocument()
    expect(screen.getByText(/full delivery address/i)).toBeInTheDocument()
  })

  it('places an order, clears the cart and shows it in order history', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ foodId: 'masala-chai', quantity: 2 }]))
    renderApp('/cart')

    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }))
    await user.type(screen.getByLabelText(/full name/i), 'Asha Rao')
    await user.type(screen.getByLabelText(/phone number/i), '9876543210')
    await user.type(screen.getByLabelText(/delivery address/i), '12 MG Road, Bengaluru')
    await user.click(screen.getByRole('button', { name: /^pay/i }))

    expect(await screen.findByRole('heading', { level: 1, name: /your orders/i }, { timeout: 4000 })).toBeInTheDocument()
    expect(screen.getByText('Confirmed')).toBeInTheDocument()
    expect(screen.getByText(/2 × Masala Chai/)).toBeInTheDocument()
    expect(screen.getByText('Order QB-10001')).toBeInTheDocument()

    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY))).toEqual([]))
    expect(JSON.parse(window.localStorage.getItem(ORDERS_STORAGE_KEY))).toHaveLength(1)
  })
})
