import { MAX_QUANTITY } from '../../context/cartReducer'

export default function QuantityStepper({ quantity, onIncrement, onDecrement, label }) {
  return (
    <div className="stepper" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={onDecrement} aria-label={`Decrease quantity of ${label}`}>
        −
      </button>
      <output aria-live="polite">{quantity}</output>
      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  )
}
