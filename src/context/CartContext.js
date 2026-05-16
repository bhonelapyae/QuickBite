import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (menuItem, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...menuItem, quantity }];
      }
    });
  };

  const removeFromCart = (menuItemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== menuItemId));
  };

  const updateQuantity = (menuItemId, quantity) => {
    let nextQuantity = quantity;
    if (nextQuantity < 1) {
      nextQuantity = 1;
    }
    if (nextQuantity > 99) {
      nextQuantity = 99;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === menuItemId ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
