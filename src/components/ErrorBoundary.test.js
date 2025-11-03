import React from 'react';
import PropTypes from 'prop-types';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Safe child</div>;
};

ProblemChild.propTypes = {
  shouldThrow: PropTypes.bool,
};

describe('ErrorBoundary', () => {
  const originalEnv = process.env.NODE_ENV;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe child')).toBeInTheDocument();
  });

  it('displays fallback UI and allows refresh when error occurs', async () => {
    const originalLocation = globalThis.location;
    const reloadMock = jest.fn();
    delete globalThis.location;
    globalThis.location = { reload: reloadMock };

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /refresh page/i }));
    expect(reloadMock).toHaveBeenCalled();

    globalThis.location = originalLocation;
  });

  it('shows error details in development mode', async () => {
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Error details/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });
});