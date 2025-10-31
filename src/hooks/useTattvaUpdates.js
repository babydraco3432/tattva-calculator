import { useState, useEffect, useRef } from 'react';
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
  const locationRef = useRef(userLocation);

  // Update location ref when it changes
  useEffect(() => {
    locationRef.current = userLocation;
  }, [userLocation]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Use ref to get latest location without restarting timer
      const location = locationRef.current;
      if (location) {
        setTattvaData(calculateTattva(now, location.latitude, location.longitude));
      } else {
        setTattvaData(calculateTattva(now));
      }
    }, DURATIONS.UPDATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []); // Empty dependency array - timer runs once

  return { currentTime, tattvaData };
};
