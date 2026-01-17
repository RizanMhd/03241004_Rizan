import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ onNavigate, onSearch }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const handleNavClick = (category) => {
    onNavigate(category);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo2.jpg" alt="Travel.Zilla Logo" className="logo-image" />
          <h1>Travel.Zilla</h1>
        </div>

        <div className="nav-datetime">
          <span className="datetime-text">{formatDateTime(currentDateTime)}</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleNavClick('home')}>Home</button>
          <button className="nav-link" onClick={() => handleNavClick('waterfalls')}>Waterfalls</button>
          <button className="nav-link" onClick={() => handleNavClick('mountains')}>Mountains</button>
          <button className="nav-link" onClick={() => handleNavClick('beaches')}>Beaches</button>
          <button className="nav-link" onClick={() => handleNavClick('camping')}>Camping</button>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
