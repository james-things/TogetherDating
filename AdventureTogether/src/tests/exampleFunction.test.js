/* eslint-disable no-undef */
import React from 'react';
import exampleFunction from '../methods/exampleFunction';

test('Testing exampleFunction', () => {
  expect(exampleFunction('test')).toBe('You passed the value: test');
});
