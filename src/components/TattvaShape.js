import React from 'react';

const TattvaShape = ({ tattva, microtide, size = 100, scryingMode = false }) => {
  const { shape, backgroundColor, shapeColor, name } = tattva;

  // Check if microtide is different from macrotide
  const showMicrotide = microtide && microtide.name !== tattva.name;

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

  const renderMacrotideShape = () => {
    switch (shape) {
      case 'oval':
        // Egg/oval shape - properly centered
        return (
          <div
            style={{
              width: size * 0.75,
              height: size,
              backgroundColor: shapeColor,
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={name}
          />
        );

      case 'circle':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: shapeColor,
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={name}
          />
        );

      case 'triangle':
        // Triangle - properly centered
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${shapeColor}`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={name}
          />
        );

      case 'crescent':
        // Crescent - properly centered using SVG for better control
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={name}
          >
            <path
              d="M 50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 1 50 10"
              fill={shapeColor}
            />
          </svg>
        );

      case 'square':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: shapeColor,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            title={name}
          />
        );

      default:
        return null;
    }
  };

  const renderMicrotideShape = () => {
    // Only render if microtide is different from macrotide
    if (!showMicrotide) return null;

    const microtideSize = size * 0.4; // Smaller size for nested microtide
    const { shape: microShape, shapeColor: microColor, backgroundColor: microBg } = microtide;

    // Use the microtide's background color
    const microContainerStyle = {
      position: 'absolute',
      top: '10%',
      right: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: microtideSize * 1.2,
      height: microtideSize * 1.2,
      backgroundColor: microBg,
      borderRadius: '5px',
      border: '2px solid #333',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    };

    const renderMicroShape = () => {
      switch (microShape) {
        case 'oval':
          // Egg/oval shape - properly centered
          return (
            <div
              style={{
                width: microtideSize * 0.75,
                height: microtideSize,
                backgroundColor: microColor,
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );

        case 'circle':
          return (
            <div
              style={{
                width: microtideSize,
                height: microtideSize,
                backgroundColor: microColor,
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );

        case 'triangle':
          return (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${microtideSize / 2}px solid transparent`,
                borderRight: `${microtideSize / 2}px solid transparent`,
                borderBottom: `${microtideSize}px solid ${microColor}`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );

        case 'crescent':
          // Crescent - properly centered using SVG
          return (
            <svg
              width={microtideSize}
              height={microtideSize}
              viewBox="0 0 100 100"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <path
                d="M 50 10 A 40 40 0 1 0 50 90 A 30 30 0 1 1 50 10"
                fill={microColor}
              />
            </svg>
          );

        case 'square':
          return (
            <div
              style={{
                width: microtideSize,
                height: microtideSize,
                backgroundColor: microColor,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );

        default:
          return null;
      }
    };

    return (
      <div style={microContainerStyle}>
        {renderMicroShape()}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {renderMacrotideShape()}
      {renderMicrotideShape()}
    </div>
  );
};

export default TattvaShape;
