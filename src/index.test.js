import React from 'react';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('index bootstrap', () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('creates and renders the React root', () => {
    const renderMock = jest.fn();
    const { createRoot } = require('react-dom/client');
    createRoot.mockReturnValue({ render: renderMock });

    require('./index');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(renderMock).toHaveBeenCalledTimes(1);

    const renderedTree = renderMock.mock.calls[0][0];
    expect(renderedTree.type).toBe(React.StrictMode);
  });
});
