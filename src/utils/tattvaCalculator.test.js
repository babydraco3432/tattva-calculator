import { calculateTattva, TATTWAS, getSunriseTime } from '../utils/tattvaCalculator';

describe('Tattva Calculator', () => {
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

    test('should return 6:00 AM', () => {
      const sunrise = getSunriseTime();
      expect(sunrise.getHours()).toBe(6);
      expect(sunrise.getMinutes()).toBe(0);
      expect(sunrise.getSeconds()).toBe(0);
    });
  });

  describe('calculateTattva', () => {
    test('should return an object with required properties', () => {
      const result = calculateTattva();
      expect(result).toHaveProperty('macrotide');
      expect(result).toHaveProperty('microtide');
      expect(result).toHaveProperty('macrotideRemainingMinutes');
      expect(result).toHaveProperty('microtideRemainingMinutes');
      expect(result).toHaveProperty('cyclePosition');
      expect(result).toHaveProperty('sunrise');
    });

    test('at sunrise (6:00 AM), should start with Akasha macrotide', () => {
      const sunriseTime = new Date();
      sunriseTime.setHours(6, 0, 0, 0);
      const result = calculateTattva(sunriseTime);
      expect(result.macrotide.name).toBe('Akasha');
      expect(result.microtide.name).toBe('Akasha');
    });

    test('at 6:24 AM, should be Vayu macrotide', () => {
      const testTime = new Date();
      testTime.setHours(6, 24, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Vayu');
    });

    test('at 6:48 AM, should be Tejas macrotide', () => {
      const testTime = new Date();
      testTime.setHours(6, 48, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Tejas');
    });

    test('at 7:12 AM, should be Apas macrotide', () => {
      const testTime = new Date();
      testTime.setHours(7, 12, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Apas');
    });

    test('at 7:36 AM, should be Prithvi macrotide', () => {
      const testTime = new Date();
      testTime.setHours(7, 36, 0, 0);
      const result = calculateTattva(testTime);
      expect(result.macrotide.name).toBe('Prithvi');
    });

    test('at 8:00 AM, cycle should repeat - back to Akasha', () => {
      const testTime = new Date();
      testTime.setHours(8, 0, 0, 0);
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

    test('microtide should change every ~4.8 minutes', () => {
      const baseTime = new Date();
      baseTime.setHours(6, 0, 0, 0);
      
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
