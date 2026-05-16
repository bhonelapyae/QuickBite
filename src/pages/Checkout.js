import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import { useCart } from '../context/CartContext';
import { apiService } from '../services/apiService';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);

  const handleOrderSubmit = async (formData) => {
    if (cart.length === 0) {
      setError('Cannot place order with empty cart');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      };

      const response = await apiService.createOrder(orderData);
      
      // Show confirmation
      setConfirmationData(response);
      clearCart();

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError('Order failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmationData) {
    return (
      <div className="checkout-page">
        <div className="confirmation-screen">
          <div className="confirmation-content">
            <h1>Order Confirmed! ✓</h1>
            <div className="confirmation-details">
              <p className="confirmation-message">
                Your order has been placed successfully.
              </p>
              <p><strong>Order ID:</strong> #{confirmationData.id}</p>
              <p><strong>Total:</strong> ${confirmationData.totalPrice.toFixed(2)}</p>
              <p><strong>Delivery Type:</strong> {confirmationData.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}</p>
              {confirmationData.items && confirmationData.items.length > 0 && (
                <div className="confirmation-summary">
                  <h2>Order Summary</h2>
                  <ul>
                    {confirmationData.items.map((item, index) => (
                      <li key={index}>
                        {item.menuItemName} × {item.quantity} @ ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="thank-you">Thank you for your order!</p>
              <p className="redirect-msg">Redirecting to home in a moment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h1>Checkout</h1>
          <p>Your cart is empty. Please add items before checking out.</p>
          <button onClick={() => navigate('/menu')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="checkout-container">
        <div className="checkout-cart-section">
          <Cart />
        </div>
        <div className="checkout-form-section">
          <OrderForm 
            onSubmit={handleOrderSubmit}
            isLoading={isLoading}
            totalPrice={getTotalPrice()}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
