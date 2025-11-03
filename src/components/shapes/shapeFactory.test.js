import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { renderShape } from './shapeFactory';
import {
  OvalShape,
  CircleShape,
  TriangleShape,
  SquareShape,
  CrescentShape,
} from './ShapeComponents';

const renderElement = (element) => {
  const { container } = render(element);
  return container.firstChild;
};

describe('shapeFactory renderShape', () => {
  const baseArgs = {
    size: 50,
    color: '#000',
    isMicrotide: false,
    position: { top: '50%', left: '50%' },
  };

  it('returns OvalShape component', () => {
    const element = renderShape('oval', baseArgs.size, baseArgs.color, baseArgs.isMicrotide, baseArgs.position);
    expect(element.type).toBe(OvalShape);
    expect(renderElement(element)).toBeInTheDocument();
  });

  it('returns CircleShape component', () => {
    const element = renderShape('circle', baseArgs.size, baseArgs.color);
    expect(element.type).toBe(CircleShape);
    expect(renderElement(element)).toBeInTheDocument();
  });

  it('returns TriangleShape component', () => {
    const element = renderShape('triangle', baseArgs.size, baseArgs.color);
    expect(element.type).toBe(TriangleShape);
    expect(renderElement(element)).toBeInTheDocument();
  });

  it('returns SquareShape component', () => {
    const element = renderShape('square', baseArgs.size, baseArgs.color);
    expect(element.type).toBe(SquareShape);
    expect(renderElement(element)).toBeInTheDocument();
  });

  it('returns CrescentShape component with uniqueId', () => {
    const element = renderShape('crescent', baseArgs.size, baseArgs.color, true, baseArgs.position, 'unique');
    expect(element.type).toBe(CrescentShape);
    const svg = renderElement(element);
    expect(svg.querySelector('mask').id).toBe('crescentMask-unique');
  });

  it('returns null for unknown shape', () => {
    const element = renderShape('unknown', baseArgs.size, baseArgs.color);
    expect(element).toBeNull();
  });
});