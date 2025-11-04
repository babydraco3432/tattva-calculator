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

OvalShape.displayName = 'OvalShape';

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

CircleShape.displayName = 'CircleShape';

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

TriangleShape.displayName = 'TriangleShape';

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

SquareShape.displayName = 'SquareShape';

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
export const CrescentShape = React.memo(({ size, color, isMicrotide, position }) => {
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
      <path
        d="M72 12 C45 4 26 24 24 50 C22 76 45 96 72 88 C60 78 56 64 56 50 C56 36 60 24 72 12 Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
});

CrescentShape.displayName = 'CrescentShape';

CrescentShape.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isMicrotide: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
};

CrescentShape.defaultProps = {
  isMicrotide: false,
  position: null,
};
