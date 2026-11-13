const normalize = (value) => String(value ?? '').toLowerCase().trim()

export function matchesQuery(fields, query) {
  const q = normalize(query)
  if (!q) return true
  return fields.some((field) => normalize(field).includes(q))
}

export function searchFoods(foods, query, getCategoryName, getRestaurantName) {
  return foods.filter((food) =>
    matchesQuery(
      [food.name, food.description, getCategoryName(food.categoryId), getRestaurantName(food.restaurantId)],
      query,
    ),
  )
}

export function searchRestaurants(restaurants, query) {
  return restaurants.filter((r) => matchesQuery([r.name, ...r.cuisines], query))
}
