import React from 'react';
import PropTypes from 'prop-types';
import { formatTime, formatDateWithOrdinal } from '../utils/timeFormatter';
import { FONT_SIZES, COLORS, LAYOUT } from '../constants/styles';

/**
 * DailyTides component displays a timetable of tattwas from sunrise to next sunrise
 */
const DailyTides = ({ schedule, sunrise, currentTime }) => {
  // Use the passed currentTime prop for highlighting the active row
  
  const containerStyle = {
    padding: LAYOUT.PADDING_DEFAULT,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: FONT_SIZES.TITLE_MEDIUM,
    fontWeight: 'bold',
    marginBottom: LAYOUT.MARGIN_BOTTOM_MEDIUM,
    color: COLORS.DARK_HEADING,
    textAlign: 'center',
  };

  const sunriseInfoStyle = {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.SUBTLE_TEXT,
    marginBottom: LAYOUT.MARGIN_BOTTOM_LARGE,
    textAlign: 'center',
  };

  const tableContainerStyle = {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: FONT_SIZES.DETAIL,
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '16px 12px',
    textAlign: 'center',
    fontWeight: '600',
    borderBottom: '3px solid #34495e',
    fontSize: '15px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  };

  const getTdStyle = (isCurrentTide, tattvaBackgroundColor, tattvaTextColor) => ({
    padding: '14px 12px',
    borderBottom: '1px solid #e8e8e8',
    color: tattvaTextColor || COLORS.DETAIL_TEXT,
    backgroundColor: tattvaBackgroundColor || 'transparent',
    textAlign: 'center',
    fontWeight: isCurrentTide ? 'bold' : 'normal',
    fontSize: isCurrentTide ? '15px' : FONT_SIZES.DETAIL,
    transition: 'all 0.2s ease',
  });

  const rowStyle = (isCurrentTide) => ({
    cursor: 'default',
    boxShadow: isCurrentTide ? 'inset 0 0 0 2px #3498db' : 'none',
    position: 'relative',
  });

  // Helper to determine if a schedule entry is the current tide
  const isCurrentTide = (entry) => {
    return currentTime >= entry.startTime && currentTime < entry.endTime;
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Tattva Tides for {formatDateWithOrdinal(sunrise)}</h2>
      <div style={sunriseInfoStyle}>
        Schedule from sunrise at {formatTime(sunrise)}
      </div>
      
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>End Time</th>
              <th style={thStyle}>Macrotide</th>
              <th style={thStyle}>Microtide</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry, index) => {
              const isCurrent = isCurrentTide(entry);
              return (
                <tr key={index} style={rowStyle(isCurrent)}>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>{formatTime(entry.startTime)}</td>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>{formatTime(entry.endTime)}</td>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>
                    <span style={{ 
                      display: 'inline-block',
                      width: '14px',
                      height: '14px',
                      backgroundColor: entry.macrotide.backgroundColor,
                      border: entry.macrotide.backgroundColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      marginRight: '10px',
                      verticalAlign: 'middle',
                      borderRadius: '2px',
                    }} />
                    {entry.macrotide.name} ({entry.macrotide.element})
                  </td>
                  <td style={getTdStyle(isCurrent, entry.microtide.backgroundColor, entry.microtide.textColor)}>
                    <span style={{ 
                      display: 'inline-block',
                      width: '14px',
                      height: '14px',
                      backgroundColor: entry.microtide.backgroundColor,
                      border: entry.microtide.backgroundColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      marginRight: '10px',
                      verticalAlign: 'middle',
                      borderRadius: '2px',
                    }} />
                    {entry.microtide.name} ({entry.microtide.element})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DailyTides.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      startTime: PropTypes.instanceOf(Date).isRequired,
      endTime: PropTypes.instanceOf(Date).isRequired,
      macrotide: PropTypes.shape({
        name: PropTypes.string.isRequired,
        element: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        shapeColor: PropTypes.string.isRequired,
        shape: PropTypes.string.isRequired,
      }).isRequired,
      microtide: PropTypes.shape({
        name: PropTypes.string.isRequired,
        element: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        shapeColor: PropTypes.string.isRequired,
        shape: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  sunrise: PropTypes.instanceOf(Date).isRequired,
  currentTime: PropTypes.instanceOf(Date).isRequired,
};

export default DailyTides;
