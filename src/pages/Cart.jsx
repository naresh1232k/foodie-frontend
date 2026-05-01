import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious vegan dishes!</p>
        <button className="btn-green" onClick={() => navigate('/menu')}>Browse Menu</button>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1 className="cart-title">Your <span className="text-green">Cart</span></h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <span className="cart-item-total">${(item.price * item.qty).toFixed(2)}</span>
                <button className="cart-remove" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span>$2.99</span></div>
            <div className="summary-row"><span>Tax (8%)</span><span>${(total * 0.08).toFixed(2)}</span></div>
            <div className="summary-row total"><span>Total</span><span>${(total + 2.99 + total * 0.08).toFixed(2)}</span></div>

            <button className="btn-green full" onClick={() => user ? navigate('/checkout') : navigate('/login')}>
              {user ? 'Proceed to Checkout' : 'Sign in to Checkout'}
            </button>
            <button className="btn-outline full" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
