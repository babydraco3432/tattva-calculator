import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Tattva Calculator heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Tattva Calculator/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders subtitle about elemental energies', () => {
    render(<App />);
    const subtitleElement = screen.getByText(/Discover the current elemental energies/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders macrotide section', () => {
    render(<App />);
    const macrotideElement = screen.getByText(/Macrotide \(Main Tattva\)/i);
    expect(macrotideElement).toBeInTheDocument();
  });

  test('renders microtide section', () => {
    render(<App />);
    const microtideElement = screen.getByText(/Microtide \(Sub-Tattva\)/i);
    expect(microtideElement).toBeInTheDocument();
  });

  test('renders current time display', () => {
    render(<App />);
    const timeElement = screen.getByText(/Current Time:/i);
    expect(timeElement).toBeInTheDocument();
  });

  test('renders sunrise time display', () => {
    render(<App />);
    const sunriseElement = screen.getByText(/Sunrise:/i);
    expect(sunriseElement).toBeInTheDocument();
  });

  test('renders tattva cycle information', () => {
    render(<App />);
    const cycleInfo = screen.getByText(/The tattva cycle repeats every 2 hours/i);
    expect(cycleInfo).toBeInTheDocument();
  });
});
