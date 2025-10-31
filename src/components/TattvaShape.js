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
        // Crescent - properly centered using SVG with mask for visibility
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
            <defs>
              <mask id={`crescentMask-${name}`}>
                <rect width="100" height="100" fill="white"/>
                <circle cx="55" cy="50" r="35" fill="black"/>
              </mask>
            </defs>
            <circle cx="45" cy="50" r="45" fill={shapeColor} mask={`url(#crescentMask-${name})`}/>
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
    const { shape: microShape, name: microName } = microtide;

    // Subelements should use standard colors based on their element type
    const getSubelementColor = (elementName) => {
      switch (elementName) {
        case 'Prithvi':
          return '#FFFF00'; // Yellow
        case 'Vayu':
          return '#0066FF'; // Blue
        case 'Tejas':
          return '#FF0000'; // Red
        case 'Apas':
          return '#FFFFFF'; // White (brightened from silver for visibility)
        case 'Akasha':
          return '#000000'; // Black
        default:
          return '#FFFFFF'; // Fallback white
      }
    };

    const microColor = getSubelementColor(microName);

    // Adjust positioning based on macrotide shape
    // Triangles have their visual center lower, so we need to offset subelements down
    // Crescents need subelements at the bottom center of the crescent cup
    const getPositionOffset = () => {
      if (shape === 'triangle') {
        return {
          top: '62%', // Move down from 50% to better center in triangle's visual center
          left: '50%',
        };
      }
      if (shape === 'crescent') {
        return {
          top: '68%', // Move down to bottom center of crescent cup
          left: '50%',
        };
      }
      return {
        top: '50%',
        left: '50%',
      };
    };

    const position = getPositionOffset();

    // Render microtide shape directly centered within the macrotide shape
    switch (microShape) {
      case 'oval':
        // Egg/oval shape - centered inside macrotide
        return (
          <div
            style={{
              width: microtideSize * 0.75,
              height: microtideSize,
              backgroundColor: microColor,
              borderRadius: '50%',
              position: 'absolute',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
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
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
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
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          />
        );

      case 'crescent':
        // Crescent - centered inside macrotide using SVG with mask
        return (
          <svg
            width={microtideSize}
            height={microtideSize}
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <defs>
              <mask id={`crescentMask-${microName}-micro`}>
                <rect width="100" height="100" fill="white"/>
                <circle cx="55" cy="50" r="35" fill="black"/>
              </mask>
            </defs>
            <circle cx="45" cy="50" r="45" fill={microColor} mask={`url(#crescentMask-${microName}-micro)`}/>
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
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          />
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
