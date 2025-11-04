/**
 * Tattva Calculator - Core calculation logic
 *
 * The tattva cycle starts at sunrise and each tattva lasts for 24 minutes.
 * There are 5 tattwas that cycle throughout the day:
 * - Akasha (Ether)
 * - Vayu (Air)
 * - Tejas (Fire)
 * - Apas (Water)
 * - Prithvi (Earth)
 *
 * Each complete cycle lasts 10 hours (600 minutes), with each macrotide
 * lasting 2 hours (120 minutes) and containing 5 microtides of 24 minutes each.
 */

import SunCalc from 'suncalc';

/**
 * Array of Tattva definitions
 * Each tattva represents an elemental energy with specific visual properties
 * @constant {Array<Object>}
 */
export const TATTWAS = [
  {
    name: 'Akasha',
    element: 'Ether',
    backgroundColor: '#FFFFFF', // White background
    textColor: '#000000', // Black text
    shapeColor: '#000000', // Black oval
    shape: 'oval',
    description: 'Space/Ether element'
  },
  {
    name: 'Vayu',
    element: 'Air',
    backgroundColor: '#FF8C00', // Orange background
    textColor: '#0066FF', // Blue text
    shapeColor: '#0066FF', // Blue circle
    shape: 'circle',
    description: 'Air element'
  },
  {
    name: 'Tejas',
    element: 'Fire',
    backgroundColor: '#FF0000', // Red background
    textColor: '#50C878', // Emerald green text
    shapeColor: '#50C878', // Emerald green triangle
    shape: 'triangle',
    description: 'Fire element'
  },
  {
    name: 'Apas',
    element: 'Water',
    backgroundColor: '#000000', // Black background
    textColor: '#C0C0C0', // Silver text
    shapeColor: '#C0C0C0', // Silver crescent
    shape: 'crescent',
    description: 'Water element'
  },
  {
    name: 'Prithvi',
    element: 'Earth',
    backgroundColor: '#9400D3', // Purple background
    textColor: '#FFFF00', // Yellow text
    shapeColor: '#FFFF00', // Yellow square
    shape: 'square',
    description: 'Earth element'
  }
];

/**
 * Duration constants for tattva cycles
 */
// Duration of each macrotide (main tattva) in minutes
const MACROTIDE_DURATION = 120; // 2 hours per macrotide
const TOTAL_CYCLE_DURATION = MACROTIDE_DURATION * 5; // 600 minutes = 10 hours

const MINUTE_IN_MS = 60 * 1000;
const MACROTIDE_DURATION_MS = MACROTIDE_DURATION * MINUTE_IN_MS;
const MICROTIDE_DURATION_MS = MACROTIDE_DURATION_MS / 5;
const TOTAL_CYCLE_DURATION_MS = TOTAL_CYCLE_DURATION * MINUTE_IN_MS;

/**
 * Default location coordinates
 * Falls back to Montreal, Quebec, Canada when geolocation is unavailable
 */
const DEFAULT_LATITUDE = 45.5017;
const DEFAULT_LONGITUDE = -73.5673;

/**
 * Get actual sunrise time based on geolocation using SunCalc library
 * Falls back to default location if coordinates are not provided
 *
 * @param {Date} [date=new Date()] - Date for which to calculate sunrise
 * @param {number} [latitude=DEFAULT_LATITUDE] - Latitude coordinate
 * @param {number} [longitude=DEFAULT_LONGITUDE] - Longitude coordinate
 * @returns {Date} Sunrise time for the given date and location
 */
export const getSunriseTime = (date = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const times = SunCalc.getTimes(date, latitude, longitude);
  return times.sunrise;
};

/**
 * Get actual sunset time based on geolocation using SunCalc library
 *
 * @param {Date} [date=new Date()] - Date for which to calculate sunset
 * @param {number} [latitude=DEFAULT_LATITUDE] - Latitude coordinate
 * @param {number} [longitude=DEFAULT_LONGITUDE] - Longitude coordinate
 * @returns {Date} Sunset time for the given date and location
 */
export const getSunsetTime = (date = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const times = SunCalc.getTimes(date, latitude, longitude);
  return times.sunset;
};

/**
 * Calculate which tattva is active at a given time
 *
 * The calculation determines both the macrotide (2-hour period) and microtide
 * (24-minute period within the macrotide). The cycle starts at sunrise and
 * repeats every 10 hours.
 *
 * @param {Date} [currentTime=new Date()] - Time for which to calculate tattva
 * @param {number} [latitude=DEFAULT_LATITUDE] - Latitude coordinate for sunrise calculation
 * @param {number} [longitude=DEFAULT_LONGITUDE] - Longitude coordinate for sunrise calculation
 * @returns {Object} Tattva data including macrotide, microtide, and remaining times
 * @returns {Object} return.macrotide - Current macrotide tattva object
 * @returns {Object} return.microtide - Current microtide tattva object
 * @returns {number} return.macrotideRemainingSeconds - Seconds remaining in current macrotide
 * @returns {number} return.microtideRemainingSeconds - Seconds remaining in current microtide
 * @returns {number} return.macrotideRemainingMinutes - Minutes remaining in current macrotide (ceil)
 * @returns {number} return.microtideRemainingMinutes - Minutes remaining in current microtide (ceil)
 * @returns {number} return.cyclePosition - Position within the 10-hour cycle in minutes
 * @returns {Date} return.sunrise - Sunrise time for the given date and location
 */
export const calculateTattva = (currentTime = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const todaySunrise = getSunriseTime(currentTime, latitude, longitude);
  let referenceSunrise = todaySunrise;

  if (currentTime < todaySunrise) {
    const previousDay = new Date(currentTime);
    previousDay.setDate(previousDay.getDate() - 1);
    referenceSunrise = getSunriseTime(previousDay, latitude, longitude);
  }

  const msSinceSunrise = currentTime - referenceSunrise;
  const cyclePositionMs = msSinceSunrise % TOTAL_CYCLE_DURATION_MS;

  const macrotideIndex = Math.floor(cyclePositionMs / MACROTIDE_DURATION_MS);
  const macrotide = TATTWAS[macrotideIndex];

  const positionInMacrotideMs = cyclePositionMs % MACROTIDE_DURATION_MS;
  const microtideIndex = Math.floor(positionInMacrotideMs / MICROTIDE_DURATION_MS);
  const microtide = TATTWAS[microtideIndex];

  const macrotideRemainingMs = MACROTIDE_DURATION_MS - positionInMacrotideMs || MACROTIDE_DURATION_MS;
  const microtideRemainingMs = MICROTIDE_DURATION_MS - (positionInMacrotideMs % MICROTIDE_DURATION_MS) || MICROTIDE_DURATION_MS;

  return {
    macrotide,
    microtide,
    macrotideRemainingSeconds: Math.floor(macrotideRemainingMs / 1000),
    microtideRemainingSeconds: Math.floor(microtideRemainingMs / 1000),
    macrotideRemainingMinutes: Math.ceil(macrotideRemainingMs / MINUTE_IN_MS),
    microtideRemainingMinutes: Math.ceil(microtideRemainingMs / MINUTE_IN_MS),
    cyclePosition: Math.floor(cyclePositionMs / MINUTE_IN_MS),
    sunrise: referenceSunrise
  };
};

/**
 * Get the next tattva in the sequence
 * Wraps around to the beginning after the last tattva
 *
 * @param {number} currentIndex - Current tattva index (0-4)
 * @returns {Object} Next tattva object in the sequence
 */
export const getNextTattva = (currentIndex) => {
  return TATTWAS[(currentIndex + 1) % TATTWAS.length];
};
