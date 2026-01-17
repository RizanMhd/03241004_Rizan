import React, { useState } from 'react';
import { waterfalls } from '../data/places';
import './PlaceCategory.css';

const Waterfalls = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="place-category">
      <div className="category-header">
        <h1>🌊 Sri Lanka's Waterfalls</h1>
        <p>Discover the cascade of beauty across Sri Lanka's stunning waterfalls</p>
      </div>

      <div className="places-grid">
        {waterfalls.map((waterfall) => (
          <div key={waterfall.id} className="place-card" onClick={() => setSelectedPlace(waterfall)}>
            <div
              className="place-image"
              style={{ backgroundImage: `url("${encodeURI(waterfall.image)}")` }}
            >
              <div className="place-overlay">
                <button className="view-btn">View Details</button>
              </div>
            </div>
            <div className="place-info">
              <h3>{waterfall.name}</h3>
              <p className="location">📍 {waterfall.location}</p>
              <p className="distance">🚗 {waterfall.distanceFromColombo}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPlace(null)}>✕</button>
            
            <div className="place-detail">
              <img src={encodeURI(selectedPlace.image)} alt={selectedPlace.name} className="detail-image" />
              
              <h2>{selectedPlace.name}</h2>
              
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
                  <span className="label">⬆️ Height:</span>
                  <span className="value">{selectedPlace.height}</span>
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
                <div className="info-row">
                  <span className="label">⏰ Best Time:</span>
                  <span className="value">{selectedPlace.bestTime}</span>
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

export default Waterfalls;
