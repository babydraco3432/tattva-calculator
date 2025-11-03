import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailyTides from './DailyTides';

jest.mock('../utils/timeFormatter', () => ({
  formatTime: jest.fn((date) => `time-${date.toISOString()}`),
  formatDateWithOrdinal: jest.fn((date) => `date-${date.toISOString()}`),
}));

const { formatTime, formatDateWithOrdinal } = jest.requireMock('../utils/timeFormatter');

const sunrise = new Date('2025-11-03T06:37:59.000Z');
const schedule = [
  {
    startTime: new Date('2025-11-03T10:37:59.000Z'),
    endTime: new Date('2025-11-03T11:01:59.000Z'),
    macrotide: {
      name: 'Apas',
      element: 'Water',
      backgroundColor: '#000000',
      textColor: '#C0C0C0',
      shapeColor: '#C0C0C0',
      shape: 'crescent',
    },
    microtide: {
      name: 'Prithvi',
      element: 'Earth',
      backgroundColor: '#9400D3',
      textColor: '#FFFF00',
      shapeColor: '#FFFF00',
      shape: 'square',
    },
  },
  {
    startTime: new Date('2025-11-03T11:01:59.000Z'),
    endTime: new Date('2025-11-03T11:25:59.000Z'),
    macrotide: {
      name: 'Apas',
      element: 'Water',
      backgroundColor: '#000000',
      textColor: '#C0C0C0',
      shapeColor: '#C0C0C0',
      shape: 'crescent',
    },
    microtide: {
      name: 'Akasha',
      element: 'Ether',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      shapeColor: '#000000',
      shape: 'oval',
    },
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (currentTime = schedule[0].startTime) =>
  render(<DailyTides schedule={schedule} sunrise={sunrise} currentTime={currentTime} />);

describe('DailyTides', () => {
  it('renders schedule table with formatted times and headings', () => {
    renderComponent();

    expect(formatDateWithOrdinal).toHaveBeenCalledWith(sunrise);
    expect(formatTime).toHaveBeenCalledWith(sunrise);
    expect(formatTime).toHaveBeenCalledWith(schedule[0].startTime);
    expect(formatTime).toHaveBeenCalledWith(schedule[0].endTime);

    expect(screen.getByRole('heading', { name: /Tattva Tides for/ })).toBeInTheDocument();
    expect(screen.getByText(/Schedule from sunrise/)).toHaveTextContent(
      /Schedule from sunrise at/
    );

    const rows = screen.getAllByRole('row');
    // header row + two data rows
    expect(rows).toHaveLength(3);
  const firstRowCells = within(rows[1]).getAllByRole('cell');
  expect(firstRowCells).toHaveLength(4);
    expect(firstRowCells[2]).toHaveTextContent('Apas (Water)');
    expect(firstRowCells[3]).toHaveTextContent('Prithvi (Earth)');
  });

  it('highlights the current tide row based on current time', () => {
    renderComponent(new Date('2025-11-03T10:45:00.000Z'));

    const rows = screen.getAllByRole('row');
    const currentCells = within(rows[1]).getAllByRole('cell');
    const upcomingCells = within(rows[2]).getAllByRole('cell');

    for (const cell of currentCells) {
      expect(cell).toHaveStyle({ fontWeight: 'bold' });
    }

    for (const cell of upcomingCells) {
      expect(cell).toHaveStyle({ fontWeight: 'normal' });
    }
  });
});