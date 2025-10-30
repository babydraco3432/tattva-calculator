import React, { useState } from 'react';
import TattvaShape from './TattvaShape';

const TattvaDisplay = ({ tattvaData, currentTime }) => {
  const { macrotide, microtide, macrotideRemainingMinutes, microtideRemainingMinutes, sunrise } = tattvaData;
  const [scryingMode, setScryingMode] = useState(false);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const timeDisplayStyle = {
    fontSize: '24px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  };

  const sunriseStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  };

  // Single card - just the visual, clickable
  const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    marginBottom: '20px',
  };

  // Scrying mode overlay
  const scryingOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'pointer',
  };

  // Information section below the card
  const infoSectionStyle = {
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#222',
  };

  const detailStyle = {
    fontSize: '16px',
    margin: '10px 0',
    color: '#444',
    lineHeight: '1.6',
  };

  const timeRemainingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FF1744',
    marginTop: '5px',
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={timeDisplayStyle}>
          Current Time: {formatTime(currentTime)}
        </div>
        
        <div style={sunriseStyle}>
          Sunrise: {formatTime(sunrise)}
        </div>

        {/* Single clickable card - just the shape */}
        <div 
          style={cardStyle}
          onClick={() => setScryingMode(true)}
        >
          <TattvaShape 
            tattva={macrotide} 
            microtide={microtide}
            size={200} 
          />
        </div>

        {/* Information below the card */}
        <div style={infoSectionStyle}>
          <div style={titleStyle}>
            {microtide.name} of {macrotide.name}
          </div>
          
          <div style={detailStyle}>
            <strong>Current Macrotide:</strong> {macrotide.name} ({macrotide.element})
            <div style={timeRemainingStyle}>
              {macrotideRemainingMinutes} minutes remaining
            </div>
          </div>

          <div style={detailStyle}>
            <strong>Current Microtide:</strong> {microtide.name} ({microtide.element})
            <div style={timeRemainingStyle}>
              {microtideRemainingMinutes.toFixed(1)} minutes remaining
            </div>
          </div>
        </div>
      </div>

      {/* Scrying Mode Overlay */}
      {scryingMode && (
        <div 
          style={scryingOverlayStyle}
          onClick={() => setScryingMode(false)}
        >
          <TattvaShape 
            tattva={macrotide} 
            microtide={microtide}
            size={400} 
            scryingMode={true}
          />
        </div>
      )}
    </>
  );
};

export default TattvaDisplay;
