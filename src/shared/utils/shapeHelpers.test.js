import { getSubelementColor, getPositionOffset } from './shapeHelpers';

describe('getSubelementColor', () => {
  it('returns predefined colors for known elements', () => {
    expect(getSubelementColor('Prithvi')).toBe('#FFFF00');
    expect(getSubelementColor('Vayu')).toBe('#0066FF');
    expect(getSubelementColor('Tejas')).toBe('#FF0000');
    expect(getSubelementColor('Apas')).toBe('#C0C0C0');
    expect(getSubelementColor('Akasha')).toBe('#000000');
  });

  it('falls back to white for unknown elements', () => {
    expect(getSubelementColor('Unknown')).toBe('#FFFFFF');
  });
});

describe('getPositionOffset', () => {
  it('returns specific offsets for triangle and crescent shapes', () => {
    expect(getPositionOffset('triangle')).toEqual({ top: '62%', left: '50%' });
    expect(getPositionOffset('crescent')).toEqual({ top: '61%', left: '50%' });
  });

  it('returns centered offsets for other shapes', () => {
    expect(getPositionOffset('circle')).toEqual({ top: '50%', left: '50%' });
    expect(getPositionOffset('unknown')).toEqual({ top: '50%', left: '50%' });
  });
});
