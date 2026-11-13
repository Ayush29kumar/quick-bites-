import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import FreeDeliveryBanner from './FreeDeliveryBanner'

describe('FreeDeliveryBanner', () => {
  it('renders nothing for an empty cart', () => {
    const { container } = render(<FreeDeliveryBanner subtotal={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows the remaining amount and progress below the threshold', () => {
    render(<FreeDeliveryBanner subtotal={300} />)
    expect(screen.getByRole('status')).toHaveTextContent('Add ₹100 more to unlock FREE delivery.')
    expect(screen.getByRole('progressbar', { name: /free delivery progress/i })).toHaveAttribute('aria-valuenow', '75')
  })

  it('shows ₹1 remaining at ₹399', () => {
    render(<FreeDeliveryBanner subtotal={399} />)
    expect(screen.getByRole('status')).toHaveTextContent('Add ₹1 more to unlock FREE delivery.')
  })

  it.each([400, 401, 900])('shows the confirmation at subtotal ₹%i', (subtotal) => {
    render(<FreeDeliveryBanner subtotal={subtotal} />)
    expect(screen.getByRole('status')).toHaveTextContent("Congratulations! You've unlocked FREE delivery.")
    expect(screen.queryByText(/more to unlock/i)).not.toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
