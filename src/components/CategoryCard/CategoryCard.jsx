import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.slug}`} className="category-card">
      <img src={category.image} alt="" loading="lazy" />
      <span>{category.name}</span>
    </Link>
  )
}
