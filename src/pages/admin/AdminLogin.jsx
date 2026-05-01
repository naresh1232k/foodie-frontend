import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await authAPI.adminLogin(form);
      if (res.user?.role !== 'ADMIN') throw new Error('Not an admin account');
      login(res.user, res.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Admin login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-left admin-left">
        <div className="admin-bg-pattern" />
        <div className="auth-left-overlay">
          <div className="admin-shield">🛡️</div>
          <h2 className="auth-brand">Admin<br/><span>Portal</span></h2>
          <p>Restricted access — authorized personnel only</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-logo">🛡️</div>
          <h2>Admin Login</h2>
          <p className="auth-sub">Manage your restaurant</p>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" placeholder="admin@fodie.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn-auth btn-admin" disabled={loading}>{loading ? 'Authenticating...' : 'Access Admin Panel'}</button>
          </form>
          <p className="auth-switch"><Link to="/login">← Back to User Login</Link></p>
        </div>
      </div>
    </div>
  );
}
