import React from 'react';
import TattvaShape from './TattvaShape';

const TattvaDisplay = ({ tattvaData, currentTime }) => {
  const { macrotide, microtide, macrotideRemainingMinutes, microtideRemainingMinutes, sunrise } = tattvaData;

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
    maxWidth: '800px',
    margin: '0 auto',
  };

  const timeDisplayStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#333',
  };

  const sunriseStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  };

  const tattvaContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '30px',
    gap: '40px',
    flexWrap: 'wrap',
  };

  const tattvaCardStyle = {
    flex: '1',
    minWidth: '250px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#444',
  };

  const infoStyle = {
    margin: '5px 0',
    fontSize: '14px',
    color: '#666',
  };

  const remainingTimeStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={timeDisplayStyle}>
        Current Time: {formatTime(currentTime)}
      </div>
      
      <div style={sunriseStyle}>
        Sunrise: {formatTime(sunrise)}
      </div>

      <div style={tattvaContainerStyle}>
        <div style={tattvaCardStyle}>
          <div style={titleStyle}>Macrotide (Main Tattva)</div>
          <TattvaShape tattva={macrotide} size={120} />
          <div style={infoStyle}><strong>Name:</strong> {macrotide.name}</div>
          <div style={infoStyle}><strong>Element:</strong> {macrotide.element}</div>
          <div style={infoStyle}><strong>Description:</strong> {macrotide.description}</div>
          <div style={remainingTimeStyle}>
            Time Remaining: {macrotideRemainingMinutes} min
          </div>
        </div>

        <div style={tattvaCardStyle}>
          <div style={titleStyle}>Microtide (Sub-Tattva)</div>
          <TattvaShape tattva={microtide} size={120} isMicrotide={true} />
          <div style={infoStyle}><strong>Name:</strong> {microtide.name}</div>
          <div style={infoStyle}><strong>Element:</strong> {microtide.element}</div>
          <div style={infoStyle}><strong>Description:</strong> {microtide.description}</div>
          <div style={remainingTimeStyle}>
            Time Remaining: {microtideRemainingMinutes.toFixed(1)} min
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f4f8',
        borderRadius: '8px',
        textAlign: 'center',
        width: '100%',
      }}>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
          The tattva cycle repeats every 2 hours (120 minutes)
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
          Each macrotide lasts 24 minutes, with 5 microtides of 4.8 minutes each
        </p>
      </div>
    </div>
  );
};

export default TattvaDisplay;
