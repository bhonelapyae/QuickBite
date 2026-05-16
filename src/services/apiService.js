const API_BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  },

  // Menu Items
  getMenuItems: async (categoryId = null) => {
    const url = categoryId 
      ? `${API_BASE_URL}/menu?category=${categoryId}` 
      : `${API_BASE_URL}/menu`;
    const response = await fetch(url);
    return response.json();
  },

  getMenuItemById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`);
    return response.json();
  },

  createMenuItem: async (menuItem) => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem)
    });
    return response.json();
  },

  updateMenuItem: async (id, menuItem) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem)
    });
    return response.json();
  },

  deleteMenuItem: async (id) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE'
    });
    return response;
  },

  // Orders
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  getOrder: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`);
    return response.json();
  },

  // Admin
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`);
    return response.json();
  },

  getOrdersByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/status/${status}`);
    return response.json();
  },

  updateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status?status=${status}`, {
      method: 'PATCH'
    });
    return response.json();
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};
