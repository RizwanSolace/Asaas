/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('renders the bottom navigation bar', async () => {
  let component: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    component = ReactTestRenderer.create(<App />);
  });

  expect(
    component!.root.findAllByProps({ testID: 'bottom-tab-bar' }).length,
  ).toBeGreaterThan(0);
});
