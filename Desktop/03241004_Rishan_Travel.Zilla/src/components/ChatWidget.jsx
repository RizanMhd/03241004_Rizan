import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { waterfalls, mountains, beaches, campingSites } from '../data/places';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Travel.Zilla assistant. How can I help you plan your Sri Lankan adventure today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTravelResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Check for greetings first
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greetings')) {
      return "Hello! Welcome to Travel.Zilla! I'm your AI travel assistant specialized in Sri Lankan destinations. I can provide detailed information about waterfalls, mountains, beaches, and camping sites. What would you like to know about?";
    }

    // Search for specific places in all categories
    const allPlaces = [...waterfalls, ...mountains, ...beaches, ...campingSites];
    const foundPlace = allPlaces.find(place =>
      message.includes(place.name.toLowerCase()) ||
      place.name.toLowerCase().includes(message.split(' ').find(word => word.length > 3) || '')
    );

    if (foundPlace) {
      return generateDetailedPlaceResponse(foundPlace);
    }

    // Handle category-specific queries
    if (message.includes('waterfall') || message.includes('falls')) {
      if (message.includes('tallest') || message.includes('highest')) {
        const tallest = waterfalls.find(w => w.height === '263 meters');
        return generateDetailedPlaceResponse(tallest);
      }
      return "Sri Lanka has some spectacular waterfalls! Here are our top recommendations:\n\n" +
             "🏔️ Bambarakanda Falls (263m) - Sri Lanka's tallest waterfall\n" +
             "🏔️ Diyaluma Falls (220m) - Second tallest with stunning cascades\n" +
             "🏔️ Aberdeen Falls - Beautiful with natural pools\n" +
             "🏔️ Ravana Falls - Historical significance with caves\n\n" +
             "Which waterfall interests you most, or would you like details about a specific one?";
    }

    if (message.includes('mountain') || message.includes('hike') || message.includes('trek') || message.includes('peak')) {
      if (message.includes('highest') || message.includes('tallest')) {
        const highest = mountains.find(m => m.name === 'Pidurutalagala');
        return generateDetailedPlaceResponse(highest);
      }
      return "Sri Lanka's mountains offer incredible trekking opportunities! Here are our top peaks:\n\n" +
             "🏔️ Pidurutalagala (2,524m) - Sri Lanka's highest peak\n" +
             "🏔️ Kirigalpotta (2,388m) - Second highest\n" +
             "🏔️ Totupola Kanda (2,357m) - Third highest\n" +
             "🏔️ Adam's Peak - Sacred mountain with 5,200+ steps\n\n" +
             "What type of mountain adventure are you looking for?";
    }

    if (message.includes('beach') || message.includes('sea') || message.includes('ocean') || message.includes('coast')) {
      return "Sri Lanka boasts beautiful beaches for every type of traveler! Here are our top beaches:\n\n" +
             "🏖️ Mirissa Beach - Famous for whale watching and surfing\n" +
             "🏖️ Unawatuna Beach - Great for swimming and water sports\n" +
             "🏖️ Arugam Bay - World-class surfing destination\n" +
             "🏖️ Nilaveli Beach - Perfect for diving and snorkeling\n\n" +
             "What kind of beach experience are you looking for?";
    }

    if (message.includes('camp') || message.includes('camping') || message.includes('tent')) {
      return "Experience nature at its finest with camping in Sri Lanka! Here are our top camping sites:\n\n" +
             "🏕️ Horton Plains - UNESCO site with stunning landscapes\n" +
             "🏕️ Sinharaja Forest - Rainforest camping experience\n" +
             "🏕️ Udawalawe - Wildlife camping near elephant herds\n" +
             "🏕️ Kitulgala - Adventure camping with white-water rafting\n\n" +
             "What type of camping experience interests you?";
    }

    if (message.includes('weather') || message.includes('season') || message.includes('rain') || message.includes('monsoon') || message.includes('climate')) {
      return "Sri Lanka has a tropical climate with two monsoon seasons:\n\n" +
             "🌧️ Southwest Monsoon (May-September): Rain in west and south\n" +
             "🌧️ Northeast Monsoon (October-February): Rain in east and north\n\n" +
             "🏖️ Best time for beaches: December-March (dry season)\n" +
             "🏔️ Best time for mountains: December-April (cooler months)\n" +
             "💧 Best time for waterfalls: June-October (peak water flow)\n\n" +
             "When are you planning to visit Sri Lanka?";
    }

    if (message.includes('direction') || message.includes('map') || message.includes('route') || message.includes('distance') || message.includes('location')) {
      return "All distances on Travel.Zilla are calculated from Colombo city center. Most destinations are accessible by:\n\n" +
             "🚗 Car rental (recommended for flexibility)\n" +
             "🚌 Public buses (budget-friendly)\n" +
             "🚆 Trains (scenic routes to hill country)\n" +
             "✈️ Domestic flights (for long distances)\n\n" +
             "We provide Google Maps links for precise navigation. Which destination would you like directions to?";
    }

    if (message.includes('book') || message.includes('reserve') || message.includes('plan') || message.includes('trip')) {
      return "While we don't handle direct bookings, Travel.Zilla provides comprehensive planning information:\n\n" +
             "📋 Detailed destination guides\n" +
             "🗺️ Route planning and distances\n" +
             "📅 Best seasons to visit\n" +
             "🎒 What to pack and bring\n" +
             "💡 Local tips and advice\n\n" +
             "Use our information to plan your perfect Sri Lankan adventure!";
    }

    // Default response for unrecognized queries
    return "I'd love to help with your Sri Lankan travel plans! I have detailed information about:\n\n" +
           "🏔️ Mountains & Trekking (10 destinations)\n" +
           "💧 Waterfalls (10 spectacular falls)\n" +
           "🏖️ Beaches & Coastal (10 beach destinations)\n" +
           "🏕️ Camping Sites (10 unique locations)\n\n" +
           "Ask me about specific places like 'Bambarakanda Falls', 'Pidurutalagala', 'Mirissa Beach', or general categories. What interests you most?";
  };

  const generateDetailedPlaceResponse = (place) => {
    const category = place.category || 'destination';
    let response = `🌟 **${place.name}** - ${place.location}, Sri Lanka\n\n`;

    response += `📍 **Location & Distance:** ${place.distanceFromColombo} from Colombo\n`;
    if (place.height) response += `📏 **Height:** ${place.height}\n`;
    if (place.elevation) response += `🏔️ **Elevation:** ${place.elevation}\n`;

    response += `\n📝 **About:** ${place.description}\n\n`;

    if (place.specialFeatures) {
      response += `✨ **Special Features:** ${place.specialFeatures}\n\n`;
    }

    response += `🗓️ **Best Time to Visit:** ${place.seasonToVisit}\n`;
    response += `🕐 **Best Time of Day:** ${place.bestTime}\n\n`;

    response += `🗺️ **How to Reach:** ${place.howToReach}\n\n`;

    if (place.activities) {
      response += `🎯 **Activities:** ${place.activities}\n\n`;
    }

    response += `🔗 **Google Maps:** ${place.googleMapsLink}\n\n`;

    response += `💡 **Travel Tips:** Check our detailed guide for more information, packing suggestions, and local insights!\n\n`;

    response += `Would you like to know about similar ${category} destinations or have questions about visiting ${place.name}?`;

    return response;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getTravelResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSupportClick = () => {
    if (!isOpen) {
      setIsOpen(true); // Open chat first if not open
    }
    setIsSupportOpen(!isSupportOpen); // Toggle support window
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-widget">
      {/* Support Window */}
      {isOpen && isSupportOpen && (
        <div className="support-window">
          <div className="support-header">
            <div className="support-title">
              <span className="support-icon">🎧</span>
              <h3>Customer Support</h3>
            </div>
              <button className="close-btn" onClick={() => {
                setIsOpen(false);
                setIsSupportOpen(false);
              }}>×</button>
          </div>
          <div className="support-content">
            <div className="support-info">
              <h4>Get in Touch</h4>
              <div className="contact-methods">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone Support</strong>
                    <p>+94 11 123 4567</p>
                    <small>Mon-Fri: 9AM-6PM</small>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email Support</strong>
                    <p>support@travelzilla.lk</p>
                    <small>24/7 Response</small>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <div>
                    <strong>Live Chat</strong>
                    <p>Available 24/7</p>
                    <small>Instant Response</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="support-form">
              <h4>Quick Contact</h4>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" className="form-input" />
                <input type="email" placeholder="Your Email" className="form-input" />
                <select className="form-input">
                  <option>General Inquiry</option>
                  <option>Booking Help</option>
                  <option>Technical Support</option>
                  <option>Travel Information</option>
                </select>
                <textarea placeholder="How can we help you?" className="form-textarea" rows="4"></textarea>
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-title">
              <span className="chat-icon">🤖</span>
              <h3>Travel Assistant</h3>
            </div>
            <div className="header-actions">
              <button className="support-btn" onClick={handleSupportClick} title="Customer Support">
                🎧
              </button>
              <button className="close-btn" onClick={() => {
                setIsOpen(false);
                setIsSupportOpen(false);
              }}>×</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? '🤖' : '👤'}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-area">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Sri Lanka travel..."
              className="chat-input"
              disabled={isTyping}
            />
            <button type="submit" className="send-btn" disabled={!inputMessage.trim() || isTyping}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      <button className={`chat-toggle ${isOpen ? 'hidden' : ''}`} onClick={() => {
        setIsOpen(!isOpen);
        if (isSupportOpen) setIsSupportOpen(false); // Close support when opening chat
      }}>
        🌍
      </button>
    </div>
  );
};

export default ChatWidget;
