/* eslint-disable no-undef */
// Description: A unit test for getAge
import React from 'react';
import getAge from '../methods/getAge';

test('Get age of DoB 1-1-1990 = 23', () => {
  expect(getAge('1990-1-1')).toBe(32);
});
