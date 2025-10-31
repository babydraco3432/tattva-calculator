import { useState, useEffect } from 'react';

/**
 * Custom hook to get user's geolocation
 * @returns {Object|null} User location object with latitude and longitude, or null if unavailable
 */
export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
        console.log('Geolocation not available or denied, using default location (Montreal)');
      }
    );
  }, []);

  return { userLocation, error };
};
