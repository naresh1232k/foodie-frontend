import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { userAPI } from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const load = () => userAPI.getAll().then(setUsers).catch(() => {});
  useEffect(() => { load(); }, []);

  const toggle = async (id) => { await userAPI.toggleStatus(id).catch(() => {}); load(); };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header"><h1>Users</h1></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>{user.active ? 'Active' : 'Inactive'}</span></td>
                  <td><button className={`btn-toggle ${user.active ? 'deactivate' : 'activate'}`} onClick={() => toggle(user.id)}>{user.active ? 'Deactivate' : 'Activate'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
