import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RestaurantsPage from './pages/RestaurantsPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import CategoriesPage from './pages/CategoriesPage'
import FoodDetailPage from './pages/FoodDetailPage'
import SearchPage from './pages/SearchPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:slug" element={<CategoriesPage />} />
        <Route path="foods/:id" element={<FoodDetailPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
