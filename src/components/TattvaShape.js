import React from 'react';

const TattvaShape = ({ tattva, microtide, size = 100, scryingMode = false }) => {
  const { shape, backgroundColor, shapeColor, name } = tattva;

  // Container with background color (macrotide)
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size * 1.5,
    height: size * 1.5,
    backgroundColor: backgroundColor,
    borderRadius: '10px',
    border: scryingMode ? '4px solid #fff' : '3px solid #333',
    boxShadow: scryingMode 
      ? '0 0 50px rgba(255,255,255,0.5)' 
      : '0 4px 8px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const shapeStyle = {
    display: 'inline-block',
    width: size,
    height: size,
  };

  const renderMacrotideShape = () => {
    switch (shape) {
      case 'oval':
        return (
          <div
            style={{
              ...shapeStyle,
              backgroundColor: shapeColor,
              borderRadius: '50%',
              transform: 'scaleY(1.3)',
            }}
            title={name}
          />
        );

      case 'circle':
        return (
          <div
            style={{
              ...shapeStyle,
              backgroundColor: shapeColor,
              borderRadius: '50%',
            }}
            title={name}
          />
        );

      case 'triangle':
        return (
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
        );

      case 'crescent':
        return (
          <div
            style={{
              ...shapeStyle,
              backgroundColor: shapeColor,
              borderRadius: '50%',
              clipPath: 'ellipse(50% 50% at 30% 50%)',
            }}
            title={name}
          />
        );

      case 'square':
        return (
          <div
            style={{
              ...shapeStyle,
              backgroundColor: shapeColor,
            }}
            title={name}
          />
        );

      default:
        return null;
    }
  };

  const renderMicrotideShape = () => {
    if (!microtide) return null;

    const microtideSize = size * 0.4; // Smaller size for nested microtide
    const { shape: microShape, shapeColor: microColor } = microtide;

    const microStyle = {
      position: 'absolute',
      top: '10%',
      right: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: microtideSize * 1.2,
      height: microtideSize * 1.2,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '5px',
      border: '2px solid #333',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    };

    const microShapeStyle = {
      display: 'inline-block',
      width: microtideSize,
      height: microtideSize,
    };

    switch (microShape) {
      case 'oval':
        return (
          <div style={microStyle}>
            <div
              style={{
                ...microShapeStyle,
                backgroundColor: microColor,
                borderRadius: '50%',
                transform: 'scaleY(1.3)',
              }}
            />
          </div>
        );

      case 'circle':
        return (
          <div style={microStyle}>
            <div
              style={{
                ...microShapeStyle,
                backgroundColor: microColor,
                borderRadius: '50%',
              }}
            />
          </div>
        );

      case 'triangle':
        return (
          <div style={microStyle}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${microtideSize / 2}px solid transparent`,
                borderRight: `${microtideSize / 2}px solid transparent`,
                borderBottom: `${microtideSize}px solid ${microColor}`,
              }}
            />
          </div>
        );

      case 'crescent':
        return (
          <div style={microStyle}>
            <div
              style={{
                ...microShapeStyle,
                backgroundColor: microColor,
                borderRadius: '50%',
                clipPath: 'ellipse(50% 50% at 30% 50%)',
              }}
            />
          </div>
        );

      case 'square':
        return (
          <div style={microStyle}>
            <div
              style={{
                ...microShapeStyle,
                backgroundColor: microColor,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      {renderMacrotideShape()}
      {renderMicrotideShape()}
    </div>
  );
};

export default TattvaShape;
