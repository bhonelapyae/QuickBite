
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const [quantityError, setQuantityError] = useState('');

  const handleQuantityChange = (id, value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 99) {
      setQuantityError('Invalid quantity');
      return;
    }
    setQuantityError('');
    updateQuantity(id, parsed);
  };

  const handleDecrease = (id, current) => {
    const next = Math.max(1, current - 1);
    updateQuantity(id, next);
  };

  const handleIncrease = (id, current) => {
    const next = Math.min(99, current + 1);
    updateQuantity(id, next);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item-controls">
                  <button 
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    className="qty-input"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                  <button 
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {quantityError && (
            <div className="cart-error">
              {quantityError}
            </div>
          )}
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
