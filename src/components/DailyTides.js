import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatTime, formatDateWithOrdinal } from '../utils/timeFormatter';
import { FONT_SIZES, COLORS, LAYOUT, SHAPE_POSITIONS, SIZES } from '../constants/styles';
import { OvalShape, CircleShape, TriangleShape, SquareShape, CrescentShape } from './shapes/ShapeComponents';

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

const highlightGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  alignItems: 'stretch',
  width: '100%',
};

const DEFAULT_SHAPE_POSITION = {
  top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET,
  left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET,
};

const TRIANGLE_SHAPE_POSITION = {
  top: SHAPE_POSITIONS.TRIANGLE_TOP_OFFSET,
  left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET,
};

const SHAPE_CONFIG = {
  oval: { Component: OvalShape, position: DEFAULT_SHAPE_POSITION },
  circle: { Component: CircleShape, position: DEFAULT_SHAPE_POSITION },
  triangle: { Component: TriangleShape, position: TRIANGLE_SHAPE_POSITION },
  square: { Component: SquareShape, position: DEFAULT_SHAPE_POSITION },
  crescent: { Component: CrescentShape, position: DEFAULT_SHAPE_POSITION, needsUniqueId: true },
};

const shapeContainerStyle = {
  display: 'inline-block',
  width: `${SIZES.TATTVA_SHAPE_TINY}px`,
  height: `${SIZES.TATTVA_SHAPE_TINY}px`,
  position: 'relative',
  marginRight: '10px',
  verticalAlign: 'middle',
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

const highlightCellStyle = (macroColor, microColor) => ({
  padding: 0,
  border: 'none',
  background: `linear-gradient(90deg, ${macroColor} 0%, ${macroColor} 38%, ${microColor} 100%)`,
  borderRadius: '18px',
  boxShadow: '0 20px 35px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden',
});

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

const highlightCellBackground = (macrotide, microtide) => ({
  macroBackground: macrotide.backgroundColor || COLORS.HIGHLIGHT_BORDER,
  microBackground: microtide.backgroundColor || COLORS.HIGHLIGHT_BORDER,
  macroTextColor: macrotide.textColor || '#ffffff',
  microTextColor: microtide.textColor || '#ffffff',
});

const isWithinRange = (current, start, end) => current >= start && current < end;

const safeFormatTime = (date) => {
  const formatted = formatTime(date);
  return formatted || date.toLocaleTimeString();
};

const tattvaPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  shapeColor: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
});

const scheduleEntryPropType = PropTypes.shape({
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  macrotide: tattvaPropType.isRequired,
  microtide: tattvaPropType.isRequired,
});

const formattedRowPropType = PropTypes.shape({
  entryKey: PropTypes.string.isRequired,
  formattedStart: PropTypes.string.isRequired,
  formattedEnd: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  data: scheduleEntryPropType.isRequired,
});

/**
 * Small shape component for displaying tattva shapes in the table
 */
const TattvaSmallShapeBase = ({ tattva, uniqueId }) => {
  const shapeConfig = SHAPE_CONFIG[tattva.shape];

  if (!shapeConfig) {
    return null;
  }

  const { Component, position, needsUniqueId } = shapeConfig;
  const shapeProps = {
    size: SIZES.TATTVA_SHAPE_TINY,
    color: tattva.shapeColor,
    isMicrotide: false,
    position,
  };

  if (needsUniqueId) {
    shapeProps.uniqueId = uniqueId;
  }

  return (
    <span style={shapeContainerStyle}>
      <Component {...shapeProps} />
    </span>
  );
};

TattvaSmallShapeBase.propTypes = {
  tattva: tattvaPropType.isRequired,
  uniqueId: PropTypes.string.isRequired,
};

const TattvaSmallShape = memo(TattvaSmallShapeBase);
TattvaSmallShape.displayName = 'TattvaSmallShape';
TattvaSmallShape.propTypes = TattvaSmallShapeBase.propTypes;

/**
 * Highlighted row for the active tide window
 */
const HighlightedTideRow = memo(({ row }) => {
  const { data, formattedStart, formattedEnd, entryKey } = row;
  const { macroBackground, microBackground, macroTextColor, microTextColor } = highlightCellBackground(
    data.macrotide,
    data.microtide
  );

  return (
    <tr data-testid="current-tide-row" style={highlightRowStyle}>
      <td colSpan={4} data-testid="current-tide-cell" style={highlightCellStyle(macroBackground, microBackground)}>
        <div data-testid="current-tide-grid" style={highlightGridStyle}>
          <div data-testid="current-tide-start" style={highlightTimeStyle(macroTextColor)}>
            <span>{formattedStart}</span>
          </div>
          <div data-testid="current-tide-end" style={highlightTimeStyle(microTextColor)}>
            <span>{formattedEnd}</span>
          </div>
          <div data-testid="current-tide-macro" style={highlightInfoStyle(macroTextColor)}>
            <TattvaSmallShape tattva={data.macrotide} uniqueId={`macro-${entryKey}`} />
            {data.macrotide.name} ({data.macrotide.element})
          </div>
          <div data-testid="current-tide-micro" style={highlightInfoStyle(microTextColor)}>
            <TattvaSmallShape tattva={data.microtide} uniqueId={`micro-${entryKey}`} />
            {data.microtide.name} ({data.microtide.element})
          </div>
        </div>
      </td>
    </tr>
  );
});

HighlightedTideRow.displayName = 'HighlightedTideRow';
HighlightedTideRow.propTypes = {
  row: formattedRowPropType.isRequired,
};

/**
 * Standard row for upcoming tides
 */
const StandardTideRow = memo(({ row }) => {
  const { data, formattedStart, formattedEnd, isCurrent, entryKey } = row;

  return (
    <tr style={defaultRowStyle}>
      <td style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>{formattedStart}</td>
      <td style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>{formattedEnd}</td>
      <td style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>
        <TattvaSmallShape tattva={data.macrotide} uniqueId={`macro-${entryKey}`} />
        {data.macrotide.name} ({data.macrotide.element})
      </td>
      <td style={getTdStyle(isCurrent, data.microtide.backgroundColor, data.microtide.textColor)}>
        <TattvaSmallShape tattva={data.microtide} uniqueId={`micro-${entryKey}`} />
        {data.microtide.name} ({data.microtide.element})
      </td>
    </tr>
  );
});

StandardTideRow.displayName = 'StandardTideRow';
StandardTideRow.propTypes = {
  row: formattedRowPropType.isRequired,
};

/**
 * DailyTides component displays a timetable of tattwas from sunrise to next sunrise
 */
const DailyTides = ({ schedule, sunrise, currentTime }) => {
  const formattedSchedule = useMemo(() => {
    return schedule.map((entry) => ({
      entryKey: entry.startTime.toISOString(),
      data: entry,
      isCurrent: isWithinRange(currentTime, entry.startTime, entry.endTime),
      formattedStart: safeFormatTime(entry.startTime),
      formattedEnd: safeFormatTime(entry.endTime),
    }));
  }, [schedule, currentTime]);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Tattva Tides for {formatDateWithOrdinal(sunrise)}</h2>
      <div style={sunriseInfoStyle}>
        Schedule from sunrise at {safeFormatTime(sunrise)}
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
            {formattedSchedule.map((row) =>
              row.isCurrent ? (
                <HighlightedTideRow key={row.entryKey} row={row} />
              ) : (
                <StandardTideRow key={row.entryKey} row={row} />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DailyTides.propTypes = {
  schedule: PropTypes.arrayOf(scheduleEntryPropType).isRequired,
  sunrise: PropTypes.instanceOf(Date).isRequired,
  currentTime: PropTypes.instanceOf(Date).isRequired,
};

export default DailyTides;
