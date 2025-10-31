import { useState, useEffect } from 'react';
import { calculateTattva } from '../utils/tattvaCalculator';
import { DURATIONS } from '../constants/styles';

/**
 * Custom hook to manage tattva data updates
 * @param {Object|null} userLocation - User location object with latitude and longitude
 * @returns {Object} Current time and tattva data
 */
export const useTattvaUpdates = (userLocation) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tattvaData, setTattvaData] = useState(calculateTattva());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Pass user location if available, otherwise use default
      if (userLocation) {
        setTattvaData(calculateTattva(now, userLocation.latitude, userLocation.longitude));
      } else {
        setTattvaData(calculateTattva(now));
      }
    }, DURATIONS.UPDATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [userLocation]);

  return { currentTime, tattvaData };
};
