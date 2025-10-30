import React from 'react';

const TattvaShape = ({ tattva, size = 100, isMicrotide = false }) => {
  const { shape, backgroundColor, shapeColor, name } = tattva;

  const renderShape = () => {
    // Container with background color
    const containerStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size * 1.5,
      height: size * 1.5,
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      border: '3px solid #333',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    };

    const shapeStyle = {
      display: 'inline-block',
      width: size,
      height: size,
    };

    switch (shape) {
      case 'oval':
        return (
          <div style={containerStyle}>
            <div
              style={{
                ...shapeStyle,
                backgroundColor: shapeColor,
                borderRadius: '50%',
                transform: 'scaleY(1.3)',
              }}
              title={name}
            />
          </div>
        );

      case 'circle':
        return (
          <div style={containerStyle}>
            <div
              style={{
                ...shapeStyle,
                backgroundColor: shapeColor,
                borderRadius: '50%',
              }}
              title={name}
            />
          </div>
        );

      case 'triangle':
        return (
          <div style={containerStyle}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${shapeColor}`,
              }}
              title={name}
            />
          </div>
        );

      case 'crescent':
        return (
          <div style={containerStyle}>
            <div
              style={{
                ...shapeStyle,
                backgroundColor: shapeColor,
                borderRadius: '50%',
                clipPath: 'ellipse(50% 50% at 30% 50%)',
              }}
              title={name}
            />
          </div>
        );

      case 'square':
        return (
          <div style={containerStyle}>
            <div
              style={{
                ...shapeStyle,
                backgroundColor: shapeColor,
              }}
              title={name}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '15px',
    }}>
      {renderShape()}
    </div>
  );
};

export default TattvaShape;
