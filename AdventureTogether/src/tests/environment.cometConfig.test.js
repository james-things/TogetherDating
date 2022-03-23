/* eslint-disable no-undef */
import React from 'react';
import { cometConfig } from '../environment';

test('Testing environment cometchat configuration', () => {
  expect(cometConfig.appId).toBe('2039006cd8fea42f');
  expect(cometConfig.region).toBe('us');
  expect(cometConfig.authKey).toBe('5ba93b125c840b04a61a8b528f517eb418ed6cbc');
});
