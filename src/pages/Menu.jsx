import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { menuAPI } from '../services/api';
import { useCart } from '../context/CartContext';


const IMAGE_BASE = "http://localhost:8080/uploads/imgs";

const CATEGORIES = ['All', 'Breakfast', 'Bowls', 'Salads', 'Soups', 'Desserts', 'Drinks'];

const DEMO = [
  { id:1, name:'Green Toast with Eggs', price:12.50, rating:4.5, category:'Breakfast', image:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80', description:'Avocado toast with poached eggs and fresh greens', vegetarian:true },
  { id:2, name:'Buddha Bowl', price:14.00, rating:5, category:'Bowls', image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', description:'Nourishing bowl packed with grains and vegetables', vegetarian:true },
  { id:3, name:'Garden Salad', price:10.50, rating:4, category:'Salads', image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', description:'Fresh garden vegetables with herb dressing', vegetarian:true },
  { id:4, name:'Lentil Soup', price:9.00, rating:4.5, category:'Soups', image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', description:'Hearty lentil soup with aromatic spices', vegetarian:true },
  { id:5, name:'Chia Pudding', price:8.00, rating:4, category:'Desserts', image:'https://images.unsplash.com/photo-1546039907-7b9836ab4c23?w=400&q=80', description:'Creamy chia pudding with fresh berries', vegetarian:true },
  { id:6, name:'Green Smoothie', price:7.50, rating:5, category:'Drinks', image:'https://images.unsplash.com/photo-1611070032073-1aa5e5e99d20?w=400&q=80', description:'Spinach, banana, and almond milk blend', vegetarian:true },
];

const Stars = ({ rating }) => (
  <div className="stars">
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="12" height="12" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? '#5a8a3c' : 'none'}
        stroke="#5a8a3c" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const getImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `http://localhost:8080${img}`;
};


export default function Menu() {
  const [items, setItems] = useState(DEMO);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { addItem, items: cartItems } = useCart();

  useEffect(() => {
    menuAPI.getAll(category !== 'All' ? category : '').then(data => { if(data?.length) setItems(data); }).catch(() => {});
  }, [category]);

  const filtered = items.filter(item =>
    (category === 'All' || item.category === category) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const inCart = (id) => cartItems.find(i => i.id === id);

  return (
    <div className="menu-page">
      <Navbar />
      <div className="menu-container">
        <div className="menu-header">
          <h1>Our <span className="text-green">Menu</span></h1>
          <p>Plant-based dishes crafted with the finest ingredients</p>
        </div>

        {/* Search */}
        <div className="menu-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Category filter */}
        <div className="category-filter">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="menu-grid">
          {filtered.map(item => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-img-wrap">
                 <img className='menu-card-img'  src={getImageUrl(item.image)} alt={item.name} loading="lazy"/>
                {item.vegetarian && <span className="veg-badge">🌱 Vegan</span>}
              </div>
              <div className="menu-card-body">
                <div className="menu-card-top">
                  <Stars rating={item.rating} />
                <span className="menu-cat-tag">{item.category}</span>
                </div>
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-desc">{item.description}</p>
                <div className="menu-card-footer">
                  <span className="menu-item-price">₹{item.price.toFixed(2)}</span>
                  <button
                    className={`btn-add ${inCart(item.id) ? 'added' : ''}`}
                    onClick={() => addItem(item)}
                  >
                    {inCart(item.id) ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No dishes found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
