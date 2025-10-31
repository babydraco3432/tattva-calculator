import { calculateTattva, TATTWAS, getSunriseTime, getSunsetTime } from '../utils/tattvaCalculator';
import SunCalc from 'suncalc';

// Mock SunCalc to return consistent sunrise times for testing
jest.mock('suncalc');

describe('Tattva Calculator', () => {
  // Setup consistent sunrise time for all tests
  beforeEach(() => {
    SunCalc.getTimes.mockReturnValue({
      sunrise: new Date(2024, 0, 1, 6, 0, 0, 0), // January 1, 2024, 6:00 AM
      sunset: new Date(2024, 0, 1, 18, 0, 0, 0), // January 1, 2024, 6:00 PM
    });
  });
  describe('TATTWAS constant', () => {
    test('should have 5 tattwas', () => {
      expect(TATTWAS).toHaveLength(5);
    });

    test('should have correct tattva names', () => {
      const names = TATTWAS.map(t => t.name);
      expect(names).toEqual(['Akasha', 'Vayu', 'Tejas', 'Apas', 'Prithvi']);
    });

    test('each tattva should have required properties', () => {
      TATTWAS.forEach(tattva => {
        expect(tattva).toHaveProperty('name');
        expect(tattva).toHaveProperty('element');
        expect(tattva).toHaveProperty('backgroundColor');
        expect(tattva).toHaveProperty('shapeColor');
        expect(tattva).toHaveProperty('shape');
        expect(tattva).toHaveProperty('description');
      });
    });
  });

  describe('getSunriseTime', () => {
    test('should return a Date object', () => {
      const sunrise = getSunriseTime();
      expect(sunrise).toBeInstanceOf(Date);
    });

    test('should use SunCalc to calculate sunrise', () => {
      const testDate = new Date(2024, 0, 1);
      getSunriseTime(testDate);
      expect(SunCalc.getTimes).toHaveBeenCalled();
    });
  });

  describe('getSunsetTime', () => {
    test('should return a Date object', () => {
      const sunset = getSunsetTime();
      expect(sunset).toBeInstanceOf(Date);
    });

    test('should use SunCalc to calculate sunset', () => {
      const testDate = new Date(2024, 0, 1);
      getSunsetTime(testDate);
      expect(SunCalc.getTimes).toHaveBeenCalled();
    });
  });

  describe('calculateTattva', () => {
    test('should return an object with required properties', () => {
      const result = calculateTattva();
      expect(result).toHaveProperty('macrotide');
      expect(result).toHaveProperty('microtide');
      expect(result).toHaveProperty('macrotideRemainingMinutes');
      expect(result).toHaveProperty('microtideRemainingMinutes');
      expect(result).toHaveProperty('macrotideRemainingSeconds');
      expect(result).toHaveProperty('microtideRemainingSeconds');
      expect(result).toHaveProperty('cyclePosition');
      expect(result).toHaveProperty('sunrise');
    });

    test('at sunrise (6:00 AM), should start with Akasha macrotide', () => {
      const sunriseTime = new Date(2024, 0, 1, 6, 0, 0, 0);
      const result = calculateTattva(sunriseTime);
      expect(result.macrotide.name).toBe('Akasha');
      expect(result.microtide.name).toBe('Akasha');
    });

    test('at 6:24 AM, should be Vayu macrotide', () => {
      const testTime = new Date(2024, 0, 1, 6, 24, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Vayu');
    });

    test('at 6:48 AM, should be Tejas macrotide', () => {
      const testTime = new Date(2024, 0, 1, 6, 48, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Tejas');
    });

    test('at 7:12 AM, should be Apas macrotide', () => {
      const testTime = new Date(2024, 0, 1, 7, 12, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Apas');
    });

    test('at 7:36 AM, should be Prithvi macrotide', () => {
      const testTime = new Date(2024, 0, 1, 7, 36, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Prithvi');
    });

    test('at 8:00 AM, cycle should repeat - back to Akasha', () => {
      const testTime = new Date(2024, 0, 1, 8, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Akasha');
    });

    test('macrotide remaining time should be between 1 and 24 minutes', () => {
      const result = calculateTattva();
      expect(result.macrotideRemainingMinutes).toBeGreaterThan(0);
      expect(result.macrotideRemainingMinutes).toBeLessThanOrEqual(24);
    });

    test('microtide remaining time should be between 0 and 5 minutes', () => {
      const result = calculateTattva();
      expect(result.microtideRemainingMinutes).toBeGreaterThan(0);
      expect(result.microtideRemainingMinutes).toBeLessThanOrEqual(5);
    });

    test('macrotide remaining seconds should be calculated correctly', () => {
      const testTime = new Date(2024, 0, 1, 6, 1, 30, 0); // 1:30 into Akasha
      const result = calculateTattva(testTime);
      // Should have 22:30 remaining (24 minutes - 1:30)
      expect(result.macrotideRemainingSeconds).toBe(22 * 60 + 30);
    });

    test('microtide remaining seconds should be calculated correctly', () => {
      const testTime = new Date(2024, 0, 1, 6, 1, 30, 0); // 1:30 into first microtide
      const result = calculateTattva(testTime);
      // Each microtide is 4.8 minutes = 288 seconds
      // After 1:30 (90 seconds), should have 198 seconds remaining
      expect(result.microtideRemainingSeconds).toBe(288 - 90);
    });

    test('microtide should change every ~4.8 minutes', () => {
      const baseTime = new Date(2024, 0, 1, 6, 0, 0, 0);
      
      const time1 = new Date(baseTime);
      const time2 = new Date(baseTime);
      time2.setMinutes(baseTime.getMinutes() + 5);

      const result1 = calculateTattva(time1);
      const result2 = calculateTattva(time2);

      expect(result1.microtide.name).toBe('Akasha');
      expect(result2.microtide.name).toBe('Vayu');
    });
  });
});
