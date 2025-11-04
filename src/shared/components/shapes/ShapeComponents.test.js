import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  OvalShape,
  CircleShape,
  TriangleShape,
  SquareShape,
  CrescentShape,
} from './ShapeComponents';

describe('ShapeComponents', () => {
  it('renders OvalShape with expected dimensions and z-index when microtide', () => {
    const { container } = render(
      <OvalShape
        size={100}
        color="#123456"
        isMicrotide={true}
        position={{ top: '10%', left: '20%' }}
      />
    );

    const element = container.firstChild;
    expect(element).toHaveStyle({
      width: '75px',
      height: '100px',
      backgroundColor: '#123456',
      top: '10%',
      left: '20%',
      zIndex: 10,
    });
  });

  it('renders CircleShape with expected style', () => {
    const { container } = render(
      <CircleShape size={60} color="#abcdef" position={{ top: '30%', left: '40%' }} />
    );

    const element = container.firstChild;
    expect(element).toHaveStyle({
      width: '60px',
      height: '60px',
      backgroundColor: '#abcdef',
      top: '30%',
      left: '40%',
    });
  });

  it('renders TriangleShape with proper borders', () => {
    const { container } = render(
      <TriangleShape size={50} color="#ff0000" />
    );

    const element = container.firstChild;
    expect(element).toHaveStyle({
      borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
      borderBottom: '50px solid #ff0000',
    });
  });

  it('renders SquareShape with expected size', () => {
    const { container } = render(
      <SquareShape size={80} color="#00ff00" />
    );

    const element = container.firstChild;
    expect(element).toHaveStyle({
      width: '80px',
      height: '80px',
      backgroundColor: '#00ff00',
    });
  });

  it('renders CrescentShape with expected path', () => {
    const { container } = render(
      <CrescentShape size={90} color="#123123" />
    );

    const svg = container.querySelector('svg');
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path.getAttribute('d')).toBe('M70 12 C46 8 34 24 32 50 C30 76 46 92 70 88 C60 80 62 64 62 50 C62 36 60 20 70 12 Z');
    expect(path).toHaveAttribute('fill', '#123123');
    expect(path).toHaveAttribute('fillRule', 'evenodd');
    expect(path).toHaveAttribute('transform', 'rotate(-90 50 50)');
  });
});
