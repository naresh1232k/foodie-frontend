import Navbar from '../components/Navbar';

const EVENTS = [
  {
    id: 1,
    title: 'Vegan Cooking Masterclass',
    date: 'April 20, 2026',
    time: '11:00 AM – 2:00 PM',
    location: 'Main Kitchen, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
    description: 'Join our head chef for a hands-on cooking class where you will learn to prepare three signature vegan dishes from scratch using seasonal ingredients.',
    seats: 12,
    price: 45,
    tag: 'Workshop',
  },
  {
    id: 2,
    title: 'Plant-Based Nutrition Talk',
    date: 'May 3, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'Dining Hall, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    description: 'A licensed nutritionist shares the science behind plant-based eating — covering protein sources, micronutrients, meal planning and gut health.',
    seats: 30,
    price: 0,
    tag: 'Talk',
  },
  {
    id: 3,
    title: 'Sunday Brunch Experience',
    date: 'May 11, 2026',
    time: '9:00 AM – 12:00 PM',
    location: 'Garden Terrace, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80',
    description: 'A relaxed Sunday brunch with an exclusive seasonal menu, live acoustic music, and unlimited fresh juices and smoothies.',
    seats: 40,
    price: 28,
    tag: 'Brunch',
  },
  {
    id: 4,
    title: 'Zero Waste Cooking Demo',
    date: 'May 18, 2026',
    time: '3:00 PM – 5:00 PM',
    location: 'Main Kitchen, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=600&q=80',
    description: 'Learn how to cook delicious meals using every part of your vegetables — stems, skins, leaves and all. Reduce waste and maximise flavour.',
    seats: 15,
    price: 20,
    tag: 'Workshop',
  },
  {
    id: 5,
    title: 'World Vegan Day Dinner',
    date: 'June 1, 2026',
    time: '7:00 PM – 10:00 PM',
    location: 'Main Dining Room, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    description: 'A special five-course tasting dinner celebrating World Vegan Day, featuring dishes inspired by plant-based cuisines from around the world.',
    seats: 50,
    price: 65,
    tag: 'Dinner',
  },
  {
    id: 6,
    title: 'Kids Vegan Cooking Club',
    date: 'June 7, 2026',
    time: '10:00 AM – 12:00 PM',
    location: 'Main Kitchen, Fodie Restaurant',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80',
    description: 'A fun, interactive cooking session for kids aged 6–12. Children will learn to make their own healthy plant-based snacks and smoothies.',
    seats: 10,
    price: 15,
    tag: 'Kids',
  },
];

const TAG_COLOR = {
  Workshop: { bg: '#e8f5e0', color: '#5a8a3c' },
  Talk:     { bg: '#eff6ff', color: '#3b82f6' },
  Brunch:   { bg: '#fff7ed', color: '#f59e0b' },
  Dinner:   { bg: '#f5f3ff', color: '#8b5cf6' },
  Kids:     { bg: '#fef2f2', color: '#ef4444' },
};

export default function Events() {
  return (
    <div className="events-page">
      <Navbar />
      <div className="events-container">
        <div className="events-header">
          <h1>Upcoming <span className="text-green">Events</span></h1>
          <p>Join us for workshops, tastings, and community gatherings</p>
        </div>

        <div className="events-grid">
          {EVENTS.map(event => {
            const tag = TAG_COLOR[event.tag] || TAG_COLOR.Workshop;
            return (
              <div key={event.id} className="event-card">
                <div className="event-img-wrap">
                  <img src={event.image} alt={event.title} className="event-img" />
                  <span className="event-tag" style={{ background: tag.bg, color: tag.color }}>
                    {event.tag}
                  </span>
                </div>

                <div className="event-body">
                  <div className="event-meta">
                    <span className="event-meta-item">
                      📅 {event.date}
                    </span>
                    <span className="event-meta-item">
                      🕐 {event.time}
                    </span>
                  </div>

                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description}</p>

                  <div className="event-location">
                    📍 {event.location}
                  </div>

                  <div className="event-footer">
                    <div className="event-info">
                      <span className="event-seats">🪑 {event.seats} seats</span>
                      <span className="event-price">
                        {event.price === 0 ? (
                          <span className="free-badge">Free</span>
                        ) : (
                          <strong>${event.price}</strong>
                        )}
                      </span>
                    </div>
                    <button className="btn-book">
                      {event.price === 0 ? 'Register Free' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
