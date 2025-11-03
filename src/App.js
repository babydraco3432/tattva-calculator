import React, { useState, useMemo } from 'react';
import TattvaDisplay from './components/TattvaDisplay';
import DailyTides from './components/DailyTides';
import { useGeolocation } from './hooks/useGeolocation';
import { useTattvaUpdates } from './hooks/useTattvaUpdates';
import { generateDailySchedule } from './utils/tattvaSchedule';
import { FONT_SIZES, COLORS, LAYOUT, FONTS } from './constants/styles';

/**
 * Main App component for the Tattva Calculator
 * Manages time updates and geolocation for accurate sunrise calculations
 */
function App() {
  const [scryingMode, setScryingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'daily'
  
  // Custom hooks for geolocation and tattva updates
  const { userLocation } = useGeolocation();
  const { currentTime, tattvaData } = useTattvaUpdates(userLocation);

  // Generate daily schedule (memoized to avoid recalculating on every render)
  const currentDate = currentTime.getDate();
  const dailySchedule = useMemo(() => {
    if (userLocation) {
      return generateDailySchedule(currentTime, userLocation.latitude, userLocation.longitude);
    }
    return generateDailySchedule(currentTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, userLocation]); // Regenerate when date changes or location changes

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

  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: LAYOUT.MARGIN_BOTTOM_LARGE,
    borderBottom: '2px solid #e0e0e0',
  };

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    fontSize: FONT_SIZES.DETAIL,
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? COLORS.PRIMARY_TEXT : COLORS.SECONDARY_TEXT,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: isActive ? `3px solid ${COLORS.PRIMARY_TEXT}` : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '-2px',
  });

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
      
      {/* Tab navigation (hide in scrying mode) */}
      {!scryingMode && (
        <div style={tabContainerStyle}>
          <button
            style={tabStyle(activeTab === 'current')}
            onClick={() => setActiveTab('current')}
            aria-pressed={activeTab === 'current'}
          >
            Current Tide
          </button>
          <button
            style={tabStyle(activeTab === 'daily')}
            onClick={() => setActiveTab('daily')}
            aria-pressed={activeTab === 'daily'}
          >
            Daily Tides
          </button>
        </div>
      )}
      
      {/* Show Current Tide view */}
      {activeTab === 'current' && (
        <TattvaDisplay 
          tattvaData={tattvaData} 
          currentTime={currentTime}
          scryingMode={scryingMode}
          setScryingMode={setScryingMode}
        />
      )}
      
      {/* Show Daily Tides view */}
      {activeTab === 'daily' && !scryingMode && (
        <DailyTides 
          schedule={dailySchedule}
          sunrise={tattvaData.sunrise}
        />
      )}
    </div>
  );
}

export default App;
