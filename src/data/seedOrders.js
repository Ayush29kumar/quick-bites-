// Demo order history shown before the user places any orders.
export const seedOrders = [
  {
    id: 'QB-10001',
    placedAt: '2026-10-28T19:42:00.000Z',
    status: 'Delivered',
    items: [
      { foodId: 'margherita-pizza', name: 'Margherita Pizza', price: 249, quantity: 2 },
      { foodId: 'garlic-bread', name: 'Garlic Bread', price: 129, quantity: 1 },
    ],
    subtotal: 627,
    deliveryFee: 0,
    tax: 31.35,
    total: 658.35,
    restaurantNames: ['Napoli Slice House'],
  },
  {
    id: 'QB-10002',
    placedAt: '2026-11-02T13:15:00.000Z',
    status: 'Delivered',
    items: [
      { foodId: 'butter-chicken', name: 'Butter Chicken', price: 329, quantity: 1 },
      { foodId: 'garlic-naan', name: 'Garlic Naan', price: 59, quantity: 2 },
      { foodId: 'mango-lassi', name: 'Mango Lassi', price: 119, quantity: 1 },
    ],
    subtotal: 566,
    deliveryFee: 0,
    tax: 28.3,
    total: 594.3,
    restaurantNames: ['Spice Route', 'Brew & Chill'],
  },
  {
    id: 'QB-10003',
    placedAt: '2026-11-09T21:05:00.000Z',
    status: 'Delivered',
    items: [
      { foodId: 'chocolate-truffle-cake', name: 'Chocolate Truffle Cake', price: 249, quantity: 1 },
      { foodId: 'fudgy-brownie', name: 'Fudgy Brownie', price: 149, quantity: 1 },
    ],
    subtotal: 398,
    deliveryFee: 40,
    tax: 19.9,
    total: 457.9,
    restaurantNames: ['Sweet Tooth Bakery'],
  },
]
