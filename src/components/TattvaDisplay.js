import React from 'react';
import PropTypes from 'prop-types';
import TattvaShape from './TattvaShape';
import { formatTime, formatMacrotideRemaining, formatMicrotideRemaining } from '../utils/timeFormatter';
import {
  SIZES,
  FONT_SIZES,
  COLORS,
  LAYOUT,
  ANIMATIONS,
  Z_INDEX
} from '../constants/styles';

const TattvaDisplay = ({ tattvaData, currentTime, scryingMode, setScryingMode }) => {
  const { macrotide, microtide, macrotideRemainingSeconds, microtideRemainingSeconds, sunrise } = tattvaData;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: LAYOUT.PADDING_DEFAULT,
    fontFamily: 'Arial, sans-serif',
    maxWidth: LAYOUT.MAX_WIDTH_CONTAINER,
    margin: '0 auto',
  };

  const timeDisplayStyle = {
    fontSize: FONT_SIZES.TIME_DISPLAY,
    marginBottom: LAYOUT.MARGIN_BOTTOM_SMALL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  };

  const sunriseStyle = {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.SUBTLE_TEXT,
    marginBottom: LAYOUT.MARGIN_BOTTOM_LARGE,
  };

  // Single card - just the visual, clickable
  const cardStyle = {
    cursor: 'pointer',
    transition: ANIMATIONS.TRANSITION_DEFAULT,
    marginBottom: LAYOUT.PADDING_DEFAULT,
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
    zIndex: Z_INDEX.SCRYING_OVERLAY,
    cursor: 'pointer',
  };

  // Information section below the card
  const infoSectionStyle = {
    textAlign: 'center',
    width: '100%',
    maxWidth: LAYOUT.MAX_WIDTH_INFO,
  };

  const titleStyle = {
    fontSize: FONT_SIZES.TITLE_MEDIUM,
    fontWeight: 'bold',
    marginBottom: LAYOUT.MARGIN_BOTTOM_MEDIUM,
    color: COLORS.DARK_HEADING,
  };

  const detailStyle = {
    fontSize: FONT_SIZES.DETAIL,
    margin: '10px 0',
    color: COLORS.DETAIL_TEXT,
    lineHeight: '1.6',
  };

  const timeRemainingStyle = {
    fontSize: FONT_SIZES.SUBTITLE,
    fontWeight: 'bold',
    color: COLORS.DANGER,
    marginTop: '5px',
  };

  return (
    <>
      {/* Hide normal view when in scrying mode */}
      {!scryingMode && (
        <div style={containerStyle}>
          <div style={timeDisplayStyle} role="timer" aria-live="polite">
            Current Time: {formatTime(currentTime)}
          </div>
          
          <div style={sunriseStyle} aria-label="Sunrise time">
            Sunrise: {formatTime(sunrise)}
          </div>

          {/* Single clickable card - just the shape */}
          <div 
            style={cardStyle}
            onClick={() => setScryingMode(true)}
            onKeyPress={(e) => e.key === 'Enter' && setScryingMode(true)}
            role="button"
            tabIndex={0}
            aria-label="Enter scrying mode"
          >
            <TattvaShape 
              tattva={macrotide} 
              microtide={microtide}
              size={SIZES.TATTVA_SHAPE_NORMAL} 
            />
          </div>

          {/* Information below the card */}
          <div style={infoSectionStyle}>
            <div style={titleStyle}>
              {microtide.name} of {macrotide.name}
            </div>
            
            <div style={detailStyle}>
              <strong>Current Macrotide:</strong> {macrotide.name} ({macrotide.element})
              <div style={timeRemainingStyle} aria-live="polite">
                {formatMacrotideRemaining(macrotideRemainingSeconds)} remaining
              </div>
            </div>

            <div style={detailStyle}>
              <strong>Current Microtide:</strong> {microtide.name} ({microtide.element})
              <div style={timeRemainingStyle} aria-live="polite">
                {formatMicrotideRemaining(microtideRemainingSeconds)} remaining
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scrying Mode Overlay */}
      {scryingMode && (
        <div 
          style={scryingOverlayStyle}
          onClick={() => setScryingMode(false)}
          onKeyPress={(e) => e.key === 'Escape' && setScryingMode(false)}
          role="dialog"
          aria-label="Scrying mode - Press escape or click to exit"
          tabIndex={0}
        >
          <TattvaShape 
            tattva={macrotide} 
            microtide={microtide}
            size={SIZES.TATTVA_SHAPE_LARGE} 
            scryingMode={true}
          />
        </div>
      )}
    </>
  );
};

TattvaDisplay.propTypes = {
  tattvaData: PropTypes.shape({
    macrotide: PropTypes.object.isRequired,
    microtide: PropTypes.object.isRequired,
    macrotideRemainingSeconds: PropTypes.number.isRequired,
    microtideRemainingSeconds: PropTypes.number.isRequired,
    sunrise: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  currentTime: PropTypes.instanceOf(Date).isRequired,
  scryingMode: PropTypes.bool.isRequired,
  setScryingMode: PropTypes.func.isRequired,
};

export default TattvaDisplay;
