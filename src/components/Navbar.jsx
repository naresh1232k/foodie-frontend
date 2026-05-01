import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setDropdownOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.user-dropdown-wrap')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Restaurant', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Events', path: '/events' },
    { label: 'About Us', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setDrawerOpen(false);
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* ── LEFT: Logo ── */}
          <Link to="/" className="nav-logo">
            <span className="nav-logo-icon">🌿</span>
            <span className="nav-logo-text">
              <span className="nav-logo-vegan">vegan</span>
              <span className="nav-logo-rest">restaurant</span>
            </span>
          </Link>

          {/* ── CENTER: Nav Links (desktop) ── */}
          <div className="nav-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link${isActive(link.path) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── RIGHT: Actions ── */}
          <div className="nav-actions">

            {/* Expanding Search */}
            <div className={`nav-search-wrap${searchOpen ? ' open' : ''}`}>
              {searchOpen && (
                <form onSubmit={handleSearch} className="nav-search-form">
                  <input
                    autoFocus
                    placeholder="Search dishes..."
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    className="nav-search-input"
                  />
                </form>
              )}
              <button
                className="icon-btn"
                aria-label="Search"
                onClick={() => setSearchOpen(o => !o)}
              >
                {searchOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
              </button>
            </div>

            {/* User Dropdown */}
            <div className="user-dropdown-wrap">
              <button
                className="icon-btn"
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="Account"
              >
                {user ? (
                  <div className="nav-avatar">{user.name?.[0]?.toUpperCase()}</div>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                )}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {user ? (
                    <>
                      <span className="dropdown-name">Hi, {user.name?.split(' ')[0]} 👋</span>
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>My Orders</Link>
                      {user.role === 'ADMIN' && (
                        <Link to="/admin" onClick={() => setDropdownOpen(false)}>Admin Panel</Link>
                      )}
                      <button onClick={handleLogout}>Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setDropdownOpen(false)}>Sign In</Link>
                      <Link to="/register" onClick={() => setDropdownOpen(false)}>Register</Link>
                      <Link to="/admin/login" onClick={() => setDropdownOpen(false)}>Admin Login</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="icon-btn" onClick={() => navigate('/cart')} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>

            {/* Sign In button (desktop, not logged in) */}
            {!user && (
              <Link to="/login" className="btn-signin">Sign in</Link>
            )}

            {/* Hamburger (mobile only) */}
            <button
              className={`hamburger${drawerOpen ? ' open' : ''}`}
              onClick={() => setDrawerOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay${drawerOpen ? ' show' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-in Drawer */}
      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        {/* Drawer Logo */}
        <div className="drawer-logo">
          <span>🌿</span>
          <span>vegan restaurant</span>
        </div>

        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link${isActive(link.path) ? ' active' : ''}`}
            onClick={() => setDrawerOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="nav-drawer-footer">
          {user ? (
            <>
              <span className="drawer-user">👤 {user.name}</span>
              <Link to="/dashboard" className="btn-green drawer-btn" onClick={() => setDrawerOpen(false)}>
                My Orders
              </Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="btn-outline drawer-btn" onClick={() => setDrawerOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <button className="btn-outline drawer-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-green drawer-btn" onClick={() => setDrawerOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn-outline drawer-btn" onClick={() => setDrawerOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
