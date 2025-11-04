import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SHAPE_POSITIONS } from '../../shared/styles/styles';

jest.mock('../../shared/utils/timeFormatter', () => ({
  formatTime: jest.fn((date) => date.toISOString()),
  formatDateWithOrdinal: jest.fn((date) => date.toISOString()),
}));

const capturedShapes = [];

jest.mock('../../shared/components/shapes/ShapeComponents', () => {
  const React = require('react');
  const capture = (type) => ({ position }) => {
    capturedShapes.push({ type, position });
    return <div data-testid={`${type}-shape`} />;
  };
  return {
    OvalShape: capture('oval'),
    CircleShape: capture('circle'),
    TriangleShape: capture('triangle'),
    SquareShape: capture('square'),
    CrescentShape: ({ position }) => {
      capturedShapes.push({ type: 'crescent', position });
      return <div data-testid="crescent-shape" />;
    },
  };
});

const { default: DailyTides } = require('./DailyTides');

const createTattva = (shape, overrides = {}) => ({
  name: `${shape}-name`,
  element: 'Element',
  backgroundColor: '#111',
  textColor: '#fff',
  shapeColor: '#222',
  shape,
  ...overrides,
});

const sunrise = new Date('2025-11-03T06:00:00.000Z');

const schedule = [
  {
    startTime: new Date('2025-11-03T06:00:00.000Z'),
    endTime: new Date('2025-11-03T06:24:00.000Z'),
    macrotide: createTattva('oval'),
    microtide: createTattva('circle'),
  },
  {
    startTime: new Date('2025-11-03T06:24:00.000Z'),
    endTime: new Date('2025-11-03T06:48:00.000Z'),
    macrotide: createTattva('triangle'),
    microtide: createTattva('square'),
  },
  {
    startTime: new Date('2025-11-03T06:48:00.000Z'),
    endTime: new Date('2025-11-03T07:12:00.000Z'),
    macrotide: createTattva('crescent'),
    microtide: createTattva('unknown'),
  },
];

describe('DailyTides shape rendering', () => {
  beforeEach(() => {
    capturedShapes.length = 0;
  });

  it('renders expected shape components and handles unknown shapes', () => {
    render(<DailyTides schedule={schedule} sunrise={sunrise} currentTime={sunrise} />);

    expect(capturedShapes.map((entry) => entry.type)).toEqual(
      expect.arrayContaining(['oval', 'circle', 'triangle', 'square', 'crescent'])
    );

    const triangleShape = capturedShapes.find((entry) => entry.type === 'triangle');
    expect(triangleShape.position.top).toBe(SHAPE_POSITIONS.TRIANGLE_TOP_OFFSET);

    expect(screen.queryByTestId('unknown-shape-none')).not.toBeInTheDocument();
  });
});
