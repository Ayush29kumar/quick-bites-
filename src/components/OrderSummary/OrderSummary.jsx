import FreeDeliveryBanner from '../FreeDeliveryBanner/FreeDeliveryBanner'
import PriceBreakdown from '../PriceBreakdown/PriceBreakdown'

export default function OrderSummary({ subtotal, deliveryFee, tax, total, children }) {
  return (
    <aside className="order-summary" aria-label="Order summary">
      <h2>Order Summary</h2>
      <FreeDeliveryBanner subtotal={subtotal} />
      <PriceBreakdown subtotal={subtotal} deliveryFee={deliveryFee} tax={tax} total={total} />
      {children}
    </aside>
  )
}
