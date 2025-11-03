/**
 * Centralized style constants for the Tattva Calculator application
 * This file contains all magic numbers, colors, and style values used throughout the app
 */

// Size constants
export const SIZES = {
  TATTVA_SHAPE_SMALL: 100,
  TATTVA_SHAPE_NORMAL: 200,
  TATTVA_SHAPE_LARGE: 400,
  MICROTIDE_RATIO: 0.40, // Microtide size relative to macrotide
  CONTAINER_RATIO: 1.5, // Container size relative to shape size
};

// Duration constants (in minutes and seconds)
export const DURATIONS = {
  MACROTIDE_MINUTES: 120, // 2 hours per macrotide
  MICROTIDE_MINUTES: 24, // 24 minutes per microtide
  TOTAL_CYCLE_MINUTES: 600, // 10 hours total cycle
  UPDATE_INTERVAL_MS: 1000, // Update every second
};

// Position offsets for different shapes
export const SHAPE_POSITIONS = {
  TRIANGLE_TOP_OFFSET: '62%',
  CRESCENT_TOP_OFFSET: '61%',
  DEFAULT_TOP_OFFSET: '50%',
  DEFAULT_LEFT_OFFSET: '50%',
};

// Font sizes
export const FONT_SIZES = {
  TITLE_LARGE: '36px',
  TITLE_MEDIUM: '28px',
  TIME_DISPLAY: '24px',
  SUBTITLE: '18px',
  DETAIL: '16px',
  SMALL: '14px',
};

// Colors
export const COLORS = {
  PRIMARY_TEXT: '#333',
  SECONDARY_TEXT: '#7f8c8d',
  DETAIL_TEXT: '#444',
  SUBTLE_TEXT: '#666',
  HEADING: '#2c3e50',
  DANGER: '#FF1744',
  BACKGROUND_LIGHT: '#f0f2f5',
  DARK_HEADING: '#222',
  HIGHLIGHT_BACKGROUND: '#fffacd', // Light yellow for highlighting current tide
  HIGHLIGHT_BORDER: '#ffd700', // Gold for highlighting current tide border
  TABLE_BORDER: '#e8e8e8', // Light gray for table cell borders
};

// Border and shadow styles
export const EFFECTS = {
  BOX_SHADOW_DEFAULT: '0 4px 8px rgba(0,0,0,0.3)',
  BOX_SHADOW_SCRYING: '0 0 50px rgba(255,255,255,0.5)',
  BORDER_RADIUS: '10px',
  BORDER_WIDTH_DEFAULT: '3px',
  BORDER_WIDTH_SCRYING: '4px',
  BORDER_COLOR: '#333',
  BORDER_COLOR_SCRYING: '#fff',
};

// Transition and animation
export const ANIMATIONS = {
  TRANSITION_DEFAULT: 'transform 0.3s ease',
};

// Z-index layers
export const Z_INDEX = {
  MICROTIDE: 10,
  SCRYING_OVERLAY: 1000,
};

// Layout constants
export const LAYOUT = {
  MAX_WIDTH_CONTAINER: '600px',
  MAX_WIDTH_INFO: '500px',
  PADDING_DEFAULT: '20px',
  MARGIN_BOTTOM_SMALL: '10px',
  MARGIN_BOTTOM_MEDIUM: '15px',
  MARGIN_BOTTOM_LARGE: '30px',
};

// Font families
export const FONTS = {
  SYSTEM: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  DEFAULT: 'Arial, sans-serif',
};
