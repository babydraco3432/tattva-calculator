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

    test('Vayu should have blue circle on orange background', () => {
      const vayu = TATTWAS.find(t => t.name === 'Vayu');
      expect(vayu.backgroundColor).toBe('#FF8C00'); // Orange background
      expect(vayu.shapeColor).toBe('#0066FF'); // Blue circle
      expect(vayu.shape).toBe('circle');
      // Ensure background and shape colors are different (circle should be visible)
      expect(vayu.backgroundColor).not.toBe(vayu.shapeColor);
    });

    test('Tejas should have emerald green triangle on red background', () => {
      const tejas = TATTWAS.find(t => t.name === 'Tejas');
      expect(tejas.backgroundColor).toBe('#FF0000'); // Red background
      expect(tejas.shapeColor).toBe('#50C878'); // Emerald green triangle
      expect(tejas.shape).toBe('triangle');
      // Ensure background and shape colors are different (triangle should be visible)
      expect(tejas.backgroundColor).not.toBe(tejas.shapeColor);
    });

    test('Apas should have silver crescent on black background', () => {
      const apas = TATTWAS.find(t => t.name === 'Apas');
      expect(apas.backgroundColor).toBe('#000000'); // Black background
      expect(apas.textColor).toBe('#C0C0C0'); // Silver text
      expect(apas.shapeColor).toBe('#C0C0C0'); // Silver crescent
      expect(apas.shape).toBe('crescent');
    });

    test('Akasha should have black oval on white background', () => {
      const akasha = TATTWAS.find(t => t.name === 'Akasha');
      expect(akasha.backgroundColor).toBe('#FFFFFF'); // White background
      expect(akasha.shapeColor).toBe('#000000'); // Black oval
      expect(akasha.shape).toBe('oval');
      // Ensure background and shape colors are different (oval should be visible)
      expect(akasha.backgroundColor).not.toBe(akasha.shapeColor);
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

    test('at 8:00 AM, should be Vayu macrotide', () => {
      const testTime = new Date(2024, 0, 1, 8, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Vayu');
    });

    test('at 10:00 AM, should be Tejas macrotide', () => {
      const testTime = new Date(2024, 0, 1, 10, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Tejas');
    });

    test('at 12:00 PM, should be Apas macrotide', () => {
      const testTime = new Date(2024, 0, 1, 12, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Apas');
    });

    test('at 2:00 PM, should be Prithvi macrotide', () => {
      const testTime = new Date(2024, 0, 1, 14, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Prithvi');
    });

    test('at 4:00 PM, cycle should repeat - back to Akasha', () => {
      const testTime = new Date(2024, 0, 1, 16, 0, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Akasha');
    });

    test('macrotide remaining time should be between 1 and 120 minutes', () => {
      const result = calculateTattva();
      expect(result.macrotideRemainingMinutes).toBeGreaterThan(0);
      expect(result.macrotideRemainingMinutes).toBeLessThanOrEqual(120);
    });

    test('microtide remaining time should be between 0 and 24 minutes', () => {
      const result = calculateTattva();
      expect(result.microtideRemainingMinutes).toBeGreaterThan(0);
      expect(result.microtideRemainingMinutes).toBeLessThanOrEqual(24);
    });

    test('macrotide remaining seconds should be calculated correctly', () => {
      const testTime = new Date(2024, 0, 1, 6, 10, 30, 0); // 10:30 into Akasha macrotide
      const result = calculateTattva(testTime);
      // Should have 1:49:30 remaining (120 minutes - 10:30 = 109:30)
      expect(result.macrotideRemainingSeconds).toBe(109 * 60 + 30);
    });

    test('microtide remaining seconds should be calculated correctly', () => {
      const testTime = new Date(2024, 0, 1, 6, 10, 30, 0); // 10:30 into first microtide
      const result = calculateTattva(testTime);
      // Each microtide is 24 minutes = 1440 seconds
      // After 10:30 (630 seconds), should have 810 seconds remaining
      expect(result.microtideRemainingSeconds).toBe(1440 - 630);
    });

    test('microtide should change every 24 minutes', () => {
      const baseTime = new Date(2024, 0, 1, 6, 0, 0, 0);
      
      const time1 = new Date(baseTime);
      const time2 = new Date(baseTime);
      time2.setMinutes(baseTime.getMinutes() + 24); // Move 24 minutes forward

      const result1 = calculateTattva(time1);
      const result2 = calculateTattva(time2);

      expect(result1.microtide.name).toBe('Akasha');
      expect(result2.microtide.name).toBe('Vayu'); // Should be next tattva after 24 minutes
    });
  });
});
