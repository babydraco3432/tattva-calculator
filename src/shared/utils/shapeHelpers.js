/**
 * Color utilities for Tattva shapes
 */

/**
 * Gets the standard color for a subelement based on its element name
 * @param {string} elementName - Name of the element (Prithvi, Vayu, Tejas, Apas, Akasha)
 * @returns {string} Hex color code for the element
 */
export const getSubelementColor = (elementName) => {
  switch (elementName) {
    case 'Prithvi':
      return '#FFFF00'; // Yellow
    case 'Vayu':
      return '#0066FF'; // Blue
    case 'Tejas':
      return '#FF0000'; // Red
    case 'Apas':
      return '#C0C0C0'; // Silver
    case 'Akasha':
      return '#000000'; // Black
    default:
      return '#FFFFFF'; // Fallback white
  }
};

/**
 * Gets position offset based on the shape type
 * Different shapes need different positioning for centered subelements
 * @param {string} shape - Shape type (triangle, crescent, etc.)
 * @returns {object} Position object with top and left properties
 */
export const getPositionOffset = (shape) => {
  // Triangles have their visual center lower, so we need to offset subelements down
  if (shape === 'triangle') {
    return {
      top: '62%',
      left: '50%',
    };
  }
  // Crescents need subelements at the bottom center of the crescent cup
  if (shape === 'crescent') {
    return {
      top: '61%',
      left: '50%',
    };
  }
  // Default centered position
  return {
    top: '50%',
    left: '50%',
  };
};
