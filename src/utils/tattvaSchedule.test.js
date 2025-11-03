/**
 * Tests for tattvaSchedule utility functions
 */

import { generateDailySchedule } from './tattvaSchedule';
import { TATTWAS } from './tattvaCalculator';

describe('tattvaSchedule', () => {
  describe('generateDailySchedule', () => {
    it('should generate a schedule array', () => {
      const testDate = new Date('2024-01-15T12:00:00');
      const schedule = generateDailySchedule(testDate);
      
      expect(Array.isArray(schedule)).toBe(true);
      expect(schedule.length).toBeGreaterThan(0);
    });

    it('should have entries with required properties', () => {
      const testDate = new Date('2024-01-15T12:00:00');
      const schedule = generateDailySchedule(testDate);
      
      const firstEntry = schedule[0];
      expect(firstEntry).toHaveProperty('startTime');
      expect(firstEntry).toHaveProperty('endTime');
      expect(firstEntry).toHaveProperty('macrotide');
      expect(firstEntry).toHaveProperty('microtide');
      expect(firstEntry.startTime).toBeInstanceOf(Date);
      expect(firstEntry.endTime).toBeInstanceOf(Date);
    });

    it('should have 24-minute intervals between start and end times', () => {
      const testDate = new Date('2024-01-15T12:00:00');
      const schedule = generateDailySchedule(testDate);
      
      const firstEntry = schedule[0];
      const duration = firstEntry.endTime - firstEntry.startTime;
      const expectedDuration = 24 * 60 * 1000; // 24 minutes in milliseconds
      
      expect(duration).toBe(expectedDuration);
    });

    it('should have consecutive entries with matching times', () => {
      const testDate = new Date('2024-01-15T12:00:00');
      const schedule = generateDailySchedule(testDate);
      
      for (let i = 1; i < Math.min(5, schedule.length); i++) {
        expect(schedule[i].startTime.getTime()).toBe(schedule[i - 1].endTime.getTime());
      }
    });

    it('should contain valid tattwas', () => {
      const testDate = new Date('2024-01-15T12:00:00');
      const schedule = generateDailySchedule(testDate);
      
      const tattvaNames = TATTWAS.map(t => t.name);
      
      schedule.forEach(entry => {
        expect(tattvaNames).toContain(entry.macrotide.name);
        expect(tattvaNames).toContain(entry.microtide.name);
      });
    });
  });
});
