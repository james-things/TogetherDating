/* eslint-disable no-undef */
import React from 'react';
import localStoreGet from '../methods/localStoreGet';
import localStorePut from '../methods/localStorePut';

test('Test local store retrieval by key', () => {
  localStorePut('keyName', 'testString');
  expect(localStoreGet('keyName')).toBe('testString');
});
