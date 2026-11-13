# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands
- Requires Node.js >= 22.12. Plain JavaScript (JSX), no TypeScript.
- Single test file: `npx vitest run src/utils/cartMath.test.js`; single test by name: `npx vitest run -t "test name"`
- Tests are co-located with source (`*.test.js[x]`); integration tests live in `src/test/`. `globals: true`, so `describe`/`it`/`expect` need no import (ESLint has vitest globals).
- Dev/preview servers are bound to 127.0.0.1 (ports 5173/4173) in `vite.config.js`; keep it that way (security policy forbids 0.0.0.0).

## Architecture / gotchas
- Pages must read data ONLY through `src/services/catalog.js` (never import `src/data/*` directly in pages/components); it is the swap point for a real backend.
- Cart state is `{ foodId, quantity }` only. Prices always come from the catalog via `buildCartLines` in `src/utils/cartMath.js` - never store price in cart/localStorage.
- `cartReducer` is pure; use `cartActions` constants and `MAX_QUANTITY` (20) from `src/context/cartReducer.js`. Persisted carts must pass `sanitizeCart`.
- Persist via `loadJSON`/`saveJSON` in `src/utils/storage.js` (never throw); keys are `quickbite.cart` and `quickbite.orders`. Only user-placed orders are persisted; `seedOrders` are always appended in `OrdersContext`.
- Context hooks (`useCart`, `useOrders`, `useToast`) all live in `src/hooks/useStore.js` and throw outside their provider. Provider nesting order: Toast > Cart > Orders (same in `main.jsx` and `src/test/test-utils.jsx`).
- Food images: use `getImage('<UNICODE HEX>')` from `src/data/images.js` (bundled Noto SVGs in `src/assets/images/`, falls back to `1F3EA`). Don't use remote image URLs (app is offline-only; no backend/paid APIs).
- Money: INR, format with `formatPrice` (`src/utils/format.js`). Pricing constants (delivery ₹40, free at a food subtotal of ₹400 or more via `FREE_DELIVERY_THRESHOLD`, 5% tax) are in `cartMath.js`.

## Tests
- Use `renderWithProviders(ui, { route })` / `renderApp(route)` from `src/test/test-utils.jsx` (wraps MemoryRouter + all providers). `localStorage` is cleared before each test in `src/test/setup.js`.
- Vitest runs with `css: false`.

## Code style (no Prettier config; follow existing files)
- No semicolons, single quotes, 2-space indent, trailing commas in multiline literals, ~120 col width.
- Components: one folder per component (`components/FoodCard/FoodCard.jsx`) with default export; shared primitives in `components/ui/`, layout in `components/layout/`. Pages are default exports in `src/pages/`.
- Imports: React/third-party first, then relative modules; no file extensions on imports of `.js`/`.jsx`.
- BEM-style class names (`food-card__price`) in plain CSS under `src/styles/` (tokens.css holds design tokens); no CSS-in-JS or CSS modules.
- ESLint: unused vars error unless name starts with uppercase or `_`; `react-hooks` recommended rules enforced; `react-refresh/only-export-components` is off (contexts and providers may share a file).
- Error handling: throw only for provider misuse in hooks; storage and parse failures silently fall back to defaults.
- Accessibility: interactive elements carry descriptive `aria-label`s (e.g. `Add ${food.name} to cart`); tests query by these.
