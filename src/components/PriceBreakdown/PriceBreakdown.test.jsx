import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import PriceBreakdown from './PriceBreakdown'

const row = (label) => screen.getByText(label).parentElement

describe('PriceBreakdown', () => {
  it('shows a ₹40 delivery fee and the payable total', () => {
    render(<PriceBreakdown subtotal={399} deliveryFee={40} tax={19.95} total={458.95} />)
    expect(within(row('Subtotal')).getByText('₹399')).toBeInTheDocument()
    expect(within(row('Delivery fee')).getByText('₹40')).toBeInTheDocument()
    expect(within(row('Total')).getByText('₹458.95')).toBeInTheDocument()
  })

  it('shows Free when the delivery fee is zero', () => {
    render(<PriceBreakdown subtotal={400} deliveryFee={0} tax={20} total={420} />)
    expect(within(row('Delivery fee')).getByText('Free')).toBeInTheDocument()
    expect(within(row('Total')).getByText('₹420')).toBeInTheDocument()
  })
})
