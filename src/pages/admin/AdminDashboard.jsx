import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { orderAPI, userAPI } from '../../services/api';

function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const links = [
    { path:'/admin', label:'Dashboard', icon:'📊' },
    { path:'/admin/menu', label:'Menu Items', icon:'🥗' },
    { path:'/admin/orders', label:'Orders', icon:'📦' },
    { path:'/admin/users', label:'Users', icon:'👥' },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">🌿 Admin</div>
      <nav className="admin-nav">
        {links.map(l => (
          <Link key={l.path} to={l.path} className={`admin-nav-link ${location.pathname === l.path ? 'active' : ''}`}>
            <span>{l.icon}</span>{l.label}
          </Link>
        ))}
      </nav>
      <button className="admin-logout" onClick={() => { logout(); navigate('/'); }}>🚪 Logout</button>
    </aside>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, users: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    Promise.all([orderAPI.getAll(), userAPI.getAll()]).then(([orders, users]) => {
      setStats({
        orders: orders.length,
        users: users.length,
        revenue: orders.reduce((s, o) => s + (o.totalAmount || 0), 0),
        pending: orders.filter(o => o.status === 'PENDING').length,
      });
    }).catch(() => {});
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <h1>Dashboard</h1>
          <span className="admin-date">{new Date().toDateString()}</span>
        </div>
        <div className="admin-stats-grid">
          {[
            { label:'Total Orders', value: stats.orders, icon:'📦', color:'#5a8a3c' },
            { label:'Revenue', value:`$${stats.revenue.toFixed(2)}`, icon:'💰', color:'#3b82f6' },
            { label:'Registered Users', value: stats.users, icon:'👥', color:'#8b5cf6' },
            { label:'Pending Orders', value: stats.pending, icon:'⏳', color:'#f59e0b' },
          ].map(s => (
            <div key={s.label} className="admin-stat-card" style={{ borderTopColor: s.color }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="admin-quick-links">
          <Link to="/admin/orders" className="quick-link">View All Orders →</Link>
          <Link to="/admin/menu" className="quick-link">Manage Menu →</Link>
        </div>
      </main>
    </div>
  );
}

export { AdminSidebar };
