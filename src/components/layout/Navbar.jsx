import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { useCart } from '../../hooks/useStore'
import { getImage } from '../../data/images'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/categories', label: 'Categories' },
  { to: '/cart', label: 'Cart', showCount: true },
  { to: '/orders', label: 'Orders' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img src={getImage('1F354')} alt="" width="30" height="30" />
          <span>
            Quick<b>Bite</b>
          </span>
        </Link>

        <div className="navbar__search">
          <SearchBar placeholder="Search food or restaurants" />
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>

        <nav id="main-nav" aria-label="Main" className={`navbar__nav${open ? ' navbar__nav--open' : ''}`}>
          {NAV_LINKS.map(({ to, label, end, showCount }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={close}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {label}
              {showCount && itemCount > 0 && (
                <span className="navbar__badge" aria-label={`${itemCount} items in cart`}>
                  {itemCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
