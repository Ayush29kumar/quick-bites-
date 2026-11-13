import { Link } from 'react-router-dom'
import Rating from '../ui/Rating'
import Button from '../ui/Button'
import { useCart, useToast } from '../../hooks/useStore'
import { getRestaurantName } from '../../services/catalog'
import { formatPrice } from '../../utils/format'

export default function FoodCard({ food }) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const restaurantName = getRestaurantName(food.restaurantId)

  const handleAdd = () => {
    addItem(food.id)
    showToast(`${food.name} added to cart`)
  }

  return (
    <article className="food-card">
      <Link to={`/foods/${food.id}`} className="food-card__media" aria-label={`View ${food.name}`}>
        <img src={food.image} alt={food.name} loading="lazy" />
      </Link>
      <div className="food-card__body">
        <div className="food-card__top">
          <h3>
            <Link to={`/foods/${food.id}`}>{food.name}</Link>
          </h3>
          <Rating value={food.rating} />
        </div>
        <Link to={`/restaurants/${food.restaurantId}`} className="food-card__restaurant">
          {restaurantName}
        </Link>
        <p className="food-card__desc">{food.description}</p>
        <div className="food-card__footer">
          <strong className="food-card__price">{formatPrice(food.price)}</strong>
          <Button size="sm" onClick={handleAdd} aria-label={`Add ${food.name} to cart`}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  )
}
