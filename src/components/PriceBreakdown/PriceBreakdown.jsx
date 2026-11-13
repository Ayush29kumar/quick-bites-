import { formatPrice } from '../../utils/format'

// Shared by the cart summary and the checkout modal so both always show identical pricing.
export default function PriceBreakdown({ subtotal, deliveryFee, tax, total }) {
  return (
    <dl className="price-breakdown">
      <div>
        <dt>Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div>
        <dt>Delivery fee</dt>
        <dd className={deliveryFee === 0 ? 'price-breakdown__free' : undefined}>
          {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
        </dd>
      </div>
      <div>
        <dt>Taxes (5%)</dt>
        <dd>{formatPrice(tax)}</dd>
      </div>
      <div className="price-breakdown__total">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}
