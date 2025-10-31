import React from 'react';
import PropTypes from 'prop-types';
import { renderShape } from './shapes/shapeFactory';
import { getSubelementColor, getPositionOffset } from '../utils/shapeHelpers';
import { SIZES, EFFECTS } from '../constants/styles';

const TattvaShape = ({ tattva, microtide, size = SIZES.TATTVA_SHAPE_SMALL, scryingMode = false }) => {
  const { shape, backgroundColor, shapeColor, name } = tattva;

  // Check if microtide is different from macrotide
  const showMicrotide = microtide && microtide.name !== tattva.name;

  // Container with background color (macrotide)
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size * SIZES.CONTAINER_RATIO,
    height: size * SIZES.CONTAINER_RATIO,
    backgroundColor: backgroundColor,
    borderRadius: EFFECTS.BORDER_RADIUS,
    border: scryingMode 
      ? `${EFFECTS.BORDER_WIDTH_SCRYING} solid ${EFFECTS.BORDER_COLOR_SCRYING}` 
      : `${EFFECTS.BORDER_WIDTH_DEFAULT} solid ${EFFECTS.BORDER_COLOR}`,
    boxShadow: scryingMode 
      ? EFFECTS.BOX_SHADOW_SCRYING
      : EFFECTS.BOX_SHADOW_DEFAULT,
    position: 'relative',
  };

  const renderMicrotideShape = () => {
    // Only render if microtide is different from macrotide
    if (!showMicrotide) return null;

    const microtideSize = size * SIZES.MICROTIDE_RATIO;
    const { shape: microShape, name: microName } = microtide;
    const microColor = getSubelementColor(microName);
    const position = getPositionOffset(shape);

    return renderShape(
      microShape,
      microtideSize,
      microColor,
      true, // isMicrotide
      position,
      `${microName}-micro`
    );
  };

  return (
    <div style={containerStyle}>
      {renderShape(shape, size, shapeColor, false, null, name)}
      {renderMicrotideShape()}
    </div>
  );
};

TattvaShape.propTypes = {
  tattva: PropTypes.shape({
    name: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    shapeColor: PropTypes.string.isRequired,
    shape: PropTypes.oneOf(['oval', 'circle', 'triangle', 'square', 'crescent']).isRequired,
    description: PropTypes.string,
  }).isRequired,
  microtide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    element: PropTypes.string.isRequired,
    shape: PropTypes.oneOf(['oval', 'circle', 'triangle', 'square', 'crescent']).isRequired,
  }),
  size: PropTypes.number,
  scryingMode: PropTypes.bool,
};

TattvaShape.defaultProps = {
  microtide: null,
  size: SIZES.TATTVA_SHAPE_SMALL,
  scryingMode: false,
};

const MemoizedTattvaShape = React.memo(TattvaShape);
MemoizedTattvaShape.displayName = 'TattvaShape';

export default MemoizedTattvaShape;
