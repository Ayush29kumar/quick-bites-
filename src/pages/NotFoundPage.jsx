import EmptyState from '../components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState
      imageCode="1F35E"
      title="Page not found"
      message="The page you're looking for doesn't exist."
      actionLabel="Go home"
      actionTo="/"
    />
  )
}
