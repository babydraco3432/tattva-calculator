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

  it('renders CrescentShape with unique mask id', () => {
    const uniqueId = 'test-id';
    const { container } = render(
      <CrescentShape size={90} color="#123123" uniqueId={uniqueId} />
    );

    const svg = container.querySelector('svg');
    const mask = svg.querySelector('mask');
    expect(mask.id).toBe(`crescentMask-${uniqueId}`);
  const ellipse = svg.querySelector('ellipse[mask]');
    expect(ellipse.getAttribute('mask')).toBe(`url(#crescentMask-${uniqueId})`);
  });
});
