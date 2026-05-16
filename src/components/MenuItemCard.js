import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/MenuItemCard.css';

const MenuItemCard = ({ menuItem, onDetailClick = null }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(menuItem, quantity);
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div className="menu-item-card">
      <div className="card-image">
        <img 
          src={menuItem.imageUrl || 'https://via.placeholder.com/300'} 
          alt={menuItem.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="item-name">{menuItem.name}</h3>
        <p className="item-description">{menuItem.description}</p>
        {menuItem.categoryName && (
          <span className="item-category">{menuItem.categoryName}</span>
        )}
        <div className="item-footer">
          <span className="item-price">${menuItem.price.toFixed(2)}</span>
          <div className="quantity-controls">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="qty-btn"
            >
              -
            </button>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="qty-input"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="qty-btn"
            >
              +
            </button>
          </div>
        </div>
        <button 
          className={`add-to-cart-btn ${isAddingToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={!menuItem.available}
        >
          {!menuItem.available ? 'Not Available' : (isAddingToCart ? '✓ Added' : 'Add to Cart')}
        </button>
        {onDetailClick && (
          <button 
            className="detail-btn"
            onClick={() => onDetailClick(menuItem)}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
