
import { useState } from 'react';
import '../styles/OrderForm.css';

const OrderForm = ({ onSubmit, isLoading = false, totalPrice = 0 }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryType: 'delivery',
    deliveryAddress: '',
    pickupTime: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) newErrors.customerEmail = 'Email is invalid';
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone is required';
    } else if (!/^[0-9]{9,15}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Phone must be 9-15 digits and numeric';
    }
    if (formData.deliveryType === 'delivery' && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Address is required for delivery';
    }
    if (formData.deliveryType === 'pickup' && !formData.pickupTime.trim()) {
      newErrors.pickupTime = 'Pickup time is required for pickup';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Order Details</h2>
      
      <div className="form-group">
        <label htmlFor="customerName">Full Name *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className={errors.customerName ? 'error' : ''}
          placeholder="John Doe"
        />
        {errors.customerName && <span className="error-msg">{errors.customerName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className={errors.customerEmail ? 'error' : ''}
          placeholder="john@example.com"
        />
        {errors.customerEmail && <span className="error-msg">{errors.customerEmail}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customerPhone">Phone Number *</label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          className={errors.customerPhone ? 'error' : ''}
          placeholder="+1 (555) 000-0000"
        />
        {errors.customerPhone && <span className="error-msg">{errors.customerPhone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="deliveryType">Delivery Type *</label>
        <select
          id="deliveryType"
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
        >
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
      </div>
      {formData.deliveryType === 'delivery' && (
        <div className="form-group">
          <label htmlFor="deliveryAddress">Delivery Address *</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className={errors.deliveryAddress ? 'error' : ''}
            placeholder="123 Main Street, City, State 12345"
            rows="3"
          />
          {errors.deliveryAddress && <span className="error-msg">{errors.deliveryAddress}</span>}
        </div>
      )}

      {formData.deliveryType === 'pickup' && (
        <div className="form-group">
          <label htmlFor="pickupTime">Pickup Time *</label>
          <input
            type="time"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className={errors.pickupTime ? 'error' : ''}
          />
          {errors.pickupTime && <span className="error-msg">{errors.pickupTime}</span>}
        </div>
      )}

      <div className="form-footer">
        <div className="total-display">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
