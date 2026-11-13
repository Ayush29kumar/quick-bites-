import { useMemo, useState } from 'react'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'
import EmptyState from '../components/ui/EmptyState'
import { getRestaurants } from '../services/catalog'

export default function RestaurantsPage() {
  const [cuisine, setCuisine] = useState('All')
  const all = getRestaurants()

  const cuisines = useMemo(() => ['All', ...new Set(all.flatMap((r) => r.cuisines))], [all])
  const visible = cuisine === 'All' ? all : all.filter((r) => r.cuisines.includes(cuisine))

  return (
    <>
      <div className="page-title">
        <h1>Restaurants</h1>
        <p className="muted">Explore {all.length} restaurants delivering to you.</p>
      </div>

      <div className="chips" role="group" aria-label="Filter by cuisine">
        {cuisines.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip${c === cuisine ? ' chip--active' : ''}`}
            aria-pressed={c === cuisine}
            onClick={() => setCuisine(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No restaurants found" message="Try a different cuisine." />
      ) : (
        <div className="grid grid--restaurants">
          {visible.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </>
  )
}
