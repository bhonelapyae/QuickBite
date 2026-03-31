# QuickBite - Complete Food Delivery Platform

A modern, full-stack food delivery application built with React and Spring Boot.

## Project Structure

```
QuickBite/
├── quickbite-frontend/     # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context (Cart management)
│   │   ├── services/       # API service
│   │   ├── styles/         # CSS files
│   │   └── App.js          # Main app with routing
│   └── package.json
└── quickbite-backend/      # Spring Boot backend
    ├── src/
    │   └── main/
    │       ├── java/com/quickbite/
    │       │   ├── entity/      # JPA entities
    │       │   ├── repository/  # Data access layer
    │       │   ├── service/     # Business logic
    │       │   ├── controller/  # REST controllers
    │       │   ├── dto/         # Data transfer objects
    │       │   └── QuickBiteApplication.java
    │       └── resources/
    │           ├── application.properties
    │           └── data.sql       # Sample data
    └── pom.xml
```

## Phase 2: Core Functionality Implementation

### Features Implemented

#### 1. **Menu Browsing**
- View all menu items
- Filter by categories (Burger, Pizza, Drinks, Desserts)
- View item details including price, description, and images
- Real-time category filtering

**Backend Endpoints:**
- `GET /api/categories` - Get all categories
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category={id}` - Get items by category
- `GET /api/menu/{id}` - Get menu item details

#### 2. **Cart Management**
- Frontend-only cart using React Context
- Add items to cart with quantity selection
- Remove items from cart
- Update item quantities dynamically
- View cart total price
- Persistent cart storage (localStorage)

#### 3. **Order Placement**
- Checkout page with order form
- Customer information collection (name, email, phone)
- Delivery options (Delivery or Pickup)
- Delivery address collection
- Order confirmation screen
- Order ID and total price confirmation

**Backend Endpoints:**
- `POST /api/order` - Create new order
- `GET /api/order/{id}` - Get order details

#### 4. **Admin Panel**
- Protected admin section at `/admin`
- **Order Management:**
  - View all incoming orders
  - Update order status (Pending, Preparing, Ready, Delivered)
  - View order details and items
- **Menu Management:**
  - Add new menu items
  - Edit existing items
  - Delete menu items
  - Assign items to categories

**Backend Endpoints:**
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/status/{status}` - Get orders by status
- `PATCH /api/admin/orders/{id}/status` - Update order status
- `POST /api/menu` - Create menu item
- `PUT /api/menu/{id}` - Update menu item
- `DELETE /api/menu/{id}` - Delete menu item

## Getting Started

### Prerequisites
- Node.js (v14+) for frontend
- Java 17+ for backend
- Maven for building backend

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd quickbite-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   - The app will open at `http://localhost:3000`
   - Changes auto-reload

4. **Build for production:**
   ```bash
   npm build
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd quickbite-backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   - Server runs on `http://localhost:8080`
   - H2 database console at `http://localhost:8080/h2-console`

4. **Database Access:**
   - URL: `jdbc:h2:mem:quickbitedb`
   - Username: `sa`
   - Password: (blank)

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Categories
- **GET** `/categories` - Get all categories
- **GET** `/categories/{id}` - Get category by ID

### Menu Items
- **GET** `/menu` - Get all menu items
- **GET** `/menu?category={id}` - Get items by category
- **GET** `/menu/{id}` - Get menu item details
- **POST** `/menu` - Create menu item (Admin)
- **PUT** `/menu/{id}` - Update menu item (Admin)
- **DELETE** `/menu/{id}` - Delete menu item (Admin)

### Orders
- **POST** `/order` - Create order
- **GET** `/order/{id}` - Get order details

### Admin
- **GET** `/admin/orders` - Get all orders
- **GET** `/admin/orders/status/{status}` - Get orders by status
- **PATCH** `/admin/orders/{id}/status?status={newStatus}` - Update order status

## Sample Order Request

```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1 (555) 000-0000",
  "deliveryType": "delivery",
  "deliveryAddress": "123 Main Street, City, State 12345",
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    },
    {
      "menuItemId": 3,
      "quantity": 1
    }
  ]
}
```

## Technology Stack

### Frontend
- **React 19** - UI framework
- **React Router v6** - Client-side routing
- **CSS3** - Styling
- **Context API** - State management (Cart)
- **Fetch API** - HTTP requests

### Backend
- **Spring Boot 3.2** - Web framework
- **Spring Data JPA** - ORM
- **H2 Database** - In-memory database
- **Lombok** - Code generation
- **Maven** - Build tool

## Component Structure

### Frontend Components
- **MenuItemCard** - Displays individual menu item with add to cart
- **MenuList** - Grid of menu items
- **Cart** - Shopping cart display and management
- **OrderForm** - Customer information and order form
- **AdminPanel** - Admin dashboard for orders and menu items

### Pages
- **Home** - Landing page with features showcase
- **Menu** - Menu browsing with category filtering
- **Checkout** - Cart review and order placement
- **Admin** - Admin dashboard (Orders & Menu Management)

## Features Highlight

✅ Responsive design (mobile, tablet, desktop)
✅ Real-time cart updates
✅ Category-based filtering
✅ Order confirmation
✅ Admin order tracking
✅ Menu management (Add/Edit/Delete)
✅ Persistent cart storage
✅ Professional UI/UX
✅ Error handling and validation
✅ RESTful API architecture

## Future Enhancements (Phase 3+)

- User authentication and registration
- Order history for logged-in users
- Payment integration
- Real-time order tracking
- Email notifications
- Reviews and ratings
- Promotional codes/discounts
- Push notifications
- Mobile app (React Native)
- Chat support

## Running Both Frontend and Backend

### Terminal 1 - Backend
```bash
cd quickbite-backend
mvn spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd quickbite-frontend
npm start
```

## Notes

- Frontend communicates with backend via API calls to `http://localhost:8080/api`
- CORS is enabled for `http://localhost:3000`
- Cart is stored in browser localStorage
- Sample data is loaded automatically when backend starts
- Admin section is not password protected in this version

## License

MIT License

---

**Happy Coding! 🍔🍕🚀**
