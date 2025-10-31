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
