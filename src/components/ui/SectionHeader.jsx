import { Link } from 'react-router-dom'

export default function SectionHeader({ title, subtitle, linkTo, linkLabel }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {linkTo && <Link to={linkTo}>{linkLabel}</Link>}
    </div>
  )
}
