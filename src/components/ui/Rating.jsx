export default function Rating({ value }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span aria-hidden="true">★</span>
      {value.toFixed(1)}
    </span>
  )
}
