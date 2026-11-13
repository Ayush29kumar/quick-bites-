import OrderCard from '../components/OrderCard/OrderCard'
import EmptyState from '../components/ui/EmptyState'
import { useOrders } from '../hooks/useStore'

export default function OrdersPage() {
  const { orders } = useOrders()

  return (
    <>
      <div className="page-title">
        <h1>Your orders</h1>
        <p className="muted">Track and review your previous orders.</p>
      </div>
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          message="When you place an order it will show up here."
          actionLabel="Start ordering"
          actionTo="/restaurants"
        />
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </>
  )
}
