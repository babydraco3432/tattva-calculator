/**
 * Utility functions for formatting time values
 */

/**
 * Formats a Date object to a locale time string
 * @param {Date} date - The date to format
 * @returns {string} Formatted time string (HH:MM:SS)
 */
export const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Formats macrotide remaining time as HH:MM:SS
 * @param {number} totalSeconds - Total seconds remaining
 * @returns {string} Formatted time string (HH:MM:SS)
 */
export const formatMacrotideRemaining = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formats microtide remaining time as MM:SS
 * @param {number} totalSeconds - Total seconds remaining
 * @returns {string} Formatted time string (MM:SS)
 */
export const formatMicrotideRemaining = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formats a Date object to a readable date string with ordinal suffix
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "Monday, November 3rd, 2024")
 */
export const formatDateWithOrdinal = (date) => {
  const dayOfMonth = date.getDate();
  const suffix = getOrdinalSuffix(dayOfMonth);
  
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  return `${dayName}, ${monthName} ${dayOfMonth}${suffix}, ${year}`;
};

/**
 * Get the ordinal suffix for a number (st, nd, rd, th)
 * @param {number} num - The number
 * @returns {string} The ordinal suffix
 */
const getOrdinalSuffix = (num) => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};
