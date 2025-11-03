import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useGeolocation } from './hooks/useGeolocation';
import { useTattvaUpdates } from './hooks/useTattvaUpdates';
import { generateDailySchedule } from './utils/tattvaSchedule';

jest.mock('./hooks/useGeolocation');
jest.mock('./hooks/useTattvaUpdates');
jest.mock('./utils/tattvaSchedule');

const mockLocation = { latitude: 45.5, longitude: -73.56 };
const mockMacrotide = {
  name: 'Akasha',
  element: 'Ether',
  backgroundColor: '#1a1a1a',
  textColor: '#fafafa',
  shapeColor: '#bada55',
  shape: 'oval',
};

const mockMicrotide = {
  name: 'Vayu',
  element: 'Air',
  backgroundColor: '#003366',
  textColor: '#ffffff',
  shapeColor: '#ffcc00',
  shape: 'triangle',
};

const mockTattvaData = {
  macrotide: mockMacrotide,
  microtide: mockMicrotide,
  macrotideRemainingSeconds: 3600,
  microtideRemainingSeconds: 600,
  sunrise: new Date('2025-11-03T06:37:59Z'),
};

const sampleSchedule = [
  {
    startTime: new Date('2025-11-03T06:37:59Z'),
    endTime: new Date('2025-11-03T07:01:59Z'),
    macrotide: mockMacrotide,
    microtide: mockMicrotide,
  },
  {
    startTime: new Date('2025-11-03T07:01:59Z'),
    endTime: new Date('2025-11-03T07:25:59Z'),
    macrotide: { ...mockMacrotide, name: 'Apas', element: 'Water', shape: 'crescent' },
    microtide: { ...mockMicrotide, name: 'Agni', element: 'Fire', shape: 'square' },
  },
];

const mockCurrentTime = new Date('2025-11-03T10:00:00Z');

const setupMocks = ({ withLocation = false } = {}) => {
  useGeolocation.mockReturnValue({ userLocation: withLocation ? mockLocation : null });
  useTattvaUpdates.mockReturnValue({ currentTime: mockCurrentTime, tattvaData: mockTattvaData });
  generateDailySchedule.mockReturnValue(sampleSchedule);
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('renders header and current tide view by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Tattva Calculator/i })).toBeInTheDocument();
    expect(screen.getByText(/Discover the current elemental energies/i)).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('switches to daily tides tab and generates schedule', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Daily Tides/i }));

    expect(generateDailySchedule).toHaveBeenCalledWith(mockCurrentTime);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('passes location coordinates to schedule generator when available', () => {
    setupMocks({ withLocation: true });
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Daily Tides/i }));

    expect(generateDailySchedule).toHaveBeenCalledWith(
      mockCurrentTime,
      mockLocation.latitude,
      mockLocation.longitude
    );
  });

  it('hides header when scrying mode is activated', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Enter scrying mode/i }));

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Tattva Calculator/i })).not.toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: /Daily Tides/i })).not.toBeInTheDocument();
  });
});
