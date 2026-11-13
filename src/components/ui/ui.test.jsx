import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuantityStepper from './QuantityStepper'
import EmptyState from './EmptyState'
import { renderWithProviders } from '../../test/test-utils'
import { MAX_QUANTITY } from '../../context/cartReducer'

describe('QuantityStepper', () => {
  it('calls the handlers', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    const onDecrement = vi.fn()
    renderWithProviders(
      <QuantityStepper quantity={2} label="Pizza" onIncrement={onIncrement} onDecrement={onDecrement} />,
    )
    await user.click(screen.getByRole('button', { name: /increase quantity of pizza/i }))
    await user.click(screen.getByRole('button', { name: /decrease quantity of pizza/i }))
    expect(onIncrement).toHaveBeenCalledTimes(1)
    expect(onDecrement).toHaveBeenCalledTimes(1)
  })

  it('disables increase at the maximum quantity', () => {
    renderWithProviders(
      <QuantityStepper quantity={MAX_QUANTITY} label="Pizza" onIncrement={() => {}} onDecrement={() => {}} />,
    )
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeDisabled()
  })
})

describe('EmptyState', () => {
  it('renders title, message and action link', () => {
    renderWithProviders(<EmptyState title="Nothing" message="Add stuff" actionLabel="Go" actionTo="/restaurants" />)
    expect(screen.getByRole('heading', { name: 'Nothing' })).toBeInTheDocument()
    expect(screen.getByText('Add stuff')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/restaurants')
  })
})
