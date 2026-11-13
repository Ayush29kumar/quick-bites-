import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialValue = '', placeholder = 'Search for food or restaurants', large = false }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <form className={`search-bar${large ? ' search-bar--large' : ''}`} role="search" onSubmit={handleSubmit}>
      <label htmlFor={large ? 'hero-search' : 'nav-search'} className="visually-hidden">
        Search food and restaurants
      </label>
      <input
        id={large ? 'hero-search' : 'nav-search'}
        type="search"
        value={value}
        maxLength={80}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className="search-bar__btn">
        Search
      </button>
    </form>
  )
}
