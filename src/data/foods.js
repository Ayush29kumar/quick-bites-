import { getImage } from './images'

// Prices are in INR (rupees).
const item = (id, name, description, price, rating, imageCode, categoryId, restaurantId, recommended = false) => ({
  id,
  name,
  description,
  price,
  rating,
  image: getImage(imageCode),
  categoryId,
  restaurantId,
  recommended,
})

export const foods = [
  // Napoli Slice House - pizza
  item('margherita-pizza', 'Margherita Pizza', 'Classic tomato sauce, fresh mozzarella and basil on a hand-tossed base.', 249, 4.5, '1F355', 'pizza', 'napoli-slice-house', true),
  item('pepperoni-pizza', 'Pepperoni Pizza', 'Loaded with spicy pepperoni slices and bubbling mozzarella.', 349, 4.6, '1F355', 'pizza', 'napoli-slice-house', true),
  item('farmhouse-pizza', 'Farmhouse Pizza', 'Capsicum, onion, mushroom and sweet corn on a cheesy base.', 329, 4.4, '1F355', 'pizza', 'napoli-slice-house'),
  item('paneer-tikka-pizza', 'Paneer Tikka Pizza', 'Tandoori paneer cubes with onions and green chillies.', 359, 4.3, '1F355', 'pizza', 'napoli-slice-house'),
  item('garlic-bread', 'Garlic Bread', 'Toasted loaf brushed with garlic butter and herbs.', 129, 4.2, '1F35E', 'pizza', 'napoli-slice-house'),

  // Burger Barn - burgers
  item('classic-cheeseburger', 'Classic Cheeseburger', 'Juicy patty, melted cheddar, lettuce and house sauce in a toasted bun.', 199, 4.4, '1F354', 'burgers', 'burger-barn', true),
  item('crispy-chicken-burger', 'Crispy Chicken Burger', 'Golden fried chicken fillet with crunchy slaw and spicy mayo.', 229, 4.5, '1F354', 'burgers', 'burger-barn', true),
  item('veggie-supreme-burger', 'Veggie Supreme Burger', 'Crisp vegetable patty with tangy sauce and fresh salad.', 179, 4.1, '1F354', 'burgers', 'burger-barn'),
  item('french-fries', 'French Fries', 'Thin and crispy fries tossed with sea salt.', 99, 4.2, '1F35F', 'burgers', 'burger-barn'),
  item('hot-dog', 'Loaded Hot Dog', 'Grilled sausage in a soft roll with mustard and caramelised onions.', 149, 4.0, '1F32D', 'burgers', 'burger-barn'),

  // Spice Route - Indian
  item('butter-chicken', 'Butter Chicken', 'Tender chicken simmered in a rich, creamy tomato gravy.', 329, 4.7, '1F35B', 'indian', 'spice-route', true),
  item('paneer-butter-masala', 'Paneer Butter Masala', 'Soft paneer cubes in a velvety buttery tomato gravy.', 299, 4.5, '1F35B', 'indian', 'spice-route', true),
  item('chicken-biryani', 'Chicken Biryani', 'Fragrant basmati rice layered with spiced chicken and saffron.', 289, 4.6, '1F35A', 'indian', 'spice-route', true),
  item('dal-makhani', 'Dal Makhani', 'Black lentils slow-cooked overnight with butter and cream.', 219, 4.4, '1F372', 'indian', 'spice-route'),
  item('garlic-naan', 'Garlic Naan', 'Soft tandoor-baked flatbread topped with garlic and coriander.', 59, 4.3, '1F35E', 'indian', 'spice-route'),

  // Tandoori Nights - Indian
  item('tandoori-chicken', 'Tandoori Chicken', 'Chargrilled chicken marinated in yoghurt and smoky spices.', 349, 4.6, '1F357', 'indian', 'tandoori-nights', true),
  item('chicken-tikka', 'Chicken Tikka', 'Boneless chicken pieces roasted in the tandoor with mint chutney.', 299, 4.5, '1F357', 'indian', 'tandoori-nights'),
  item('paneer-tikka', 'Paneer Tikka', 'Char-grilled paneer, peppers and onions in a spiced marinade.', 259, 4.3, '1F958', 'indian', 'tandoori-nights'),
  item('veg-biryani', 'Veg Biryani', 'Aromatic rice cooked with garden vegetables and whole spices.', 249, 4.2, '1F35A', 'indian', 'tandoori-nights'),

  // Dragon Wok - Chinese
  item('veg-hakka-noodles', 'Veg Hakka Noodles', 'Wok-tossed noodles with crunchy vegetables and soy.', 189, 4.2, '1F35C', 'chinese', 'dragon-wok', true),
  item('chicken-manchurian', 'Chicken Manchurian', 'Crispy chicken balls in a tangy, spicy Manchurian sauce.', 239, 4.3, '1F372', 'chinese', 'dragon-wok'),
  item('veg-momos', 'Veg Momos', 'Steamed dumplings stuffed with cabbage, carrot and herbs.', 129, 4.4, '1F95F', 'chinese', 'dragon-wok', true),
  item('chicken-momos', 'Chicken Momos', 'Juicy steamed chicken dumplings served with red chilli dip.', 149, 4.5, '1F95F', 'chinese', 'dragon-wok'),
  item('veg-fried-rice', 'Veg Fried Rice', 'Fluffy rice stir-fried with vegetables and spring onion.', 179, 4.1, '1F35A', 'chinese', 'dragon-wok'),
  item('honey-chilli-shrimp', 'Honey Chilli Shrimp', 'Crispy shrimp glazed in a sweet and spicy honey chilli sauce.', 329, 4.4, '1F364', 'chinese', 'dragon-wok', true),
  item('chinese-combo-box', 'Chinese Combo Box', 'Noodles, manchurian and momos in one value box.', 299, 4.3, '1F371', 'chinese', 'dragon-wok'),

  // Sweet Tooth Bakery - desserts
  item('chocolate-truffle-cake', 'Chocolate Truffle Cake', 'Rich, moist chocolate sponge with silky ganache.', 249, 4.8, '1F382', 'desserts', 'sweet-tooth-bakery', true),
  item('blueberry-cupcake', 'Blueberry Cupcake', 'Fluffy vanilla cupcake with blueberry cream frosting.', 99, 4.5, '1F9C1', 'desserts', 'sweet-tooth-bakery'),
  item('glazed-donut', 'Glazed Donut', 'Soft ring donut finished with a sweet sugar glaze.', 79, 4.2, '1F369', 'desserts', 'sweet-tooth-bakery'),
  item('choco-chip-cookies', 'Choco Chip Cookies', 'Pack of freshly baked cookies with gooey chocolate chunks.', 119, 4.6, '1F36A', 'desserts', 'sweet-tooth-bakery'),
  item('vanilla-ice-cream', 'Vanilla Ice Cream', 'Creamy vanilla soft serve in a crisp cone.', 129, 4.3, '1F366', 'desserts', 'sweet-tooth-bakery'),
  item('caramel-custard', 'Caramel Custard', 'Silky baked custard topped with golden caramel.', 109, 4.4, '1F36E', 'desserts', 'sweet-tooth-bakery'),
  item('fudgy-brownie', 'Fudgy Brownie', 'Dense chocolate brownie with a crackly top.', 149, 4.7, '1F36B', 'desserts', 'sweet-tooth-bakery', true),
  item('red-velvet-pastry', 'Red Velvet Pastry', 'Layered red velvet sponge with cream cheese frosting.', 139, 4.5, '1F370', 'desserts', 'sweet-tooth-bakery'),

  // Brew & Chill - beverages
  item('bubble-tea', 'Bubble Tea', 'Chilled milk tea with chewy tapioca pearls.', 169, 4.4, '1F9CB', 'beverages', 'brew-and-chill', true),
  item('masala-chai', 'Masala Chai', 'Hot Indian tea simmered with ginger, cardamom and spices.', 59, 4.6, '1F375', 'beverages', 'brew-and-chill', true),
  item('hot-coffee', 'Hot Filter Coffee', 'Strong, aromatic South Indian style filter coffee.', 99, 4.3, '2615', 'beverages', 'brew-and-chill'),
  item('fresh-lime-soda', 'Fresh Lime Soda', 'Sparkling soda with fresh lime, sweet or salted.', 79, 4.2, '1F34B', 'beverages', 'brew-and-chill'),
  item('mango-lassi', 'Mango Lassi', 'Thick, creamy yoghurt drink blended with ripe mango.', 119, 4.7, '1F96D', 'beverages', 'brew-and-chill', true),
  item('fresh-orange-juice', 'Fresh Orange Juice', 'Cold-pressed juice from sweet oranges, no added sugar.', 109, 4.3, '1F9C3', 'beverages', 'brew-and-chill'),
  item('chocolate-milkshake', 'Chocolate Milkshake', 'Thick chocolate shake blended with ice cream.', 149, 4.5, '1F95B', 'beverages', 'brew-and-chill'),
  item('chilled-cola', 'Chilled Cola', 'Ice-cold fizzy cola served with a straw.', 69, 4.0, '1F964', 'beverages', 'brew-and-chill'),

  // Urban Bites - burgers and snacks
  item('smoky-bbq-burger', 'Smoky BBQ Burger', 'Double patty with BBQ glaze, onion rings and cheddar.', 249, 4.4, '1F354', 'burgers', 'urban-bites'),
  item('chicken-club-sandwich', 'Chicken Club Sandwich', 'Triple-decker toasted sandwich with grilled chicken and egg.', 189, 4.2, '1F96A', 'burgers', 'urban-bites'),
  item('paneer-kathi-roll', 'Paneer Kathi Roll', 'Spiced paneer, onions and mint chutney rolled in a flaky paratha.', 159, 4.3, '1F959', 'indian', 'urban-bites'),
  item('street-tacos', 'Street Tacos', 'Crunchy shells filled with spiced veggies, salsa and cheese.', 169, 4.1, '1F32E', 'burgers', 'urban-bites'),
]
