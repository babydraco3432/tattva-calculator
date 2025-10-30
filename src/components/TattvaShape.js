import React from 'react';

const TattvaShape = ({ tattva, size = 100, isMicrotide = false }) => {
  const { shape, color, name } = tattva;
  const opacity = isMicrotide ? 0.6 : 1;

  const renderShape = () => {
    const commonStyle = {
      display: 'inline-block',
      width: size,
      height: size,
      backgroundColor: shape !== 'triangle' && shape !== 'crescent' ? color : 'transparent',
      opacity: opacity,
    };

    switch (shape) {
      case 'oval':
        return (
          <div
            style={{
              ...commonStyle,
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
              ...commonStyle,
              borderRadius: '50%',
            }}
            title={name}
          />
        );

      case 'triangle':
        return (
          <div
            style={{
              ...commonStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
            title={name}
          />
        );

      case 'crescent':
        return (
          <div
            style={{
              ...commonStyle,
              borderRadius: '50%',
              boxShadow: `${size / 4}px 0 0 0 ${color}`,
              backgroundColor: 'transparent',
            }}
            title={name}
          />
        );

      case 'square':
        return (
          <div
            style={{
              ...commonStyle,
            }}
            title={name}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      minWidth: size + 40,
      minHeight: size + 40,
    }}>
      {renderShape()}
    </div>
  );
};

export default TattvaShape;
