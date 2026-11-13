import { Link } from 'react-router-dom'
import QuantityStepper from '../ui/QuantityStepper'
import { useCart } from '../../hooks/useStore'
import { formatPrice } from '../../utils/format'

export default function CartItem({ line }) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { food, quantity, lineTotal } = line

  return (
    <li className="cart-item">
      <img src={food.image} alt="" className="cart-item__img" />
      <div className="cart-item__info">
        <h3>
          <Link to={`/foods/${food.id}`}>{food.name}</Link>
        </h3>
        <p className="muted">{formatPrice(food.price)} each</p>
        <button
          type="button"
          className="cart-item__remove"
          aria-label={`Remove ${food.name} from cart`}
          onClick={() => removeItem(food.id)}
        >
          Remove
        </button>
      </div>
      <QuantityStepper
        quantity={quantity}
        label={food.name}
        onIncrement={() => incrementItem(food.id)}
        onDecrement={() => decrementItem(food.id)}
      />
      <strong className="cart-item__total">{formatPrice(lineTotal)}</strong>
    </li>
  )
}
