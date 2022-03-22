/* eslint-disable no-undef */
import React from 'react';
import isOfAge from '../methods/isOfAge';

test('Test if age is >=18', () => {
  expect(isOfAge('1990-1-1')).toBe(true);
  expect(isOfAge('2005-12-30')).toBe(false);
});
