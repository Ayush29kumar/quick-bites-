# QuickBite

A responsive food ordering and delivery web app built with React, Vite and plain CSS. It runs fully offline: all data is local mock data, the cart and orders persist in `localStorage`, and no paid APIs or backend are needed.

## Features

- Home page with search, categories, popular restaurants and recommended food
- Restaurants list (cuisine filter) and restaurant menu pages
- Categories (Pizza, Burgers, Indian, Chinese, Desserts, Beverages) and category listings
- Food detail pages and food cards (image, name, description, price in INR, rating, restaurant, Add to Cart)
- Search across foods and restaurants with an empty-results state
- Cart with quantity controls, remove, subtotal, delivery fee, tax and total, plus an empty-cart state
- Simulated checkout (validated form, no payment taken) that creates an order
- Order history with demo orders and any orders you place
- Responsive layout with a mobile navigation menu

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server (bound to 127.0.0.1) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the code |

## Project structure

```
src/
├─ assets/images/     bundled SVG illustrations (see ATTRIBUTION.md)
├─ components/        reusable components (ui/, layout/, FoodCard/, RestaurantCard/, ...)
├─ context/           CartContext, OrdersContext and the pure cartReducer
├─ data/              mock categories, restaurants, foods and seed orders
├─ hooks/             useCart, useOrders, useToast
├─ pages/             route-level pages
├─ services/          catalog.js - the only module pages use to read data
├─ styles/            design tokens, global, ui and component CSS
├─ test/              test setup, helpers and integration tests
└─ utils/             cart maths, search, formatting, safe storage helpers
```

## Design notes

- **State:** Context API with `useReducer`. The cart stores only `{ foodId, quantity }`; prices always come from the catalog.
- **Persistence:** cart (`quickbite.cart`) and placed orders (`quickbite.orders`) are saved via safe `localStorage` helpers. Corrupt or unknown data is discarded on load.
- **Data layer:** pages read data through `src/services/catalog.js`, so mock data can be swapped for a real API by changing that module.
- **Pricing:** currency is INR. Delivery is ₹40, free when the food subtotal is ₹400 or more; tax is 5%.
- **Images:** Noto Emoji artwork by Google, Apache 2.0, bundled locally. See `src/assets/images/ATTRIBUTION.md`.

## Testing

Vitest, jsdom and Testing Library cover the cart reducer, cart maths, search, storage helpers, UI components, navigation, restaurant/category pages, search, the cart flow, persistence, checkout validation and order creation.
