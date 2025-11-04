import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TattvaDisplay from './TattvaDisplay';

jest.mock('../../shared/utils/timeFormatter', () => ({
  formatTime: jest.fn(() => 'mock-time'),
  formatMacrotideRemaining: jest.fn((seconds) => `macro-${seconds}`),
  formatMicrotideRemaining: jest.fn((seconds) => `micro-${seconds}`),
}));

const {
  formatTime,
  formatMacrotideRemaining,
  formatMicrotideRemaining,
} = jest.requireMock('../../shared/utils/timeFormatter');

const baseTattvaData = {
  macrotide: {
    name: 'Akasha',
    element: 'Ether',
    backgroundColor: '#FFFFFF',
    shapeColor: '#000000',
    shape: 'oval',
  },
  microtide: {
    name: 'Vayu',
    element: 'Air',
    shape: 'circle',
  },
  macrotideRemainingSeconds: 1800,
  microtideRemainingSeconds: 300,
  sunrise: new Date('2025-11-03T06:30:00Z'),
};

const renderComponent = (overrides = {}) => {
  const props = {
    tattvaData: baseTattvaData,
    currentTime: new Date('2025-11-03T10:00:00Z'),
    scryingMode: false,
    setScryingMode: jest.fn(),
    ...overrides,
  };

  return {
    ...render(<TattvaDisplay {...props} />),
    props,
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TattvaDisplay', () => {
  it('renders current tide information when not in scrying mode', () => {
    const { props } = renderComponent();

    expect(formatTime).toHaveBeenCalledWith(props.currentTime);
    expect(formatTime).toHaveBeenCalledWith(props.tattvaData.sunrise);
    expect(formatMacrotideRemaining).toHaveBeenCalledWith(
      props.tattvaData.macrotideRemainingSeconds
    );
    expect(formatMicrotideRemaining).toHaveBeenCalledWith(
      props.tattvaData.microtideRemainingSeconds
    );

    expect(screen.getByRole('timer')).toHaveTextContent(/Current Time:/);
    const macrotideSection = screen.getByText(/Current Macrotide:/).parentElement;
    const microtideSection = screen.getByText(/Current Microtide:/).parentElement;
    expect(macrotideSection).toHaveTextContent('Akasha (Ether)');
    expect(microtideSection).toHaveTextContent('Vayu (Air)');
    expect(screen.getByRole('button', { name: /Enter scrying mode/i })).toBeInTheDocument();
  });

  it('sets scrying mode when the card is activated', () => {
    const setScryingMode = jest.fn();
    renderComponent({ setScryingMode });

    const toggleButton = screen.getByRole('button', { name: /Enter scrying mode/i });
    fireEvent.click(toggleButton);
    fireEvent.keyDown(toggleButton, { key: 'Enter', code: 'Enter' });

    expect(setScryingMode).toHaveBeenCalledWith(true);
    expect(setScryingMode).toHaveBeenCalledTimes(2);
  });

  it('renders scrying overlay and exits on interaction', () => {
    const setScryingMode = jest.fn();
    renderComponent({ scryingMode: true, setScryingMode });

    const overlay = screen.getByRole('dialog', { name: /Scrying mode/i });
    fireEvent.click(overlay);
    fireEvent.keyDown(overlay, { key: 'Escape', code: 'Escape' });

    expect(setScryingMode).toHaveBeenCalledWith(false);
    expect(setScryingMode).toHaveBeenCalledTimes(2);
  });
});
