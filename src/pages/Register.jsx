import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setError(''); setLoading(true);
    try {
      const res = await authAPI.register({ name: form.name, email: form.email, password: form.password });
      login(res.user, res.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80" alt="Fresh salad" />
        <div className="auth-left-overlay">
          <h2 className="auth-brand">vegan<br/><span>restaurant</span></h2>
          <p>Join our plant-based community</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-logo">🌿</div>
          <h2>Create Account</h2>
          <p className="auth-sub">Start your vegan journey</p>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} required />
            </div>
            <button type="submit" className="btn-auth" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
