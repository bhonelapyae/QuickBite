# QuickBite - Complete Food Delivery Platform

A modern, full-stack food delivery application built with React and Spring Boot.

---

## 🎯 Project Goal

QuickBite is a complete end-to-end food delivery and ordering platform designed to:
- **Help customers**: Browse menus, add items to cart, and place orders for delivery or pickup
- **Help administrators**: Manage the menu (add/edit/delete items) and track order statuses in real-time

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router v6** - Client-side routing
- **CSS3** - Responsive styling
- **Context API** - State management (Cart)
- **Fetch API** - HTTP communication
- **localStorage** - Persistent cart storage

### Backend
- **Spring Boot 3.2** - Enterprise web framework
- **Spring Data JPA** - ORM for database operations
- **PostgreSQL 42.7.1** - Relational database
- **Lombok** - Reduces boilerplate code
- **Maven** - Build and dependency management
- **Java 21** - Runtime environment

---

## 📦 Project Structure

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
    │       │   ├── config/      # Configuration (DataLoader, WebConfig)
    │       │   ├── controller/  # REST controllers
    │       │   ├── dto/         # Data transfer objects
    │       │   ├── model/       # JPA models/entities
    │       │   ├── repository/  # Data access layer
    │       │   ├── service/     # Business logic
    │       │   └── QuickBiteApplication.java
    │       └── resources/
    │           ├── application.properties
    │           └── data.sql
    └── pom.xml
```

---

## ✅ Priority 1 – MUST HAVE Requirements (All Implemented)

### 1. Browse Menu by Category
- ✅ Categories visible when menu page loads
- ✅ Selecting a category filters items
- ✅ Each item shows name, price, image
- ✅ If empty, shows "No items available"
- **Categories**: Burger, Pizza, Drinks, Desserts, 🍟 Sides, 🌯 Wraps / Sandwiches

### 2. View Menu Item Details
- ✅ Shows name, price, description, ingredients
- ✅ Shows "Currently unavailable" if item not available
- ✅ Page loads quickly (optimized rendering)

### 3. Add Items to Cart
- ✅ Item added on click
- ✅ Default quantity = 1
- ✅ Cart updates count
- ✅ Existing item increases quantity

### 4. Remove Items from Cart
- ✅ Item removed instantly
- ✅ Cart total updates
- ✅ Empty cart shows "Your cart is empty"

### 5. Change Item Quantity
- ✅ Increase/decrease quantity
- ✅ Min = 1, Max = 99
- ✅ Invalid input shows "Invalid quantity" error
- ✅ Total updates automatically

### 6. View Total Price
- ✅ Total visible in cart
- ✅ Updates dynamically
- ✅ Includes prices × quantities
- ✅ Proper currency format ($X.XX)

### 7. Place Order
- ✅ Only works if cart not empty
- ✅ Empty cart shows error
- ✅ Order saved with "Pending" status

### 8. Enter Delivery/Pickup Details
- ✅ Choose delivery or pickup
- ✅ Required fields validation
- ✅ Phone must be numeric
- ✅ Errors shown for missing fields
- ✅ Delivery requires address
- ✅ Pickup requires pickup time

### 9. Receive Order Confirmation
- ✅ Shows order ID, summary, total price
- ✅ Status = Confirmed
- ✅ Error handling if failed
- ✅ Auto-redirect after confirmation

### 10. Admin – Manage Menu
- ✅ Admin authentication required (password: `admin123`)
- ✅ Required fields validation
- ✅ Changes visible immediately
- ✅ Prevent deletion if item in active order

### 11. Admin – View Orders
- ✅ Shows order list (ID, items, price, status)
- ✅ Sorted by newest first
- ✅ Statuses: Pending, Preparing, Ready, Completed
- ✅ Empty shows "No orders yet"
- ✅ Order details modal shows delivery type, address, and pickup time

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) for frontend
- Java 21+ for backend
- Maven for building backend
- PostgreSQL (local instance) for persistence

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
   - App opens at `http://localhost:3000`
   - Changes auto-reload

4. **Build for production:**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd quickbite-backend
   ```

2. **Build the project:**
   ```bash
   mvn clean package -DskipTests
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   - Or use the built JAR: `java -jar target/quickbite-backend-0.1.0.jar`
   - Server runs on `http://localhost:8080`

4. **Database (PostgreSQL):**
   - Ensure PostgreSQL is running locally and database `quickbitedb` exists
   - Default JDBC URL: `jdbc:postgresql://localhost:5432/quickbitedb`
   - Default username: `postgres`
   - Default password: `postgres`
   - Update `src/main/resources/application.properties` if needed

---

## 📚 API Documentation

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

---

## 📝 Sample Order Request

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

---

## 🏗️ Component Structure

### Frontend Components
- **MenuItemCard** - Displays menu item with add to cart
- **MenuList** - Grid of menu items
- **Cart** - Shopping cart display and management
- **OrderForm** - Customer info and order form
- **AdminPanel** - Admin dashboard for orders and menu

### Pages
- **Home** - Landing page
- **Menu** - Menu browsing with filtering
- **Checkout** - Cart review and order placement
- **Admin** - Admin dashboard

---

## 🎨 Features Highlight

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
✅ Sample data auto-loaded on startup

---

## 🔮 Future Enhancements (Phase 3+)

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

---

## 📝 Notes

- Frontend communicates with backend at `http://localhost:8080/api`
- CORS enabled for `http://localhost:3000`
- Cart stored in browser localStorage
- Sample data loaded automatically via DataLoader
- Admin password: `admin123` (demo-only, not production-ready)

---

## 📄 License

MIT License

---

**Happy Coding! 🍔🍕🚀**
