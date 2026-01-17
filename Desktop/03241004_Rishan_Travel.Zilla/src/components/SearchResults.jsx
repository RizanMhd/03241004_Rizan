import React, { useState } from 'react';
import { waterfalls, mountains, beaches, campingSites } from '../data/places';
import './PlaceCategory.css';

const SearchResults = ({ query }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Combine all places and search
  const allPlaces = [
    ...waterfalls.map(p => ({ ...p, category: 'Waterfall' })),
    ...mountains.map(p => ({ ...p, category: 'Mountain' })),
    ...beaches.map(p => ({ ...p, category: 'Beach' })),
    ...campingSites.map(p => ({ ...p, category: 'Camping Site' }))
  ];

  const results = allPlaces.filter(place =>
    place.name.toLowerCase().includes(query.toLowerCase()) ||
    place.location.toLowerCase().includes(query.toLowerCase()) ||
    place.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="place-category">
      <div className="category-header">
        <h1>🔍 Search Results</h1>
        <p>Found {results.length} result(s) for "{query}"</p>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <p>No destinations found matching your search. Try different keywords!</p>
        </div>
      ) : (
        <div className="places-grid">
          {results.map((place) => (
            <div key={`${place.category}-${place.id}`} className="place-card" onClick={() => setSelectedPlace(place)}>
              <div className="place-image" style={{backgroundImage: `url(${place.image})`}}>
                <div className="place-overlay">
                  <button className="view-btn">View Details</button>
                </div>
                <span className="category-badge">{place.category}</span>
              </div>
              <div className="place-info">
                <h3>{place.name}</h3>
                <p className="location">📍 {place.location}</p>
                <p className="distance">🚗 {place.distanceFromColombo}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPlace(null)}>✕</button>
            
            <div className="place-detail">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="detail-image" />
              
              <h2>{selectedPlace.name}</h2>
              <p className="category-label">{selectedPlace.category}</p>
              
              <div className="detail-info">
                <div className="info-row">
                  <span className="label">📍 Location:</span>
                  <span className="value">{selectedPlace.location}</span>
                </div>
                <div className="info-row">
                  <span className="label">🚗 Distance from Colombo:</span>
                  <span className="value">{selectedPlace.distanceFromColombo}</span>
                </div>
                <div className="info-row">
                  <span className="label">📝 Description:</span>
                  <span className="value">{selectedPlace.description}</span>
                </div>
                <div className="info-row">
                  <span className="label">✨ Special Features:</span>
                  <span className="value">{selectedPlace.specialFeatures}</span>
                </div>
                <div className="info-row">
                  <span className="label">🗓️ Best Season:</span>
                  <span className="value">{selectedPlace.seasonToVisit}</span>
                </div>
                <div className="info-row">
                  <span className="label">🛣️ How to Reach:</span>
                  <span className="value">{selectedPlace.howToReach}</span>
                </div>
                <div className="info-row">
                  <span className="label">🎯 Activities:</span>
                  <span className="value">{selectedPlace.activities}</span>
                </div>
              </div>

              <div className="action-buttons">
                <a href={selectedPlace.googleMapsLink} target="_blank" rel="noopener noreferrer" className="maps-btn">
                  📍 Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
