import React, { useState, useEffect } from 'react';
import TattvaDisplay from './components/TattvaDisplay';
import { calculateTattva } from './utils/tattvaCalculator';
import { DURATIONS, FONT_SIZES, COLORS, LAYOUT, FONTS } from './constants/styles';

/**
 * Main App component for the Tattva Calculator
 * Manages time updates and geolocation for accurate sunrise calculations
 */
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

  // Update the time and tattva data periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      // Pass user location if available
      if (userLocation) {
        setTattvaData(calculateTattva(now, userLocation.latitude, userLocation.longitude));
      } else {
        setTattvaData(calculateTattva(now));
      }
    }, DURATIONS.UPDATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [userLocation]);

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    padding: LAYOUT.PADDING_DEFAULT,
    fontFamily: FONTS.SYSTEM,
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: LAYOUT.MARGIN_BOTTOM_LARGE,
    color: COLORS.PRIMARY_TEXT,
  };

  const titleStyle = {
    fontSize: FONT_SIZES.TITLE_LARGE,
    fontWeight: 'bold',
    margin: `0 0 ${LAYOUT.MARGIN_BOTTOM_SMALL} 0`,
    color: COLORS.HEADING,
  };

  const subtitleStyle = {
    fontSize: FONT_SIZES.SUBTITLE,
    color: COLORS.SECONDARY_TEXT,
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
