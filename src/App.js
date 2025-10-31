import React, { useState } from 'react';
import TattvaDisplay from './components/TattvaDisplay';
import { useGeolocation } from './hooks/useGeolocation';
import { useTattvaUpdates } from './hooks/useTattvaUpdates';
import { FONT_SIZES, COLORS, LAYOUT, FONTS } from './constants/styles';

/**
 * Main App component for the Tattva Calculator
 * Manages time updates and geolocation for accurate sunrise calculations
 */
function App() {
  const [scryingMode, setScryingMode] = useState(false);
  
  // Custom hooks for geolocation and tattva updates
  const { userLocation } = useGeolocation();
  const { currentTime, tattvaData } = useTattvaUpdates(userLocation);

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
