import { Link, useParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard/FoodCard'
import EmptyState from '../components/ui/EmptyState'
import Rating from '../components/ui/Rating'
import { getFoodsByRestaurant, getRestaurantById } from '../services/catalog'

export default function RestaurantDetailPage() {
  const { id } = useParams()
  const restaurant = getRestaurantById(id)

  if (!restaurant) {
    return (
      <EmptyState
        title="Restaurant not found"
        message="We couldn't find that restaurant."
        actionLabel="Browse restaurants"
        actionTo="/restaurants"
      />
    )
  }

  const menu = getFoodsByRestaurant(restaurant.id)

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/restaurants">Restaurants</Link> / {restaurant.name}
      </nav>
      <section className="restaurant-hero">
        <img src={restaurant.image} alt="" />
        <div>
          <h1>{restaurant.name}</h1>
          <p className="muted">{restaurant.cuisines.join(' • ')}</p>
          <div className="restaurant-hero__meta">
            <Rating value={restaurant.rating} />
            <span>⏱ {restaurant.deliveryTime}</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="menu-title">
        <h2 id="menu-title">Menu</h2>
        {menu.length === 0 ? (
          <EmptyState title="No items yet" message="This restaurant has no items on its menu." />
        ) : (
          <div className="grid">
            {menu.map((f) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
