import { getImage } from '../../data/images'
import Button from './Button'

export default function EmptyState({ title, message, imageCode = '1F372', actionLabel, actionTo }) {
  return (
    <div className="empty-state" role="status">
      <img src={getImage(imageCode)} alt="" />
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo && <Button to={actionTo}>{actionLabel}</Button>}
    </div>
  )
}
