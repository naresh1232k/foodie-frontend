import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { orderAPI } from '../../services/api';

const STATUSES = ['PENDING','PREPARING','READY','DELIVERED','CANCELLED'];
const STATUS_COLOR = { PENDING:'#f59e0b', PREPARING:'#3b82f6', READY:'#8b5cf6', DELIVERED:'#5a8a3c', CANCELLED:'#ef4444' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const load = () => orderAPI.getAll().then(setOrders).catch(() => {});
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await orderAPI.updateStatus(id, status).catch(() => {});
    load();
  };

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header"><h1>Orders</h1></div>

        <div className="filter-tabs">
          {['ALL', ...STATUSES].map(s => (
            <button key={s} className={`filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.userName || 'User'}<br/><small>{order.userEmail}</small></td>
                  <td>{order.items?.map(i => `${i.name}×${i.quantity}`).join(', ')}</td>
                  <td>${order.totalAmount?.toFixed(2)}</td>
                  <td><span className="order-status-badge" style={{ background: STATUS_COLOR[order.status] + '22', color: STATUS_COLOR[order.status] }}>{order.status}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} className="status-select">
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="empty-state">No orders found.</p>}
        </div>
      </main>
    </div>
  );
}
