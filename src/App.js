import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { CartProvider, useCart } from './context/CartContext';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Menu from './pages/Menu';

const NavBar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍔 QuickBite
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/menu" 
              className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}
            >
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin" 
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/checkout" 
              className={`nav-link cart-link ${location.pathname === '/checkout' ? 'active' : ''}`}
            >
              🛒 Cart ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 QuickBite v3.0.1. All rights reserved.</p>
        <p>Fast. Fresh. Delicious.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
