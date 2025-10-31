import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders an oval/egg shape
 */
export const OvalShape = React.memo(({ size, color, isMicrotide, position }) => {
  const style = {
    width: size * 0.75,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    position: 'absolute',
    top: position?.top || '50%',
    left: position?.left || '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: isMicrotide ? 10 : 'auto',
  };

  return <div style={style} />;
});

OvalShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

OvalShape.defaultProps = {
  isMicrotide: false,
  position: null,
};

/**
 * Renders a circle shape
 */
export const CircleShape = React.memo(({ size, color, isMicrotide, position }) => {
  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    position: 'absolute',
    top: position?.top || '50%',
    left: position?.left || '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: isMicrotide ? 10 : 'auto',
  };

  return <div style={style} />;
});

CircleShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

CircleShape.defaultProps = {
  isMicrotide: false,
  position: null,
};

/**
 * Renders a triangle shape
 */
export const TriangleShape = React.memo(({ size, color, isMicrotide, position }) => {
  const style = {
    width: 0,
    height: 0,
    borderLeft: `${size / 2}px solid transparent`,
    borderRight: `${size / 2}px solid transparent`,
    borderBottom: `${size}px solid ${color}`,
    position: 'absolute',
    top: position?.top || '50%',
    left: position?.left || '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: isMicrotide ? 10 : 'auto',
  };

  return <div style={style} />;
});

TriangleShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

TriangleShape.defaultProps = {
  isMicrotide: false,
  position: null,
};

/**
 * Renders a square shape
 */
export const SquareShape = React.memo(({ size, color, isMicrotide, position }) => {
  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    position: 'absolute',
    top: position?.top || '50%',
    left: position?.left || '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: isMicrotide ? 10 : 'auto',
  };

  return <div style={style} />;
});

SquareShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

SquareShape.defaultProps = {
  isMicrotide: false,
  position: null,
};

/**
 * Renders a crescent shape using SVG
 */
export const CrescentShape = React.memo(({ size, color, isMicrotide, position, uniqueId }) => {
  const maskId = `crescentMask-${uniqueId}`;

  const style = {
    position: 'absolute',
    top: position?.top || '50%',
    left: position?.left || '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: isMicrotide ? 10 : 'auto',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={style}
    >
      <defs>
        <mask id={maskId}>
          <rect width="100" height="100" fill="white" />
          <ellipse cx="50" cy="20" rx="43" ry="30" fill="black" />
        </mask>
      </defs>
      <ellipse cx="50" cy="51" rx="48" ry="32" fill={color} mask={`url(#${maskId})`} />
    </svg>
  );
});

CrescentShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  uniqueId: PropTypes.string.isRequired,
};

CrescentShape.defaultProps = {
  isMicrotide: false,
  position: null,
};
