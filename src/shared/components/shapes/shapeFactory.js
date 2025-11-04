import React from 'react';
import {
  OvalShape,
  CircleShape,
  TriangleShape,
  SquareShape,
  CrescentShape
} from './ShapeComponents';

/**
 * Factory function to render the appropriate shape component
 * @param {string} shapeType - Type of shape (oval, circle, triangle, square, crescent)
 * @param {number} size - Size of the shape
 * @param {string} color - Color of the shape
 * @param {boolean} isMicrotide - Whether this is a microtide shape
 * @param {object} position - Position offset for the shape
 * @returns {React.Element|null} The appropriate shape component or null
 */
export const renderShape = (shapeType, size, color, isMicrotide = false, position = null) => {
  const shapeProps = { size, color, isMicrotide, position };

  switch (shapeType) {
    case 'oval':
      return <OvalShape {...shapeProps} />;
    case 'circle':
      return <CircleShape {...shapeProps} />;
    case 'triangle':
      return <TriangleShape {...shapeProps} />;
    case 'square':
      return <SquareShape {...shapeProps} />;
    case 'crescent':
      return <CrescentShape {...shapeProps} />;
    default:
      return null;
  }
};
