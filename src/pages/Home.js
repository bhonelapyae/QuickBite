
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  const getCategoryByName = (name) => {
    return categories.find(cat => 
      cat.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const handleCategoryClick = (categoryName) => {
    const category = getCategoryByName(categoryName);
    if (category) {
      navigate(`/menu?category=${category.id}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to QuickBite</h1>
          <p>Fast, Fresh, and Delicious Food Delivered to Your Door</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/menu')}
          >
            Order Now
          </button>
        </div>
        <div className="hero-image">
          <img 
            src="https://via.placeholder.com/500x400" 
            alt="Food"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400';
            }}
          />
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose QuickBite?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast Delivery</h3>
            <p>Get your food delivered in 30 minutes or less</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍽️</span>
            <h3>Fresh Food</h3>
            <p>Made with the finest ingredients</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Great Prices</h3>
            <p>Affordable meals for everyone</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Pickup Option</h3>
            <p>Or pick up from our location</p>
          </div>
        </div>
      </div>

      <div className="popular-categories-section">
        <h2>Popular Categories</h2>
        <div className="categories-showcase">
          <div className="category-card" onClick={() => handleCategoryClick('Burger')}>
            <div className="category-icon">🍔</div>
            <h3>Burgers</h3>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Pizza')}>
            <div className="category-icon">🍕</div>
            <h3>Pizza</h3>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Drinks')}>
            <div className="category-icon">🥤</div>
            <h3>Drinks</h3>
          </div>
          <div className="category-card" onClick={() => handleCategoryClick('Desserts')}>
            <div className="category-icon">🍰</div>
            <h3>Desserts</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
