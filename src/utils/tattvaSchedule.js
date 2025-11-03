/**
 * Tattva Schedule Generator
 * Generates a daily timetable of tattwas from sunrise to next sunrise
 */

import { calculateTattva, getSunriseTime } from './tattvaCalculator';

/**
 * Generate a complete daily tattva schedule from sunrise to next sunrise
 * Each entry represents a 24-minute microtide period
 * 
 * @param {Date} [currentDate=new Date()] - Reference date for schedule calculation
 * @param {number} [latitude] - Latitude coordinate for sunrise calculation
 * @param {number} [longitude] - Longitude coordinate for sunrise calculation
 * @returns {Array<Object>} Array of schedule entries with start, end, macrotide, and microtide
 */
export const generateDailySchedule = (currentDate = new Date(), latitude, longitude) => {
  const sunrise = getSunriseTime(currentDate, latitude, longitude);
  
  // Get next day's sunrise
  const nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextSunrise = getSunriseTime(nextDay, latitude, longitude);
  
  const schedule = [];
  const MICROTIDE_DURATION_MS = 24 * 60 * 1000; // 24 minutes in milliseconds
  
  // Start from sunrise and go until next sunrise
  let currentTime = new Date(sunrise);
  
  while (currentTime < nextSunrise) {
    const tattvaData = calculateTattva(currentTime, latitude, longitude);
    const endTime = new Date(currentTime.getTime() + MICROTIDE_DURATION_MS);
    
    // Truncate the last entry to end exactly at next sunrise
    const actualEndTime = endTime > nextSunrise ? nextSunrise : endTime;
    
    schedule.push({
      startTime: new Date(currentTime),
      endTime: actualEndTime,
      macrotide: tattvaData.macrotide,
      microtide: tattvaData.microtide
    });
    
    currentTime = endTime;
  }
  
  return schedule;
};
