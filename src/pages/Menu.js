import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuList from '../components/MenuList';
import { apiService } from '../services/apiService';
import '../styles/Menu.css';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      await loadCategories();
      const categoryParam = searchParams.get('category');
      const initialCategory = categoryParam ? parseInt(categoryParam, 10) : null;
      await loadMenuItems(initialCategory);
      setSelectedCategory(initialCategory);
      setIsInitialLoad(false);
    };
    fetchData();
  }, [searchParams]);

  const loadCategories = async () => {
    try {
      const data = await apiService.getCategories();
      // Deduplicate categories by ID
      const uniqueCategories = Array.from(new Map(data.map(cat => [cat.id, cat])).values());
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    }
  };

  const loadMenuItems = async (categoryId = null) => {
    // Only show loading for initial load, not for category filtering
    if (isInitialLoad) {
      setIsLoading(true);
    }
    try {
      const data = await apiService.getMenuItems(categoryId);
      // Deduplicate menu items by ID
      const uniqueItems = Array.from(new Map(data.map(item => [item.id, item])).values());
      setMenuItems(uniqueItems);
      setSelectedCategory(categoryId);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      loadMenuItems(); // Reset to all items
    } else {
      loadMenuItems(categoryId);
    }
  };

   const handleDetailClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Menu</h1>
        <p>Explore our delicious food options</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="categories-section">
        <h2>Categories</h2>
        <div className="categories-list">
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => loadMenuItems()}
          >
            All Items
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-items-section">
        {isLoading ? (
          <div className="loading">Loading menu items...</div>
        ) : menuItems.length === 0 ? (
          <div className="no-items">No items available in this category</div>
        ) : (
          <MenuList items={menuItems} onDetailClick={handleDetailClick} />
        )}
      </div>
      {selectedItem && (
        <div className="menu-item-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="menu-item-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={selectedItem.imageUrl || 'https://via.placeholder.com/300'}
                  alt={selectedItem.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                  }}
                />
              </div>
              <div className="modal-details">
                <h2>{selectedItem.name}</h2>
                <p className="modal-price">${selectedItem.price.toFixed(2)}</p>
                <p className="modal-description">{selectedItem.description}</p>
                {selectedItem.ingredients && (
                  <div className="modal-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {selectedItem.ingredients.split(',').map((part, index) => (
                        <li key={index}>{part.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!selectedItem.available && (
                  <p className="modal-unavailable">Currently unavailable</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
