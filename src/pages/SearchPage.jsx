import { useSearchParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard/FoodCard'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'
import SearchBar from '../components/SearchBar/SearchBar'
import EmptyState from '../components/ui/EmptyState'
import { searchAll } from '../services/catalog'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').slice(0, 80)
  const { foods, restaurants } = searchAll(query)
  const hasQuery = query.trim() !== ''
  const noResults = foods.length === 0 && restaurants.length === 0

  return (
    <>
      <div className="page-title">
        <h1>{hasQuery ? `Results for “${query}”` : 'Search'}</h1>
        <SearchBar key={query} initialValue={query} />
      </div>

      {noResults ? (
        <EmptyState
          imageCode="1F96D"
          title="No results found"
          message={`We couldn't find anything matching “${query}”. Try a different dish, cuisine or restaurant name.`}
          actionLabel="Browse restaurants"
          actionTo="/restaurants"
        />
      ) : (
        <>
          {restaurants.length > 0 && (
            <section className="section" aria-labelledby="sr-restaurants">
              <h2 id="sr-restaurants">Restaurants ({restaurants.length})</h2>
              <div className="grid grid--restaurants">
                {restaurants.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            </section>
          )}
          {foods.length > 0 && (
            <section className="section" aria-labelledby="sr-foods">
              <h2 id="sr-foods">Food items ({foods.length})</h2>
              <div className="grid">
                {foods.map((f) => (
                  <FoodCard key={f.id} food={f} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
