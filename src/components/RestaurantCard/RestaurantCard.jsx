import { Link } from 'react-router-dom'
import Rating from '../ui/Rating'

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="restaurant-card">
      <div className="restaurant-card__media">
        <img src={restaurant.image} alt="" loading="lazy" />
      </div>
      <div className="restaurant-card__body">
        <div className="restaurant-card__top">
          <h3>{restaurant.name}</h3>
          <Rating value={restaurant.rating} />
        </div>
        <p className="muted">{restaurant.cuisines.join(' • ')}</p>
        <p className="restaurant-card__time">
          <span aria-hidden="true">⏱</span> {restaurant.deliveryTime}
        </p>
      </div>
    </Link>
  )
}
