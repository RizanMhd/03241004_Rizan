import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './components/Home';
import Waterfalls from './components/Waterfalls';
import Mountains from './components/Mountains';
import Beaches from './components/Beaches';
import CampingSites from './components/CampingSites';
import SearchResults from './components/SearchResults';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('search');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'search' && searchQuery) {
      return <SearchResults query={searchQuery} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'waterfalls':
        return <Waterfalls />;
      case 'mountains':
        return <Mountains />;
      case 'beaches':
        return <Beaches />;
      case 'camping':
        return <CampingSites />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <Navigation onNavigate={handleNavigate} onSearch={handleSearch} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
