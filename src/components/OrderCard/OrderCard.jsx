import { formatDate, formatPrice } from '../../utils/format'

export default function OrderCard({ order }) {
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0)
  return (
    <article className="order-card">
      <header className="order-card__header">
        <div>
          <h3>Order {order.id}</h3>
          <p className="muted">
            {formatDate(order.placedAt)} • {order.restaurantNames.join(', ')}
          </p>
        </div>
        <span className={`status status--${order.status.toLowerCase()}`}>{order.status}</span>
      </header>
      <ul className="order-card__items">
        {order.items.map((item) => (
          <li key={item.foodId}>
            <span>
              {item.quantity} × {item.name}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <footer className="order-card__footer">
        <span className="muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <strong>Total {formatPrice(order.total)}</strong>
      </footer>
    </article>
  )
}
