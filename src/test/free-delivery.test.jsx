import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from './test-utils'
import { CART_STORAGE_KEY } from '../context/CartContext'

// Real catalog prices all end in 9, so exact ₹399/₹400/₹401 subtotals are unreachable with real data.
// A stubbed catalog lets us exercise the exact boundaries through the real cart and checkout UI.
vi.mock('../services/catalog', async (importOriginal) => {
  const original = await importOriginal()
  const stub = {
    p100: { id: 'p100', name: 'Stub Hundred', price: 100, image: '', restaurantId: 'r' },
    p133: { id: 'p133', name: 'Stub Boundary', price: 133, image: '', restaurantId: 'r' },
    p400: { id: 'p400', name: 'Stub FourHundred', price: 400, image: '', restaurantId: 'r' },
    p401: { id: 'p401', name: 'Stub FourOhOne', price: 401, image: '', restaurantId: 'r' },
  }
  return { ...original, getFoodById: (id) => stub[id] ?? original.getFoodById(id) }
})

const seedCart = (items) => window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
const getSummary = () => screen.getByRole('complementary', { name: /order summary/i })

describe('free delivery at the ₹400 boundary (cart UI)', () => {
  it.each([
    // items, subtotal, delivery label, payable
    [[{ foodId: 'p100', quantity: 1 }], '₹100', '₹40', '₹145'],
    [[{ foodId: 'p100', quantity: 2 }, { foodId: 'p133', quantity: 1 }], '₹333', '₹40', '₹389.65'],
    [[{ foodId: 'p133', quantity: 3 }], '₹399', '₹40', '₹458.95'],
    [[{ foodId: 'p400', quantity: 1 }], '₹400', 'Free', '₹420'],
    [[{ foodId: 'p401', quantity: 1 }], '₹401', 'Free', '₹421.05'],
  ])('cart %j shows subtotal %s, delivery %s, payable %s', (items, subtotal, delivery, payable) => {
    seedCart(items)
    renderApp('/cart')
    const summary = within(getSummary())
    expect(summary.getByText(subtotal)).toBeInTheDocument()
    expect(summary.getByText(delivery)).toBeInTheDocument()
    expect(summary.getByText(payable)).toBeInTheDocument()
  })

  it('shows ₹1 remaining at ₹399 and the confirmation at exactly ₹400', () => {
    seedCart([{ foodId: 'p133', quantity: 3 }])
    const { unmount } = renderApp('/cart')
    expect(within(getSummary()).getByRole('status')).toHaveTextContent('Add ₹1 more to unlock FREE delivery.')
    unmount()

    seedCart([{ foodId: 'p400', quantity: 1 }])
    renderApp('/cart')
    expect(within(getSummary()).getByRole('status')).toHaveTextContent(
      "Congratulations! You've unlocked FREE delivery.",
    )
  })

  it('flips the fee as quantity crosses ₹400 and when an item is removed', async () => {
    const user = userEvent.setup()
    seedCart([{ foodId: 'p100', quantity: 3 }, { foodId: 'p133', quantity: 1 }])
    renderApp('/cart')

    // 300 + 133 = 433 -> already free; decrease p133 away -> 300 -> fee back
    expect(within(getSummary()).getByText('Free')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /remove stub boundary from cart/i }))
    expect(within(getSummary()).queryByText('Free')).not.toBeInTheDocument()
    expect(within(getSummary()).getByText('₹40')).toBeInTheDocument()
    expect(within(getSummary()).getByRole('status')).toHaveTextContent('Add ₹100 more to unlock FREE delivery.')

    // 300 -> 400 by incrementing p100 exactly once
    await user.click(screen.getByRole('button', { name: /increase quantity of stub hundred/i }))
    expect(within(getSummary()).getByText('Free')).toBeInTheDocument()
    expect(within(getSummary()).getByText('₹420')).toBeInTheDocument()

    // 400 -> 300 by decrementing
    await user.click(screen.getByRole('button', { name: /decrease quantity of stub hundred/i }))
    expect(within(getSummary()).getByText('₹40')).toBeInTheDocument()
    expect(within(getSummary()).getByText('₹355')).toBeInTheDocument()
  })

  it('shows no delivery message or fee once the cart is emptied', async () => {
    const user = userEvent.setup()
    seedCart([{ foodId: 'p400', quantity: 1 }])
    renderApp('/cart')
    await user.click(screen.getByRole('button', { name: /remove stub fourhundred from cart/i }))
    expect(await screen.findByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument()
    expect(screen.queryByText(/free delivery/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: /order summary/i })).not.toBeInTheDocument()
  })
})

describe('cart and checkout consistency at the boundary', () => {
  it.each([
    [[{ foodId: 'p133', quantity: 3 }], '₹40', '₹458.95'],
    [[{ foodId: 'p400', quantity: 1 }], 'Free', '₹420'],
    [[{ foodId: 'p401', quantity: 1 }], 'Free', '₹421.05'],
  ])('checkout for %j uses delivery %s and payable %s', async (items, delivery, payable) => {
    const user = userEvent.setup()
    seedCart(items)
    renderApp('/cart')
    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }))

    const dialog = within(screen.getByRole('dialog', { name: /checkout/i }))
    const summary = within(getSummary())
    for (const scope of [summary, dialog]) {
      expect(scope.getByText(delivery)).toBeInTheDocument()
      expect(scope.getByText(payable)).toBeInTheDocument()
    }
    expect(dialog.getByRole('button', { name: `Pay ${payable}` })).toBeInTheDocument()
  })
})
