/**
 * Tests for time formatting utility functions
 */

import { formatTime, formatMacrotideRemaining, formatMicrotideRemaining, formatDateWithOrdinal } from './timeFormatter';

describe('Time Formatter', () => {
  describe('formatTime', () => {
    test('formats time correctly', () => {
      const date = new Date('2024-11-03T15:30:45');
      const formatted = formatTime(date);
      expect(formatted).toMatch(/\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('formatMacrotideRemaining', () => {
    test('formats hours, minutes, and seconds correctly', () => {
      expect(formatMacrotideRemaining(7265)).toBe('02:01:05');
      expect(formatMacrotideRemaining(3661)).toBe('01:01:01');
      expect(formatMacrotideRemaining(0)).toBe('00:00:00');
    });
  });

  describe('formatMicrotideRemaining', () => {
    test('formats minutes and seconds correctly', () => {
      expect(formatMicrotideRemaining(125)).toBe('2:05');
      expect(formatMicrotideRemaining(61)).toBe('1:01');
      expect(formatMicrotideRemaining(0)).toBe('0:00');
    });
  });

  describe('formatDateWithOrdinal', () => {
    test('formats date with 1st ordinal', () => {
      const date = new Date('2024-11-01T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('1st');
      expect(formatted).toContain('November');
      expect(formatted).toContain('2024');
    });

    test('formats date with 2nd ordinal', () => {
      const date = new Date('2024-11-02T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('2nd');
    });

    test('formats date with 3rd ordinal', () => {
      const date = new Date('2024-11-03T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('3rd');
    });

    test('formats date with 4th ordinal', () => {
      const date = new Date('2024-11-04T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('4th');
    });

    test('formats date with 11th ordinal (special case)', () => {
      const date = new Date('2024-11-11T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('11th');
      expect(formatted).not.toContain('11st');
    });

    test('formats date with 12th ordinal (special case)', () => {
      const date = new Date('2024-11-12T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('12th');
      expect(formatted).not.toContain('12nd');
    });

    test('formats date with 13th ordinal (special case)', () => {
      const date = new Date('2024-11-13T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('13th');
      expect(formatted).not.toContain('13rd');
    });

    test('formats date with 21st ordinal', () => {
      const date = new Date('2024-11-21T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('21st');
    });

    test('formats date with 22nd ordinal', () => {
      const date = new Date('2024-11-22T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('22nd');
    });

    test('formats date with 23rd ordinal', () => {
      const date = new Date('2024-11-23T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('23rd');
    });

    test('formats date with 31st ordinal', () => {
      const date = new Date('2024-10-31T12:00:00');
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toContain('31st');
      expect(formatted).toContain('October');
    });

    test('includes day of week', () => {
      const date = new Date('2024-11-03T12:00:00'); // Sunday
      const formatted = formatDateWithOrdinal(date);
      expect(formatted).toMatch(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/);
    });
  });
});
