import React from 'react';
import PropTypes from 'prop-types';
import { formatTime, formatDateWithOrdinal } from '../utils/timeFormatter';
import { FONT_SIZES, COLORS, LAYOUT, SHAPE_POSITIONS, SIZES } from '../constants/styles';
import { OvalShape, CircleShape, TriangleShape, SquareShape, CrescentShape } from './shapes/ShapeComponents';

/**
 * Small shape component for displaying tattva shapes in the table
 */
const TattvaSmallShape = ({ tattva, uniqueId }) => {
  const size = SIZES.TATTVA_SHAPE_TINY;
  const containerStyle = {
    display: 'inline-block',
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative',
    marginRight: '10px',
    verticalAlign: 'middle',
  };

  const renderShape = () => {
    const shapeProps = {
      size,
      color: tattva.shapeColor,
      isMicrotide: false,
    };

    switch (tattva.shape) {
      case 'oval':
        return <OvalShape {...shapeProps} position={{ top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET, left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET }} />;
      case 'circle':
        return <CircleShape {...shapeProps} position={{ top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET, left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET }} />;
      case 'triangle':
        // Triangle needs special positioning to center properly
        return <TriangleShape {...shapeProps} position={{ top: SHAPE_POSITIONS.TRIANGLE_TOP_OFFSET, left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET }} />;
      case 'square':
        return <SquareShape {...shapeProps} position={{ top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET, left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET }} />;
      case 'crescent':
        return <CrescentShape {...shapeProps} position={{ top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET, left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET }} uniqueId={uniqueId} />;
      default:
        return null;
    }
  };

  return <span style={containerStyle}>{renderShape()}</span>;
};

TattvaSmallShape.propTypes = {
  tattva: PropTypes.shape({
    shape: PropTypes.string.isRequired,
    shapeColor: PropTypes.string.isRequired,
  }).isRequired,
  uniqueId: PropTypes.string.isRequired,
};

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
    tableLayout: 'fixed',
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
    borderBottom: `1px solid ${COLORS.TABLE_BORDER}`,
    color: tattvaTextColor || COLORS.DETAIL_TEXT,
    backgroundColor: tattvaBackgroundColor || 'transparent',
    textAlign: 'center',
    fontWeight: isCurrentTide ? 'bold' : 'normal',
    fontSize: isCurrentTide ? '15px' : FONT_SIZES.DETAIL,
    transition: 'all 0.2s ease',
  });

  const defaultRowStyle = {
    cursor: 'default',
    backgroundColor: 'transparent',
    position: 'relative',
  };

  const highlightRowStyle = {
    cursor: 'default',
    position: 'relative',
    transition: 'box-shadow 0.3s ease',
  };

  const highlightCellStyle = (macroColor, microColor) => ({
    padding: 0,
    border: 'none',
    background: `linear-gradient(90deg, ${macroColor} 0%, ${macroColor} 38%, ${microColor} 100%)`,
    borderRadius: '18px',
    boxShadow: '0 20px 35px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  });

  const highlightGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    alignItems: 'stretch',
    width: '100%',
  };

  const highlightTimeStyle = (textColor) => ({
    padding: '14px 12px',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: '16px',
    color: textColor || '#ffffff',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.45)',
  });

  const highlightInfoStyle = (textColor) => ({
    padding: '14px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: '800',
    fontSize: '16px',
    color: textColor || '#ffffff',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.45)',
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
            {schedule.map((entry) => {
              const isCurrent = isCurrentTide(entry);
              const entryKey = entry.startTime.toISOString();
              const formattedStartRaw = formatTime(entry.startTime);
              const formattedEndRaw = formatTime(entry.endTime);
              const formattedStart = formattedStartRaw || entry.startTime.toLocaleTimeString();
              const formattedEnd = formattedEndRaw || entry.endTime.toLocaleTimeString();

              if (isCurrent) {
                const macroColor = entry.macrotide.backgroundColor || COLORS.HIGHLIGHT_BORDER;
                const microColor = entry.microtide.backgroundColor || COLORS.HIGHLIGHT_BORDER;
                const macroTextColor = entry.macrotide.textColor || '#ffffff';
                const microTextColor = entry.microtide.textColor || '#ffffff';

                return (
                  <tr key={entryKey} data-testid="current-tide-row" style={highlightRowStyle}>
                    <td colSpan={4} data-testid="current-tide-cell" style={highlightCellStyle(macroColor, microColor)}>
                      <div data-testid="current-tide-grid" style={highlightGridStyle}>
                        <div data-testid="current-tide-start" style={highlightTimeStyle(macroTextColor)}>
                          <span>{formattedStart}</span>
                        </div>
                        <div data-testid="current-tide-end" style={highlightTimeStyle(microTextColor)}>
                          <span>{formattedEnd}</span>
                        </div>
                        <div data-testid="current-tide-macro" style={highlightInfoStyle(macroTextColor)}>
                          <TattvaSmallShape tattva={entry.macrotide} uniqueId={`macro-${entryKey}`} />
                          {entry.macrotide.name} ({entry.macrotide.element})
                        </div>
                        <div data-testid="current-tide-micro" style={highlightInfoStyle(microTextColor)}>
                          <TattvaSmallShape tattva={entry.microtide} uniqueId={`micro-${entryKey}`} />
                          {entry.microtide.name} ({entry.microtide.element})
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={entryKey} style={defaultRowStyle}>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>{formattedStart}</td>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>{formattedEnd}</td>
                  <td style={getTdStyle(isCurrent, entry.macrotide.backgroundColor, entry.macrotide.textColor)}>
                    <TattvaSmallShape tattva={entry.macrotide} uniqueId={`macro-${entryKey}`} />
                    {entry.macrotide.name} ({entry.macrotide.element})
                  </td>
                  <td style={getTdStyle(isCurrent, entry.microtide.backgroundColor, entry.microtide.textColor)}>
                    <TattvaSmallShape tattva={entry.microtide} uniqueId={`micro-${entryKey}`} />
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
