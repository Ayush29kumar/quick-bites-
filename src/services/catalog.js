import { categories } from '../data/categories'
import { restaurants } from '../data/restaurants'
import { foods } from '../data/foods'
import { searchFoods, searchRestaurants } from '../utils/search'

// Single access point for catalog data. Replace the internals to use a real backend later.
const foodMap = new Map(foods.map((f) => [f.id, f]))
const restaurantMap = new Map(restaurants.map((r) => [r.id, r]))
const categoryMap = new Map(categories.map((c) => [c.id, c]))

export const getCategories = () => categories
export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug)
export const getCategoryName = (id) => categoryMap.get(id)?.name ?? ''

export const getRestaurants = () => restaurants
export const getRestaurantById = (id) => restaurantMap.get(id)
export const getRestaurantName = (id) => restaurantMap.get(id)?.name ?? ''
export const getPopularRestaurants = () => restaurants.filter((r) => r.popular)

export const getFoods = () => foods
export const getFoodById = (id) => foodMap.get(id)
export const getRecommendedFoods = () => foods.filter((f) => f.recommended)
export const getFoodsByRestaurant = (restaurantId) => foods.filter((f) => f.restaurantId === restaurantId)
export const getFoodsByCategory = (categoryId) => foods.filter((f) => f.categoryId === categoryId)

export function searchAll(query) {
  return {
    foods: searchFoods(foods, query, getCategoryName, getRestaurantName),
    restaurants: searchRestaurants(restaurants, query),
  }
}
