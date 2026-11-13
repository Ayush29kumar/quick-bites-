import { formatPrice } from '../../utils/format'

export default function OrderSummary({ subtotal, deliveryFee, tax, total, children }) {
  return (
    <aside className="order-summary" aria-label="Order summary">
      <h2>Order Summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery fee</dt>
          <dd>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
        </div>
        <div>
          <dt>Taxes (5%)</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>
        <div className="order-summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
    </aside>
  )
}
