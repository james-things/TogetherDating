/* eslint-disable no-undef */
// Description: An example unit test for a simple example function
import React from 'react';
import exampleFunction from '../methods/exampleFunction';

test('Testing exampleFunction', () => {
  expect(exampleFunction('test')).toBe('You passed the value: test');
});
