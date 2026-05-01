import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const TEAM = [
  {
    name: 'Priya Sharma',
    role: 'Head Chef & Founder',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80',
    bio: 'With 15 years of culinary experience, Priya turned her passion for plant-based cooking into Fodie — a place where healthy food truly tastes extraordinary.',
  },
  {
    name: 'Arjun Menon',
    role: 'Sous Chef',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80',
    bio: 'Arjun brings bold flavours from South Indian cuisine into every dish, creating unique fusions that celebrate local and seasonal ingredients.',
  },
  {
    name: 'Meera Nair',
    role: 'Nutritionist & Menu Designer',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80',
    bio: 'Meera ensures every item on our menu is not just delicious but nutritionally balanced — making plant-based eating effortless and joyful.',
  },
  {
    name: 'Rahul Iyer',
    role: 'Restaurant Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
    bio: 'Rahul keeps the Fodie experience seamless from your first visit to your last bite, ensuring every guest feels truly at home.',
  },
];

const VALUES = [
  { icon: '🌱', title: 'Plant-First', desc: 'Every dish starts with the finest seasonal vegetables, grains, and legumes sourced from local farms.' },
  { icon: '♻️', title: 'Zero Waste', desc: 'We compost, reuse, and repurpose everything we can — from kitchen scraps to packaging materials.' },
  { icon: '🤝', title: 'Community', desc: 'We partner with local farmers, host community events, and give back through food donation programs.' },
  { icon: '💚', title: 'Honest Food', desc: 'No artificial flavours, no preservatives. What you see on the menu is exactly what goes on your plate.' },
];

const STATS = [
  { value: '8+', label: 'Years of Service' },
  { value: '120+', label: 'Menu Items' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '15+', label: 'Local Farm Partners' },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
            alt="Fodie Restaurant"
            className="about-hero-img"
          />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content">
          <p className="about-hero-tag">Our Story</p>
          <h1>
            Food that <span className="text-green-light">nourishes</span><br />
            the body & soul
          </h1>
          <p className="about-hero-sub">
            Born from a love of plants, a respect for the earth, and a belief that vegan food should never compromise on flavour.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {STATS.map(s => (
          <div key={s.label} className="about-stat">
            <span className="about-stat-value">{s.value}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="about-story-inner">
          <div className="about-story-text">
            <p className="section-tag">How It Started</p>
            <h2>From a small kitchen <span className="text-green">to a community table</span></h2>
            <p>
              Fodie began in 2017 when our founder Priya Sharma started cooking plant-based meals for her neighbours in Chennai. What started as weekend meal preps quickly grew into a movement — friends bringing friends, families discovering that vegan food could be bold, satisfying, and deeply rooted in tradition.
            </p>
            <p>
              In 2019, we opened our first restaurant and haven't looked back since. Today, Fodie is more than a restaurant — it's a gathering place for people who believe that what we eat shapes the world we live in.
            </p>
            <button className="btn-green" onClick={() => navigate('/menu')}>
              Explore Our Menu
            </button>
          </div>
          <div className="about-story-images">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80"
              alt="Our food"
              className="story-img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80"
              alt="Fresh ingredients"
              className="story-img-small"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-section-inner">
          <p className="section-tag center">What We Stand For</p>
          <h2 className="center">Our <span className="text-green">Values</span></h2>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="about-section-inner">
          <p className="section-tag center">The People Behind Fodie</p>
          <h2 className="center">Meet the <span className="text-green">Team</span></h2>
          <div className="team-grid">
            {TEAM.map(member => (
              <div key={member.name} className="team-card">
                <img src={member.image} alt={member.name} className="team-img" />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <h2>Ready to taste the difference?</h2>
          <p>Come dine with us or order from the comfort of your home.</p>
          <div className="about-cta-btns">
            <button className="btn-green" onClick={() => navigate('/menu')}>Order Now</button>
            <button className="btn-outline" onClick={() => navigate('/events')}>View Events</button>
          </div>
        </div>
      </section>
    </div>
  );
}
