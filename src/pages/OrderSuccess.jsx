// OrderSuccess.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div className="success-page">
      <Navbar />
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h1>Order Placed!</h1>
        <p>Thank you for your order. We'll prepare it fresh for you.</p>
        <div className="success-actions">
          <button className="btn-green" onClick={() => navigate('/dashboard')}>Track Order</button>
          <button className="btn-outline" onClick={() => navigate('/menu')}>Order More</button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
