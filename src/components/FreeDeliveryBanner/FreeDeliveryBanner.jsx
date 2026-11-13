import {
  FREE_DELIVERY_THRESHOLD,
  getAmountToFreeDelivery,
  qualifiesForFreeDelivery,
} from '../../utils/cartMath'
import { formatPrice } from '../../utils/format'

// Shows progress toward free delivery. `subtotal` is the food subtotal (excludes delivery and tax).
export default function FreeDeliveryBanner({ subtotal }) {
  if (subtotal <= 0) return null

  const unlocked = qualifiesForFreeDelivery(subtotal)
  const percent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100))

  return (
    <div className={`free-delivery${unlocked ? ' free-delivery--unlocked' : ''}`} role="status" aria-live="polite">
      <p className="free-delivery__message">
        {unlocked
          ? "Congratulations! You've unlocked FREE delivery."
          : `Add ${formatPrice(getAmountToFreeDelivery(subtotal))} more to unlock FREE delivery.`}
      </p>
      <div
        className="free-delivery__track"
        role="progressbar"
        aria-label="Free delivery progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="free-delivery__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
