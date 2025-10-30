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

  test('renders current macrotide information', () => {
    render(<App />);
    const macrotideElement = screen.getByText(/Current Macrotide:/i);
    expect(macrotideElement).toBeInTheDocument();
  });

  test('renders current microtide information', () => {
    render(<App />);
    const microtideElement = screen.getByText(/Current Microtide:/i);
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

  test('renders "of" format showing microtide of macrotide', () => {
    render(<App />);
    // The format should be like "Vayu of Akasha"
    const ofText = screen.getByText(/of/i);
    expect(ofText).toBeInTheDocument();
  });
});
