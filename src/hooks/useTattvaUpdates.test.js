import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTattvaUpdates } from './useTattvaUpdates';
import { calculateTattva } from '../utils/tattvaCalculator';

jest.mock('../utils/tattvaCalculator', () => ({
  calculateTattva: jest.fn(),
}));

jest.mock('../constants/styles', () => ({
  DURATIONS: { UPDATE_INTERVAL_MS: 1000 },
}));

const TattvaTester = ({ location }) => {
  const { currentTime, tattvaData } = useTattvaUpdates(location);

  return (
    <>
      <div data-testid="time">{currentTime.toISOString()}</div>
      <div data-testid="tattva">{tattvaData?.id ?? ''}</div>
    </>
  );
};


describe('useTattvaUpdates', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-11-03T10:00:00Z'));
    calculateTattva.mockReset();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('updates tattva data on interval without location', async () => {
    calculateTattva.mockImplementation(() => ({ id: 'mock' }));

    render(<TattvaTester location={null} />);

    const initialCalls = calculateTattva.mock.calls.length;
    const initialTime = screen.getByTestId('time').textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(calculateTattva.mock.calls.length).toBeGreaterThan(initialCalls);
    });

    const intervalCall = calculateTattva.mock.calls[initialCalls];
    expect(intervalCall[0]).toBeInstanceOf(Date);
    expect(intervalCall[1]).toBeUndefined();
    expect(intervalCall[2]).toBeUndefined();
    expect(screen.getByTestId('time').textContent).not.toBe(initialTime);
  });

  it('uses provided location for calculations', async () => {
    const location = { latitude: 12.34, longitude: 56.78 };

    calculateTattva.mockImplementation(() => ({ id: 'mock' }));

    render(<TattvaTester location={location} />);

    const initialCalls = calculateTattva.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(calculateTattva.mock.calls.length).toBeGreaterThan(initialCalls);
    });

    const intervalCall = calculateTattva.mock.calls[initialCalls];
    expect(intervalCall[1]).toBe(location.latitude);
    expect(intervalCall[2]).toBe(location.longitude);
  });

  it('responds to location updates without resetting timer', async () => {
    const initialLocation = null;
    const updatedLocation = { latitude: 22.22, longitude: 33.33 };

    calculateTattva.mockImplementation(() => ({ id: 'mock' }));

    const { rerender } = render(<TattvaTester location={initialLocation} />);

    let callCount = calculateTattva.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(calculateTattva.mock.calls.length).toBeGreaterThan(callCount);
    });

    callCount = calculateTattva.mock.calls.length;
    rerender(<TattvaTester location={updatedLocation} />);

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(calculateTattva.mock.calls.length).toBeGreaterThan(callCount);
    });

    callCount = calculateTattva.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(calculateTattva.mock.calls.length).toBeGreaterThan(callCount);
    });

    const updatedCall = calculateTattva.mock.calls[callCount];
    expect(updatedCall[1]).toBe(updatedLocation.latitude);
    expect(updatedCall[2]).toBe(updatedLocation.longitude);
  });
});