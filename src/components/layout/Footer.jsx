import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>QuickBite</strong>
          <p className="muted">Hot food, fast delivery. This is a demo app - no real orders are placed.</p>
        </div>
        <nav aria-label="Footer" className="footer__links">
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </nav>
      </div>
    </footer>
  )
}
