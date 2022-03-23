/* eslint-disable no-undef */
import React from 'react';
import buildIsoDateString from '../methods/buildIsoDateString';

test('Testing buildIsoDateString', () => {
  expect(buildIsoDateString('06', '25', '1987')).toBe('1987-06-25');
});
