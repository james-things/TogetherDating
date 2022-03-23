/* eslint-disable no-undef */
import React from 'react';
import { firebaseConfig } from '../environment';

test('Testing environment firebase configuration', () => {
  expect(firebaseConfig.apiKey).toBe('AIzaSyAmsxHiejgAOvmLXkvs1Vlpmfc__ZKdSbU');
  expect(firebaseConfig.authDomain).toBe('webappcometchatdating.firebaseapp.com');
  expect(firebaseConfig.databaseURL).toBe('https://webappcometchatdating-default-rtdb.firebaseio.com');
  expect(firebaseConfig.projectId).toBe('webappcometchatdating');
  expect(firebaseConfig.storageBucket).toBe('webappcometchatdating.appspot.com');
  expect(firebaseConfig.messagingSenderId).toBe('899780685402');
  expect(firebaseConfig.appId).toBe('1:899780685402:web:e81eceb178bf2484a37263');
  expect(firebaseConfig.measurementId).toBe('G-1JKVWR2XNZ');
});
