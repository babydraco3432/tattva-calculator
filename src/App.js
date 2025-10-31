import React, { useState, useEffect } from 'react';
import TattvaDisplay from './components/TattvaDisplay';
import { calculateTattva } from './utils/tattvaCalculator';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tattvaData, setTattvaData] = useState(calculateTattva());
  const [scryingMode, setScryingMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation not available or denied, using default location (Montreal)');
        }
      );
    }
  }, []);

  useEffect(() => {
    // Update the time and tattva data every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      // Pass user location if available
      if (userLocation) {
        setTattvaData(calculateTattva(now, userLocation.latitude, userLocation.longitude));
      } else {
        setTattvaData(calculateTattva(now));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [userLocation]);

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#2c3e50',
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#7f8c8d',
    margin: '0',
  };

  return (
    <div style={appStyle}>
      {/* Hide header in scrying mode */}
      {!scryingMode && (
        <header style={headerStyle}>
          <h1 style={titleStyle}>Tattva Calculator</h1>
          <p style={subtitleStyle}>
            Discover the current elemental energies influencing the moment
          </p>
        </header>
      )}
      
      <TattvaDisplay 
        tattvaData={tattvaData} 
        currentTime={currentTime}
        scryingMode={scryingMode}
        setScryingMode={setScryingMode}
      />
    </div>
  );
}

export default App;
