import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/timeFormatter';
import { FONT_SIZES, COLORS, LAYOUT } from '../constants/styles';

/**
 * DailyTides component displays a timetable of tattwas from sunrise to next sunrise
 */
const DailyTides = ({ schedule, sunrise }) => {
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
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: FONT_SIZES.DETAIL,
  };

  const thStyle = {
    backgroundColor: COLORS.PRIMARY_TEXT,
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '10px 12px',
    borderBottom: '1px solid #eee',
    color: COLORS.DETAIL_TEXT,
  };

  const rowHoverStyle = {
    cursor: 'default',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Daily Tattva Timetable</h2>
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
            {schedule.map((entry, index) => (
              <tr key={index} style={rowHoverStyle}>
                <td style={tdStyle}>{formatTime(entry.startTime)}</td>
                <td style={tdStyle}>{formatTime(entry.endTime)}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: entry.macrotide.backgroundColor,
                    border: '1px solid #ccc',
                    marginRight: '8px',
                    verticalAlign: 'middle'
                  }} />
                  {entry.macrotide.name} ({entry.macrotide.element})
                </td>
                <td style={tdStyle}>
                  <span style={{ 
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: entry.microtide.backgroundColor,
                    border: '1px solid #ccc',
                    marginRight: '8px',
                    verticalAlign: 'middle'
                  }} />
                  {entry.microtide.name} ({entry.microtide.element})
                </td>
              </tr>
            ))}
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
        shapeColor: PropTypes.string.isRequired,
        shape: PropTypes.string.isRequired,
      }).isRequired,
      microtide: PropTypes.shape({
        name: PropTypes.string.isRequired,
        element: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        shapeColor: PropTypes.string.isRequired,
        shape: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  sunrise: PropTypes.instanceOf(Date).isRequired,
};

export default DailyTides;
