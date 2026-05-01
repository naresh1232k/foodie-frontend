import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI, paymentAPI } from '../services/api';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXX';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const grandTotal = (total + 2.99 + total * 0.08).toFixed(2);

  const loadRazorpay = () => new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city) return setError('Please fill in delivery address');
    setLoading(true); setError('');

    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error('Payment gateway failed to load');

      // Create Razorpay order via backend
  const amount = Number(grandTotal);

if (!amount || amount <= 0) {
  throw new Error("Invalid amount");
}

const razorOrder = await paymentAPI.createOrder(
  Math.round(amount * 100)
);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Sd3N6HaAMOsi0B',
        amount: razorOrder.amount,
        currency: 'INR',
        name: 'Vegan Restaurant',
        description: 'Food Order',
        order_id: razorOrder.id,
        prefill: { name: user.name, email: user.email },
        theme: { color: '#5a8a3c' },
        handler: async (response) => {
          try {
            // Verify payment
            await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            // Create order in DB
            await orderAPI.create({
              items: items.map(i => ({ menuItemId: i.id, quantity: i.qty, price: i.price })),
              deliveryAddress: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
              totalAmount: parseFloat(grandTotal),
              paymentId: response.razorpay_payment_id,
            });
            clearCart();
            navigate('/order-success');
          } catch (err) {
            setError('Payment verification failed. Contact support.');
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setError(err.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-layout">
          <form onSubmit={handlePayment} className="checkout-form">
            <div className="checkout-section">
              <h3>Delivery Address</h3>
              {error && <div className="auth-error">{error}</div>}
              <div className="form-group">
                <label>Street Address</label>
                <input placeholder="123 Green Street" value={address.street}
                  onChange={e => setAddress({...address, street: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input placeholder="Chennai" value={address.city}
                    onChange={e => setAddress({...address, city: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input placeholder="Tamil Nadu" value={address.state}
                    onChange={e => setAddress({...address, state: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>ZIP / PIN Code</label>
                <input placeholder="600001" value={address.zip}
                  onChange={e => setAddress({...address, zip: e.target.value})} />
              </div>
            </div>

            <div className="checkout-section payment-info">
              <h3>Payment</h3>
              <div className="payment-logos">
                <span>💳 Cards</span><span>📱 UPI</span><span>🏦 Net Banking</span><span>💼 Wallets</span>
              </div>
              <p className="payment-note">You will be redirected to Razorpay's secure payment page</p>
            </div>

            <button type="submit" className="btn-green full pay-btn" disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${grandTotal}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {items.map(item => (
              <div key={item.id} className="order-item-row">
                <span>{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span>$2.99</span></div>
            <div className="summary-row"><span>Tax</span><span>${(total * 0.08).toFixed(2)}</span></div>
            <div className="summary-row total"><span>Total</span><span>${grandTotal}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
