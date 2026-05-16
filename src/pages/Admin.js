import { useState } from 'react';
import AdminPanel from '../components/AdminPanel';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminPanel />
    </div>
  );
};

export default Admin;
