// Tattva Calculator
// The tattva cycle starts at sunrise and each tattva lasts for 24 minutes
// There are 5 tattwas that cycle throughout the day

import SunCalc from 'suncalc';

export const TATTWAS = [
  {
    name: 'Akasha',
    element: 'Ether',
    backgroundColor: '#000000', // Black background
    shapeColor: '#9400D3', // Purple/violet oval (visible against black)
    shape: 'oval',
    description: 'Space/Ether element'
  },
  {
    name: 'Vayu',
    element: 'Air',
    backgroundColor: '#FF8C00', // Orange background
    shapeColor: '#0066FF', // Blue circle
    shape: 'circle',
    description: 'Air element'
  },
  {
    name: 'Tejas',
    element: 'Fire',
    backgroundColor: '#FF0000', // Red background
    shapeColor: '#FF0000', // Red triangle
    shape: 'triangle',
    description: 'Fire element'
  },
  {
    name: 'Apas',
    element: 'Water',
    backgroundColor: '#C0C0C0', // Silver background
    shapeColor: '#FFFFFF', // White crescent (visible against silver)
    shape: 'crescent',
    description: 'Water element'
  },
  {
    name: 'Prithvi',
    element: 'Earth',
    backgroundColor: '#9400D3', // Purple background
    shapeColor: '#FFFF00', // Yellow square
    shape: 'square',
    description: 'Earth element'
  }
];

// Duration of each tattva in minutes
const TATTVA_DURATION = 24;
const TOTAL_CYCLE_DURATION = TATTVA_DURATION * 5; // 120 minutes = 2 hours

// Default location coordinates (can be customized)
// Default to Montreal, Quebec, Canada coordinates
const DEFAULT_LATITUDE = 45.5017;
const DEFAULT_LONGITUDE = -73.5673;

// Get actual sunrise time based on geolocation
// Falls back to default location if geolocation is not available
export const getSunriseTime = (date = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const times = SunCalc.getTimes(date, latitude, longitude);
  return times.sunrise;
};

// Get actual sunset time based on geolocation
export const getSunsetTime = (date = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const times = SunCalc.getTimes(date, latitude, longitude);
  return times.sunset;
};

// Calculate which tattva is active at a given time
export const calculateTattva = (currentTime = new Date(), latitude = DEFAULT_LATITUDE, longitude = DEFAULT_LONGITUDE) => {
  const sunrise = getSunriseTime(currentTime, latitude, longitude);
  
  // Calculate milliseconds since sunrise
  const msSinceSunrise = currentTime - sunrise;
  const minutesSinceSunrise = Math.floor(msSinceSunrise / (1000 * 60));
  const secondsSinceSunrise = Math.floor(msSinceSunrise / 1000);
  
  // Handle time before sunrise (use previous day's cycle)
  const adjustedMinutes = minutesSinceSunrise >= 0 
    ? minutesSinceSunrise 
    : (24 * 60) + minutesSinceSunrise;
  
  const adjustedSeconds = secondsSinceSunrise >= 0
    ? secondsSinceSunrise
    : (24 * 60 * 60) + secondsSinceSunrise;
  
  // Find position in the 2-hour cycle
  const cyclePosition = adjustedMinutes % TOTAL_CYCLE_DURATION;
  const cyclePositionSeconds = adjustedSeconds % (TOTAL_CYCLE_DURATION * 60);
  
  // Calculate macrotide (main tattva)
  const macrotideIndex = Math.floor(cyclePosition / TATTVA_DURATION);
  const macrotide = TATTWAS[macrotideIndex];
  
  // Calculate microtide (sub-tattva within the macrotide)
  // Each microtide lasts 1/5 of the macrotide duration (4.8 minutes)
  const microtideDuration = TATTVA_DURATION / 5;
  const positionInMacrotide = cyclePosition % TATTVA_DURATION;
  const positionInMacrotideSeconds = cyclePositionSeconds % (TATTVA_DURATION * 60);
  const microtideIndex = Math.floor(positionInMacrotide / microtideDuration);
  const microtide = TATTWAS[microtideIndex];
  
  // Calculate remaining time for current macrotide and microtide in seconds
  const macrotideRemainingSeconds = (TATTVA_DURATION * 60) - positionInMacrotideSeconds;
  const microtideRemainingSeconds = (microtideDuration * 60) - (positionInMacrotideSeconds % (microtideDuration * 60));
  
  // Handle edge case: if remaining time is 0, set to full duration
  const safeMacrotideRemaining = macrotideRemainingSeconds === 0 ? (TATTVA_DURATION * 60) : macrotideRemainingSeconds;
  const safeMicrotideRemaining = microtideRemainingSeconds === 0 ? (microtideDuration * 60) : microtideRemainingSeconds;
  
  return {
    macrotide,
    microtide,
    macrotideRemainingSeconds: safeMacrotideRemaining,
    microtideRemainingSeconds: safeMicrotideRemaining,
    // Keep these for backward compatibility with tests
    macrotideRemainingMinutes: Math.ceil(safeMacrotideRemaining / 60),
    microtideRemainingMinutes: Math.ceil(safeMicrotideRemaining / 60),
    cyclePosition,
    sunrise
  };
};

// Get the next tattva in sequence
export const getNextTattva = (currentIndex) => {
  return TATTWAS[(currentIndex + 1) % TATTWAS.length];
};
