import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar/SearchBar'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'
import FoodCard from '../components/FoodCard/FoodCard'
import SectionHeader from '../components/ui/SectionHeader'
import { getCategories, getPopularRestaurants, getRecommendedFoods } from '../services/catalog'
import { getImage } from '../data/images'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1>
            Delicious food, <span>delivered fast</span>
          </h1>
          <p>Order from the best restaurants near you. Pizza, burgers, biryani and more - at your door in minutes.</p>
          <SearchBar large placeholder="Search for pizza, biryani, burgers…" />
          <p className="hero__hint">
            Popular: <Link to="/search?q=pizza">Pizza</Link>, <Link to="/search?q=biryani">Biryani</Link>,{' '}
            <Link to="/search?q=burger">Burger</Link>
          </p>
        </div>
        <div className="hero__art" aria-hidden="true">
          <img src={getImage('1F355')} alt="" className="hero__img hero__img--main" />
          <img src={getImage('1F354')} alt="" className="hero__img hero__img--a" />
          <img src={getImage('1F35B')} alt="" className="hero__img hero__img--b" />
          <img src={getImage('1F9CB')} alt="" className="hero__img hero__img--c" />
        </div>
      </section>

      <section className="section" aria-labelledby="home-categories">
        <SectionHeader
          title="What's on your mind?"
          subtitle="Browse by category"
          linkTo="/categories"
          linkLabel="All categories"
        />
        <div className="grid grid--categories" id="home-categories">
          {getCategories().map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="home-restaurants">
        <SectionHeader
          title="Popular restaurants"
          subtitle="Top rated places people love"
          linkTo="/restaurants"
          linkLabel="See all"
        />
        <div className="grid grid--restaurants" id="home-restaurants">
          {getPopularRestaurants().map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="home-foods">
        <SectionHeader title="Recommended for you" subtitle="Handpicked favourites from our kitchens" />
        <div className="grid" id="home-foods">
          {getRecommendedFoods().map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
      </section>
    </>
  )
}
