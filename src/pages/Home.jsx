import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { menuAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const StarRating = ({ rating }) => (
  <div className="stars">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="14" height="14" viewBox="0 0 24 24"
        fill={s <= Math.floor(rating) ? '#5a8a3c' : s === Math.ceil(rating) && rating % 1 ? '#5a8a3c' : 'none'}
        stroke="#5a8a3c" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const DEMO_ITEMS = [
  { id:1, name:'Green Toast with Eggs', price:12.50, rating:4.5, category:'Breakfast', image:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80', description:'Avocado toast with poached eggs and fresh greens' },
  { id:2, name:'Buddha Bowl', price:14.00, rating:5, category:'Bowls', image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', description:'Nourishing bowl packed with grains and vegetables' },
  { id:3, name:'Garden Salad', price:10.50, rating:4, category:'Salads', image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', description:'Fresh garden vegetables with herb dressing' },
];

export default function Home() {
  const [featured, setFeatured] = useState(DEMO_ITEMS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    menuAPI.getAll().then(data => { if(data?.length) setFeatured(data.slice(0,3)); }).catch(() => {});
  }, []);

  const current = featured[currentIdx];
  const prev = () => setCurrentIdx(i => (i - 1 + featured.length) % featured.length);
  const next = () => setCurrentIdx(i => (i + 1) % featured.length);

  const sideItems = featured.filter((_, i) => i !== currentIdx).slice(0, 2);

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-main">
        {/* Left column — gallery strip */}
        <aside className="gallery-strip">
          {sideItems.map((item, i) => (
            <div key={item.id} className="gallery-card">
              <img src={item.image} alt={item.name} />
              <div className="gallery-meta">
                <StarRating rating={item.rating} />
                <div className="gallery-actions">
                  <button aria-label="like">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button aria-label="share">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Center — hero content */}
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="hero-green">vegan</span>
            <br />restaurant
          </h1>
          <div className="hero-divider" />
          <p className="hero-desc">
            Fresh, plant-based cuisine crafted with love. Every dish tells a story of nature's finest ingredients.
          </p>

          <div className="hero-rating">
            <StarRating rating={current?.rating || 4.5} />
            <button className="icon-btn-sm" aria-label="like">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="icon-btn-sm" aria-label="share">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>

          {/* Featured card */}
          <div className="featured-card">
            <div className="featured-card-accent" />
            <div className="featured-card-body">
              <div className="featured-card-top">
                <div>
                  <StarRating rating={current?.rating || 4.5} />
                  <h3 className="featured-name">{current?.name}</h3>
                </div>
                <span className="featured-price">${current?.price?.toFixed(2)}</span>
              </div>
              <p className="featured-desc">{current?.description}</p>
              <div className="featured-card-actions">
                <button className="icon-btn-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button className="icon-btn-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a8a3c" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
                <button className="btn-add-cart" onClick={() => { addItem(current); navigate('/cart'); }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="hero-pagination">
            <button className="pag-btn" onClick={prev}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Prev
            </button>
            <div className="pag-dots">
              {featured.map((_, i) => (
                <span key={i} className={`pag-dot ${i === currentIdx ? 'active' : ''}`} onClick={() => setCurrentIdx(i)} />
              ))}
            </div>
            <button className="pag-btn" onClick={next}>
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </section>
       
        {/* Right — hero food image */}
        <section className="hero-image-wrap">
          <div className="hero-image-circle">
            <img src={current?.image} alt={current?.name} className="hero-food-img" />
          </div>
        </section>
      </main>

      {/* Social sidebar */}
      <div className="social-sidebar">
        <span className="follow-label">follow us</span>
        {['twitter','facebook','instagram','youtube'].map(s => (
          <a key={s} href={`https://${s}.com`} className="social-link" aria-label={s} target="_blank" rel="noreferrer">
            <SocialIcon name={s} />
          </a>
        ))}
      </div>

      {/* Language sidebar */}
      <div className="lang-sidebar">
        {['EN','SP','FR'].map((lang, i) => (
          <span key={lang} className={`lang-opt ${i === 0 ? 'active' : ''}`}>{lang}</span>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ name }) {
  const icons = {
    twitter: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>,
    facebook: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    instagram: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    youtube: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  };
  return icons[name] || null;
}
