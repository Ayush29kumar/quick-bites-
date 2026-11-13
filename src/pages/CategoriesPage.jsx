import { Link, useParams } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import FoodCard from '../components/FoodCard/FoodCard'
import EmptyState from '../components/ui/EmptyState'
import { getCategories, getCategoryBySlug, getFoodsByCategory } from '../services/catalog'

export default function CategoriesPage() {
  const { slug } = useParams()

  if (!slug) {
    return (
      <>
        <div className="page-title">
          <h1>Categories</h1>
          <p className="muted">What are you craving today?</p>
        </div>
        <div className="grid grid--categories">
          {getCategories().map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </>
    )
  }

  const category = getCategoryBySlug(slug)
  if (!category) {
    return (
      <EmptyState
        title="Category not found"
        message="We couldn't find that category."
        actionLabel="All categories"
        actionTo="/categories"
      />
    )
  }

  const items = getFoodsByCategory(category.id)

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/categories">Categories</Link> / {category.name}
      </nav>
      <div className="page-title">
        <h1>{category.name}</h1>
        <p className="muted">{items.length} items</p>
      </div>
      <div className="chips" aria-label="Switch category">
        {getCategories().map((c) => (
          <Link key={c.id} to={`/categories/${c.slug}`} className={`chip${c.id === category.id ? ' chip--active' : ''}`}>
            {c.name}
          </Link>
        ))}
      </div>
      {items.length === 0 ? (
        <EmptyState title="Nothing here yet" message="No items in this category." />
      ) : (
        <div className="grid">
          {items.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
      )}
    </>
  )
}
