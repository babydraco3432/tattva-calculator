import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatTime, formatDateWithOrdinal } from '../../shared/utils/timeFormatter';
import { FONT_SIZES, COLORS, SHAPE_POSITIONS, SIZES } from '../../shared/styles/styles';
import { OvalShape, CircleShape, TriangleShape, SquareShape, CrescentShape } from '../../shared/components/shapes/ShapeComponents';
import styles from './DailyTides.module.css';

const DEFAULT_SHAPE_POSITION = {
  top: SHAPE_POSITIONS.DEFAULT_TOP_OFFSET,
  left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET,
};

const TRIANGLE_SHAPE_POSITION = {
  top: SHAPE_POSITIONS.TRIANGLE_TOP_OFFSET,
  left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET,
};

const CRESCENT_SHAPE_POSITION = {
  top: SHAPE_POSITIONS.CRESCENT_TOP_OFFSET,
  left: SHAPE_POSITIONS.DEFAULT_LEFT_OFFSET,
};

const SHAPE_CONFIG = {
  oval: { Component: OvalShape, position: DEFAULT_SHAPE_POSITION },
  circle: { Component: CircleShape, position: DEFAULT_SHAPE_POSITION },
  triangle: { Component: TriangleShape, position: TRIANGLE_SHAPE_POSITION },
  square: { Component: SquareShape, position: DEFAULT_SHAPE_POSITION },
  crescent: { Component: CrescentShape, position: CRESCENT_SHAPE_POSITION },
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
  color: textColor || '#ffffff',
});

const highlightInfoStyle = (textColor) => ({
  color: textColor || '#ffffff',
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

  const { Component, position } = shapeConfig;
  const shapeProps = {
    size: SIZES.TATTVA_SHAPE_TINY,
    color: tattva.shapeColor,
    isMicrotide: false,
    position,
  };

  return (
    <span className={styles.shapeContainer}>
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
    <tr data-testid="current-tide-row" className={styles.highlightRow}>
      <td
        colSpan={4}
        data-testid="current-tide-cell"
        className={styles.highlightCell}
        style={highlightCellStyle(macroBackground, microBackground)}
      >
        <div data-testid="current-tide-grid" className={styles.highlightGrid}>
          <div data-testid="current-tide-start" className={styles.highlightTime} style={highlightTimeStyle(macroTextColor)}>
            <span>{formattedStart}</span>
          </div>
          <div data-testid="current-tide-end" className={styles.highlightTime} style={highlightTimeStyle(microTextColor)}>
            <span>{formattedEnd}</span>
          </div>
          <div data-testid="current-tide-macro" className={styles.highlightInfo} style={highlightInfoStyle(macroTextColor)}>
            <TattvaSmallShape tattva={data.macrotide} uniqueId={`macro-${entryKey}`} />
            {data.macrotide.name} ({data.macrotide.element})
          </div>
          <div data-testid="current-tide-micro" className={styles.highlightInfo} style={highlightInfoStyle(microTextColor)}>
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
    <tr className={styles.defaultRow}>
      <td className={styles.bodyCell} style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>{formattedStart}</td>
      <td className={styles.bodyCell} style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>{formattedEnd}</td>
      <td className={styles.bodyCell} style={getTdStyle(isCurrent, data.macrotide.backgroundColor, data.macrotide.textColor)}>
        <TattvaSmallShape tattva={data.macrotide} uniqueId={`macro-${entryKey}`} />
        {data.macrotide.name} ({data.macrotide.element})
      </td>
      <td className={styles.bodyCell} style={getTdStyle(isCurrent, data.microtide.backgroundColor, data.microtide.textColor)}>
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
    <div className={styles.container}>
      <h2 className={styles.title}>Tattva Tides for {formatDateWithOrdinal(sunrise)}</h2>
      <div className={styles.sunriseInfo}>Schedule from sunrise at {safeFormatTime(sunrise)}</div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headCell}>Start Time</th>
              <th className={styles.headCell}>End Time</th>
              <th className={styles.headCell}>Macrotide</th>
              <th className={styles.headCell}>Microtide</th>
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
