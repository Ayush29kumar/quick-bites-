import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem/CartItem'
import CheckoutModal from '../components/CheckoutModal/CheckoutModal'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useCart, useOrders, useToast } from '../hooks/useStore'
import { getRestaurantName } from '../services/catalog'

export default function CartPage() {
  const { lines, subtotal, deliveryFee, tax, total, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [checkingOut, setCheckingOut] = useState(false)

  if (lines.length === 0) {
    return (
      <>
        <div className="page-title">
          <h1>Your cart</h1>
        </div>
        <EmptyState
          imageCode="1F35F"
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Explore restaurants and add something tasty!"
          actionLabel="Browse restaurants"
          actionTo="/restaurants"
        />
      </>
    )
  }

  const handleConfirm = () => {
    const restaurantNames = [...new Set(lines.map((l) => getRestaurantName(l.food.restaurantId)))]
    const order = placeOrder({
      items: lines.map((l) => ({
        foodId: l.food.id,
        name: l.food.name,
        price: l.food.price,
        quantity: l.quantity,
      })),
      subtotal,
      deliveryFee,
      tax,
      total,
      restaurantNames,
    })
    clearCart()
    setCheckingOut(false)
    showToast(`Order ${order.id} placed successfully!`)
    navigate('/orders')
  }

  return (
    <>
      <div className="page-title">
        <h1>Your cart</h1>
        <p className="muted">
          {lines.length} {lines.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      <div className="cart-layout">
        <ul className="cart-list" aria-label="Cart items">
          {lines.map((line) => (
            <CartItem key={line.food.id} line={line} />
          ))}
        </ul>
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} tax={tax} total={total}>
          <Button size="lg" block onClick={() => setCheckingOut(true)}>
            Proceed to Checkout
          </Button>
          <Button variant="ghost" block onClick={clearCart}>
            Clear cart
          </Button>
        </OrderSummary>
      </div>
      {checkingOut && (
        <CheckoutModal
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
          onClose={() => setCheckingOut(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}
