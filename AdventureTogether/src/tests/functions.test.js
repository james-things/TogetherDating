/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import 'firebase/compat/auth';
import buildIsoDateString from '../methods/buildIsoDateString';
import exampleFunction from '../methods/exampleFunction';
import getAge from '../methods/getAge';
import isOfAge from '../methods/isOfAge';
import localStorePut from '../methods/localStorePut';
import localStoreGet from '../methods/localStoreGet';

beforeEach(() => {
});

afterEach(() => {
});

describe('buildIsoDateString', () => {
  it('Correctly builds iso formatted string', () => {
    expect(buildIsoDateString('06', '25', '1987')).toBe('1987-06-25');
  });
});

describe('exampleFunction', () => {
  it('Tests exampleFunction', () => {
    expect(exampleFunction('test')).toBe('You passed the value: test');
  });
});

describe('getAge', () => {
  it('Gets age of DoB 1-1-1990 = 23', () => {
    expect(getAge('1990-1-1')).toBe(32);
  });
});

describe('isOfAge', () => {
  it('Tests if age is >=18', () => {
    expect(isOfAge('1990-1-1')).toBe(true);
    expect(isOfAge('2005-12-30')).toBe(false);
  });
});

describe('localStorePut', () => {
  it('Tests local store retrieval by key', () => {
    localStorePut('keyName', 'testString');
    expect(localStoreGet('keyName')).toContain('testString');
  });
});

describe('localStoreGet', () => {
  it('Tests local store storage by key,value pair', () => {
    localStorePut('keyName', 'testString');
    expect(localStoreGet('keyName')).toContain('testString');
  });
});
