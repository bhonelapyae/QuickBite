
import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
    available: true
  });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'menu') {
      loadMenuItems();
      loadCategories();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAllOrders();
      // Deduplicate orders by ID
      const uniqueOrders = Array.from(new Map(data.map(order => [order.id, order])).values());
      setOrders(uniqueOrders);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMenuItems = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getMenuItems();
      // Deduplicate menu items by ID
      const uniqueItems = Array.from(new Map(data.map(item => [item.id, item])).values());
      setMenuItems(uniqueItems);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await apiService.getCategories();
      // Deduplicate categories by ID
      const uniqueCategories = Array.from(new Map(data.map(cat => [cat.id, cat])).values());
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    if (!newMenuItem.price || !newMenuItem.categoryId) {
      setError('Please fill in all required fields');
      return;
    }
    const parsedPrice = parseFloat(newMenuItem.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    try {
      const payload = {
        ...newMenuItem,
        price: parsedPrice,
        categoryId: parseInt(newMenuItem.categoryId, 10)
      };
      if (editingItemId) {
        await apiService.updateMenuItem(editingItemId, payload);
      } else {
        await apiService.createMenuItem(payload);
      }
      setNewMenuItem({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        categoryId: '',
        available: true
      });
      setEditingItemId(null);
      loadMenuItems();
    } catch (err) {
      setError('Failed to save menu item');
      console.error(err);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await apiService.deleteMenuItem(id);
        loadMenuItems();
      } catch (err) {
        setError('Cannot delete item that is part of an active order');
        console.error(err);
      }
    }
  };

  const handleEditMenuItem = (item) => {
    setNewMenuItem({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      imageUrl: item.imageUrl || '',
      categoryId: item.categoryId ? item.categoryId.toString() : '',
      available: item.available
    });
    setEditingItemId(item.id);
    setActiveTab('menu');
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h2>Current Orders</h2>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.customerPhone}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="view-btn"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="admin-section">
            <div className="menu-management">
            <div className="add-menu-form">
              <h2>{editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <form onSubmit={handleAddMenuItem}>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Price"
                  step="0.01"
                  min="0.01"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                  required
                />
                <select
                  value={newMenuItem.categoryId}
                  onChange={(e) => setNewMenuItem({...newMenuItem, categoryId: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={newMenuItem.imageUrl}
                  onChange={(e) => setNewMenuItem({...newMenuItem, imageUrl: e.target.value})}
                />
                <button type="submit" className="add-btn">
                  {editingItemId ? 'Save Changes' : 'Add Menu Item'}
                </button>
              </form>
            </div>

            <div className="menu-items-list">
              <h2>Menu Items</h2>
              {isLoading ? (
                <p>Loading menu items...</p>
              ) : menuItems.length === 0 ? (
                <p>No menu items</p>
              ) : (
                <div className="items-grid">
                  {menuItems.map(item => (
                    <div key={item.id} className="menu-item-admin">
                      <h4>{item.name}</h4>
                      <p>{item.categoryName}</p>
                      <p className="price">${item.price.toFixed(2)}</p>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditMenuItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteMenuItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>
            <h2>Order Details - #{selectedOrder.id}</h2>
            <div className="order-details">
              <div className="detail-row">
                <label>Customer Name:</label>
                <span>{selectedOrder.customerName}</span>
              </div>
              <div className="detail-row">
                <label>Phone:</label>
                <span>{selectedOrder.customerPhone}</span>
              </div>
              <div className="detail-row">
                <label>Delivery Type:</label>
                <span>{selectedOrder.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
              </div>
              {selectedOrder.deliveryType === 'delivery' && (
                <div className="detail-row">
                  <label>Delivery Address:</label>
                  <span>{selectedOrder.deliveryAddress}</span>
                </div>
              )}
              {selectedOrder.deliveryType === 'pickup' && selectedOrder.pickupTime && (
                <div className="detail-row">
                  <label>Pickup Time:</label>
                  <span>{selectedOrder.pickupTime}</span>
                </div>
              )}
              <div className="detail-row">
                <label>Status:</label>
                <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status.toUpperCase()}</span>
              </div>
              <div className="detail-row">
                <label>Total Price:</label>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <label>Order Date:</label>
                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              
              <h3>Order Items</h3>
              <div className="order-items-list">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.menuItemName}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items in this order</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
