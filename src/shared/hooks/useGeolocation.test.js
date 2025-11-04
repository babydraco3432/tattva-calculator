import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGeolocation } from './useGeolocation';

const GeolocationTester = () => {
  const { userLocation, error } = useGeolocation();

  return (
    <>
      <div data-testid="lat">{userLocation?.latitude ?? ''}</div>
      <div data-testid="lng">{userLocation?.longitude ?? ''}</div>
      <div data-testid="error">{error ?? ''}</div>
    </>
  );
};

describe('useGeolocation', () => {
  let originalGeolocation;

  beforeEach(() => {
    originalGeolocation = navigator.geolocation;
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true,
    });
    jest.clearAllMocks();
  });

  it('returns coordinates when geolocation succeeds', async () => {
    const mockPosition = {
      coords: { latitude: 45.5, longitude: -73.56 },
    };

    const getCurrentPosition = jest.fn((success) => success(mockPosition));

    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
      writable: true,
    });

    render(<GeolocationTester />);

    await waitFor(() => {
      expect(screen.getByTestId('lat')).toHaveTextContent(String(mockPosition.coords.latitude));
    });

    expect(screen.getByTestId('lng')).toHaveTextContent(String(mockPosition.coords.longitude));
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(getCurrentPosition).toHaveBeenCalled();
  });

  it('captures error when geolocation fails', async () => {
    const errorMessage = 'User denied Geolocation';
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const getCurrentPosition = jest.fn((_success, failure) => failure({ message: errorMessage }));

    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
      writable: true,
    });

    render(<GeolocationTester />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
    });

    expect(screen.getByTestId('lat')).toHaveTextContent('');
    expect(screen.getByTestId('lng')).toHaveTextContent('');
    expect(getCurrentPosition).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('reports unsupported geolocation', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    render(<GeolocationTester />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Geolocation is not supported by this browser'
      );
    });

    expect(screen.getByTestId('lat')).toHaveTextContent('');
    expect(screen.getByTestId('lng')).toHaveTextContent('');
  });
});
