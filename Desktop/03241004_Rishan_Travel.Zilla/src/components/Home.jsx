import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const Home = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const slideCount = 4;

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) setCurrentIndex((i) => (i + 1) % slideCount);
    }, 1000);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="home">
      {/* Banner Section with Video */}
      <section className="banner">
        <video className="banner-video" autoPlay loop ref={videoRef}>
          <source src="/Video/Banner Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="banner-content">
          <div className="banner-overlay">
            <h1 className="banner-title">Discover Sri Lanka's Natural Wonders</h1>
            <h3 className="banner-subtitle">Explore Waterfalls, Mountains, Beaches & Camping Sites</h3>
          </div>
        </div>
        <button className="mute-btn" onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <h2>Welcome to Travel.Zilla</h2>
          <p>
            Travel.Zilla is your comprehensive guide to exploring the breathtaking natural beauty of Sri Lanka. 
            Whether you're seeking adrenaline-pumping mountain treks, serene waterfall hikes, pristine beach getaways, 
            or unforgettable camping adventures, we've got everything mapped out for you.
          </p>
          <div className="about-grid">
            <div className="about-card" onClick={() => onNavigate('mountains')}>
              <h3>🏔️ Mountains</h3>
              <p>Discover 10 magnificent mountain peaks including Sri Lanka's highest summit, Pidurutalagala.</p>
            </div>
            <div className="about-card" onClick={() => onNavigate('waterfalls')}>
              <h3>💧 Waterfalls</h3>
              <p>Experience 10 stunning waterfalls, from the tallest Bambarakanda to hidden gems like Aberdeen Falls.</p>
            </div>
            <div className="about-card" onClick={() => onNavigate('beaches')}>
              <h3>🌊 Beaches</h3>
              <p>Relax on 10 beautiful beaches perfect for swimming, surfing, and marine adventures.</p>
            </div>
            <div className="about-card" onClick={() => onNavigate('camping')}>
              <h3>🏕️ Camping</h3>
              <p>Camp under the stars at 10 unique camping sites across Sri Lanka's diverse landscapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places */}
        <section className="featured-section">
          <h2>Featured Destinations</h2>
          <div
            className="carousel-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-track-js"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <div className="carousel-slide">
                  <div className="featured-card">
                    <img className="slide-img" src={encodeURI("/bambarakanda S.jpeg")} alt="Bambarakanda" />
                    <div className="featured-info"><h3>Bambarakanda Falls</h3><p>Sri Lanka's Tallest Waterfall - 263m</p></div>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="featured-card">
                    <img className="slide-img" src={encodeURI("/pidurugala S.jpeg")} alt="Pidurutalagala" />
                    <div className="featured-info"><h3>Pidurutalagala</h3><p>Highest Peak - 2,524m</p></div>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="featured-card">
                    <img className="slide-img" src={encodeURI("/mirissa S.jpeg")} alt="Mirissa Beach" />
                    <div className="featured-info"><h3>Mirissa Beach</h3><p>Best for Whale Watching</p></div>
                  </div>
                </div>

                <div className="carousel-slide">
                  <div className="featured-card">
                    <img className="slide-img" src={encodeURI("/hortain S.jpeg")} alt="Horton Plains" />
                    <div className="featured-info"><h3>Horton Plains</h3><p>UNESCO World Heritage Site</p></div>
                  </div>
                </div>
              </div>
          </div>
        </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat">
            <h4>40+</h4>
            <p>Travel Destinations</p>
          </div>
          <div className="stat">
            <h4>100%</h4>
            <p>Verified Information</p>
          </div>
          <div className="stat">
            <h4>24/7</h4>
            <p>Customer Support</p>
          </div>
          <div className="stat">
            <h4>All Year</h4>
            <p>Available Adventures</p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="howto-section">
        <h2>How to Use Travel.Zilla</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Categories</h3>
            <p>Select from Waterfalls, Mountains, Beaches, or Camping in the navigation menu</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Explore Places</h3>
            <p>View detailed information about each destination including distance and best season</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Find Routes</h3>
            <p>Get directions from Colombo and access Google Maps links for navigation</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Plan Your Trip</h3>
            <p>Use our search feature to quickly find your perfect destination</p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="info-section featured-info-section">
        <h2>Featured Destinations</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Mountains & Trekking</h3>
            <p>Discover 10 magnificent mountain peaks including Sri Lanka's highest summit, Pidurutalagala.</p>
          </div>
          <div className="info-card">
            <h3>Beaches & Coastal</h3>
            <p>Relax on 10 beautiful beaches perfect for swimming, surfing, and marine adventures.</p>
          </div>
          <div className="info-card">
            <h3>Waterfalls & Nature</h3>
            <p>Experience 10 stunning waterfalls, from the tallest Bambarakanda to hidden gems like Aberdeen Falls.</p>
          </div>
          <div className="info-card">
            <h3>Camping Sites</h3>
            <p>Camp under the stars at 10 unique camping sites across Sri Lanka's diverse landscapes.</p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="info-section audience-info-section">
        <h2>Target Audience</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Hikers & Trekkers</h3>
            <p>Explore challenging mountain trails and discover breathtaking summits across the island.</p>
          </div>
          <div className="info-card">
            <h3>Campers & Adventurers</h3>
            <p>Experience outdoor camping with friends and family at stunning natural locations.</p>
          </div>
          <div className="info-card">
            <h3>Beach Lovers & Tourists</h3>
            <p>Enjoy pristine beaches with crystal clear waters perfect for relaxation and water sports.</p>
          </div>
          <div className="info-card">
            <h3>Families & Groups</h3>
            <p>Create memorable experiences with loved ones at safe and accessible destinations.</p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="info-section services-info-section">
        <h2>Our Services</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Detailed Guides</h3>
            <p>Comprehensive information about each destination including difficulty level and best season.</p>
          </div>
          <div className="info-card">
            <h3>Route Planning</h3>
            <p>Get accurate distance, travel time, and directions from Colombo with Google Maps integration.</p>
          </div>
          <div className="info-card">
            <h3>Travel Tips</h3>
            <p>Expert advice on what to pack, best visiting seasons, and local travel tips.</p>
          </div>
          <div className="info-card">
            <h3>24/7 Support</h3>
            <p>Contact us anytime for inquiries, recommendations, or travel assistance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
