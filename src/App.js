import React, { useState, useEffect } from 'react';
import TattvaDisplay from './components/TattvaDisplay';
import { calculateTattva } from './utils/tattvaCalculator';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tattvaData, setTattvaData] = useState(calculateTattva());

  useEffect(() => {
    // Update the time and tattva data every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setTattvaData(calculateTattva(now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#2c3e50',
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#7f8c8d',
    margin: '0',
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Tattva Calculator</h1>
        <p style={subtitleStyle}>
          Discover the current elemental energies influencing the moment
        </p>
      </header>
      
      <TattvaDisplay tattvaData={tattvaData} currentTime={currentTime} />
    </div>
  );
}

export default App;
