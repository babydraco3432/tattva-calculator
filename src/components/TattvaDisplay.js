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
    maxWidth: '500px',
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

  // Single vertical card that combines both macrotide and microtide
  const combinedCardStyle = {
    width: '100%',
    maxWidth: '400px',
    border: '3px solid #333',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    backgroundColor: '#ffffff',
  };

  const sectionStyle = {
    padding: '25px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const infoStyle = {
    margin: '8px 0',
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  };

  const remainingTimeStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FF1744',
    marginTop: '12px',
    padding: '8px',
    backgroundColor: '#FFF3E0',
    borderRadius: '5px',
  };

  const dividerStyle = {
    height: '2px',
    backgroundColor: '#333',
    margin: '0',
  };

  return (
    <div style={containerStyle}>
      <div style={timeDisplayStyle}>
        Current Time: {formatTime(currentTime)}
      </div>
      
      <div style={sunriseStyle}>
        Sunrise: {formatTime(sunrise)}
      </div>

      {/* Single combined vertical card */}
      <div style={combinedCardStyle}>
        {/* Macrotide Section */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Macrotide (Main Tattva)</div>
          <TattvaShape tattva={macrotide} size={150} isMicrotide={false} />
          <div style={infoStyle}><strong>{macrotide.name}</strong> - {macrotide.element}</div>
          <div style={infoStyle}>{macrotide.description}</div>
          <div style={remainingTimeStyle}>
            ⏱ {macrotideRemainingMinutes} min remaining
          </div>
        </div>

        {/* Divider */}
        <div style={dividerStyle}></div>

        {/* Microtide Section */}
        <div style={sectionStyle}>
          <div style={titleStyle}>Microtide (Sub-Tattva)</div>
          <TattvaShape tattva={microtide} size={120} isMicrotide={true} />
          <div style={infoStyle}><strong>{microtide.name}</strong> - {microtide.element}</div>
          <div style={infoStyle}>{microtide.description}</div>
          <div style={remainingTimeStyle}>
            ⏱ {microtideRemainingMinutes.toFixed(1)} min remaining
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '25px', 
        padding: '15px', 
        backgroundColor: '#E3F2FD',
        borderRadius: '8px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
      }}>
        <p style={{ margin: '5px 0', fontSize: '13px', color: '#555', fontWeight: '500' }}>
          The tattva cycle repeats every 2 hours (120 minutes)
        </p>
        <p style={{ margin: '5px 0', fontSize: '13px', color: '#555', fontWeight: '500' }}>
          Each macrotide lasts 24 minutes, with 5 microtides of 4.8 minutes each
        </p>
      </div>
    </div>
  );
};

export default TattvaDisplay;
