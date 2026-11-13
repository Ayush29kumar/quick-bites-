import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import QuantityStepper from '../components/ui/QuantityStepper'
import Rating from '../components/ui/Rating'
import { useCart, useToast } from '../hooks/useStore'
import { getCategoryName, getFoodById, getRestaurantById } from '../services/catalog'
import { MAX_QUANTITY } from '../context/cartReducer'
import { formatPrice } from '../utils/format'

export default function FoodDetailPage() {
  const { id } = useParams()
  const food = getFoodById(id)
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)

  if (!food) {
    return (
      <EmptyState
        title="Food item not found"
        message="We couldn't find that dish."
        actionLabel="Back to home"
        actionTo="/"
      />
    )
  }

  const restaurant = getRestaurantById(food.restaurantId)

  const handleAdd = () => {
    addItem(food.id, quantity)
    showToast(`${quantity} × ${food.name} added to cart`)
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/restaurants">Restaurants</Link> /{' '}
        <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link> / {food.name}
      </nav>
      <section className="food-detail">
        <div className="food-detail__media">
          <img src={food.image} alt={food.name} />
        </div>
        <div className="food-detail__info">
          <span className="chip">{getCategoryName(food.categoryId)}</span>
          <h1>{food.name}</h1>
          <div className="restaurant-hero__meta">
            <Rating value={food.rating} />
            <Link to={`/restaurants/${restaurant.id}`} className="food-card__restaurant">
              {restaurant.name}
            </Link>
          </div>
          <p>{food.description}</p>
          <strong className="food-detail__price">{formatPrice(food.price)}</strong>
          <div className="food-detail__actions">
            <QuantityStepper
              quantity={quantity}
              label={food.name}
              onIncrement={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <Button size="lg" onClick={handleAdd}>
              Add to Cart • {formatPrice(food.price * quantity)}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
