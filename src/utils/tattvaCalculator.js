// Tattva Calculator
// The tattva cycle starts at sunrise and each tattva lasts for 24 minutes
// There are 5 tattwas that cycle throughout the day

export const TATTWAS = [
  {
    name: 'Akasha',
    element: 'Ether',
    color: '#4B0082',
    shape: 'oval',
    description: 'Space/Ether element'
  },
  {
    name: 'Vayu',
    element: 'Air',
    color: '#4169E1',
    shape: 'circle',
    description: 'Air element'
  },
  {
    name: 'Tejas',
    element: 'Fire',
    color: '#FF0000',
    shape: 'triangle',
    description: 'Fire element'
  },
  {
    name: 'Apas',
    element: 'Water',
    color: '#C0C0C0',
    shape: 'crescent',
    description: 'Water element'
  },
  {
    name: 'Prithvi',
    element: 'Earth',
    color: '#FFD700',
    shape: 'square',
    description: 'Earth element'
  }
];

// Duration of each tattva in minutes
const TATTVA_DURATION = 24;
const TOTAL_CYCLE_DURATION = TATTVA_DURATION * 5; // 120 minutes = 2 hours

// Calculate sunrise time (simplified - using 6:00 AM as default)
// In a real application, this would be calculated based on location and date
export const getSunriseTime = () => {
  const sunrise = new Date();
  sunrise.setHours(6, 0, 0, 0);
  return sunrise;
};

// Calculate which tattva is active at a given time
export const calculateTattva = (currentTime = new Date()) => {
  const sunrise = getSunriseTime();
  
  // Calculate minutes since sunrise
  const minutesSinceSunrise = Math.floor((currentTime - sunrise) / (1000 * 60));
  
  // Handle time before sunrise (use previous day's cycle)
  const adjustedMinutes = minutesSinceSunrise >= 0 
    ? minutesSinceSunrise 
    : (24 * 60) + minutesSinceSunrise;
  
  // Find position in the 2-hour cycle
  const cyclePosition = adjustedMinutes % TOTAL_CYCLE_DURATION;
  
  // Calculate macrotide (main tattva)
  const macrotideIndex = Math.floor(cyclePosition / TATTVA_DURATION);
  const macrotide = TATTWAS[macrotideIndex];
  
  // Calculate microtide (sub-tattva within the macrotide)
  // Each microtide lasts 1/5 of the macrotide duration (4.8 minutes)
  const microtideDuration = TATTVA_DURATION / 5;
  const positionInMacrotide = cyclePosition % TATTVA_DURATION;
  const microtideIndex = Math.floor(positionInMacrotide / microtideDuration);
  const microtide = TATTWAS[microtideIndex];
  
  // Calculate remaining time for current macrotide and microtide
  const macrotideRemainingMinutes = TATTVA_DURATION - (cyclePosition % TATTVA_DURATION);
  const microtideRemainingMinutes = microtideDuration - (positionInMacrotide % microtideDuration);
  
  return {
    macrotide,
    microtide,
    macrotideRemainingMinutes: Math.ceil(macrotideRemainingMinutes),
    microtideRemainingMinutes: Math.ceil(microtideRemainingMinutes),
    cyclePosition,
    sunrise
  };
};

// Get the next tattva in sequence
export const getNextTattva = (currentIndex) => {
  return TATTWAS[(currentIndex + 1) % TATTWAS.length];
};
