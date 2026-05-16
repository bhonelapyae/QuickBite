# QuickBite Frontend

React frontend for the QuickBite food delivery platform.  
This application lets customers browse the menu, manage their cart, place orders, and allows admins to manage menu items and view incoming orders.

## Tech Stack

- React 19
- React Router v6
- Context API (cart state and persistence)
- Fetch API for HTTP requests
- CSS modules in `src/styles`

## Project Structure (Frontend)

Key folders under `quickbite-frontend/src`:

- `components/`
  - `MenuItemCard` – menu item card with quantity controls and Add to Cart
  - `MenuList` – grid of menu items, with optional “View Details” handler
  - `Cart` – cart view with quantity editing and total price
  - `OrderForm` – checkout form (customer + delivery/pickup details)
  - `AdminPanel` – admin dashboard for orders and menu management
- `pages/`
  - `Home` – landing page with CTA and category shortcuts
  - `Menu` – menu browsing, filtering by category, item details modal
  - `Checkout` – combined cart + order form + confirmation screen
  - `Admin` – login gate + admin dashboard
- `context/`
  - `CartContext` – global cart state with localStorage persistence
- `services/`
  - `apiService` – wrapper around fetch for all backend API calls
- `styles/` – CSS for pages and components

## Available Scripts

In `quickbite-frontend` directory:

### `npm start`

Starts the app in development mode:

```bash
cd quickbite-frontend
npm start
```

- Opens at `http://localhost:3000`
- Hot reloads on code changes

### `npm test`

Runs the test suite once (useful in CI or local checks):

```bash
npm test -- --watch=false
```

### `npm run build`

Builds the app for production into the `build` folder:

```bash
npm run build
```

### `npm run eject`

Not required for normal development. Keeps the default Create React App tooling; use only if you need full control over the build configuration.

## API Configuration

The frontend talks to the backend via a fixed base URL defined in  
[`src/services/apiService.js`](src/services/apiService.js):

```js
const API_BASE_URL = 'http://localhost:8080/api';
```

If you run the backend on a different host or port, update `API_BASE_URL` accordingly.

## Features

### Menu Browsing (Customer)

- Load categories (Burger, Pizza, Drinks, Desserts) from the backend.
- Filter menu items by category or show all items.
- Each card displays:
  - Name
  - Price (formatted, e.g. `$12.50`)
  - Description
  - Image (fallback placeholder if missing)
- “View Details” opens a modal showing:
  - Name, price, full description
  - Ingredients list
  - Availability label (“Currently unavailable” when not available)

### Cart Management

- Add items to the cart from menu cards with a chosen quantity.
- If an item is already in the cart, its quantity is increased instead of duplicating.
- Cart page includes:
  - Increase/decrease quantity with +/- buttons
  - Direct quantity input (1–99)
  - Validation with error message “Invalid quantity” on invalid input
  - Remove item from cart
  - Live-updated total price
- Cart state persists in `localStorage` via `CartContext`.

### Checkout & Order Placement

- Checkout page shows:
  - Cart (items, quantities, per-item totals, grand total)
  - Order form for customer details and delivery/pickup options
- Validation rules:
  - Name and email required, email pattern validated
  - Phone required and must be numeric, 9–15 digits
  - If Delivery selected:
    - Delivery address is required
  - If Pickup selected:
    - Pickup time is required
- If cart is empty, attempting to submit shows:
  - “Cannot place order with empty cart”
- On successful order creation:
  - Confirmation screen shows:
    - “Your order has been placed successfully”
    - Order ID
    - Total price
    - Delivery type
    - Full order summary (items, quantity, per-item price, line totals)
  - Cart is cleared and user is redirected back to Home after a short delay.

### Admin Dashboard

Route: `/admin`

- Simple client-side password gate:
  - Default password: `admin123` (demo only, not secure)
- Orders tab:
  - List of orders sorted newest-first
  - Shows ID, customer, phone, total, status, date
  - Status options: Pending, Preparing, Ready, Completed
  - Change status via dropdown; updates backend
  - View order details and item breakdown in a modal
- Menu Management tab:
  - Add new items with:
    - Required: name, price > 0, category
    - Optional: description, image URL
  - Edit existing menu items:
    - Loads item data into the form
    - Save changes and immediately reflect in the list
  - Delete items:
    - If the item is part of an existing order, deletion is blocked and an error is shown.

## Testing

- Core smoke test: [`src/App.test.js`](src/App.test.js)
  - Verifies that the home page heading “Welcome to QuickBite” renders.
- You can add more tests alongside components and pages as needed.

Run tests:

```bash
cd quickbite-frontend
npm test
```

## Development Tips

- Keep API contracts in sync with the backend:
  - Menu items: name, price, description, imageUrl, ingredients, availability, category
  - Orders: customer info, deliveryType, pickupTime/address, items, totalPrice, status
- Cart behavior and total price calculation live in `CartContext` and `Cart` – reuse these when extending the checkout flow.
- For styling, follow existing patterns in `src/styles` to keep the UI consistent.
