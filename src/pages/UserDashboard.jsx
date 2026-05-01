import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_COLOR = { PENDING:'#f59e0b', PREPARING:'#3b82f6', READY:'#8b5cf6', DELIVERED:'#5a8a3c', CANCELLED:'#ef4444' };

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMyOrders().then(setOrders).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="user-avatar">{user?.name?.[0] || 'U'}</div>
          <div>
            <h1>Welcome, {user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card"><h3>{orders.length}</h3><p>Total Orders</p></div>
          <div className="stat-card"><h3>{orders.filter(o => o.status === 'DELIVERED').length}</h3><p>Delivered</p></div>
          <div className="stat-card"><h3>${orders.reduce((s, o) => s + (o.totalAmount || 0), 0).toFixed(2)}</h3><p>Total Spent</p></div>
        </div>

        <div className="section-title">My Orders</div>
        {loading ? <p>Loading...</p> : orders.length === 0 ? (
          <div className="empty-state"><p>No orders yet. <a href="/menu">Browse our menu!</a></p></div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-top">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-status" style={{ color: STATUS_COLOR[order.status] || '#666' }}>● {order.status}</span>
                </div>
                <div className="order-items-preview">
                  {order.items?.map(item => <span key={item.id}>{item.name} ×{item.quantity}</span>)}
                </div>
                <div className="order-card-footer">
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="order-total">${order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
