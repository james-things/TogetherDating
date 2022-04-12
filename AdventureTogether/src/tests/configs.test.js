/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import 'firebase/compat/auth';
import { cometConfig, firebaseConfig } from '../environment';
import {uiConfigLogin, uiConfigRegister} from '../firebaseui.config';

beforeEach(() => {
});

afterEach(() => {
});

describe('firebaseConfig', () => {
  it('Tests environment firebase configuration', () => {
    expect(firebaseConfig.apiKey).toBe('AIzaSyAmsxHiejgAOvmLXkvs1Vlpmfc__ZKdSbU');
    expect(firebaseConfig.authDomain).toBe('webappcometchatdating.firebaseapp.com');
    expect(firebaseConfig.databaseURL).toBe('https://webappcometchatdating-default-rtdb.firebaseio.com');
    expect(firebaseConfig.projectId).toBe('webappcometchatdating');
    expect(firebaseConfig.storageBucket).toBe('webappcometchatdating.appspot.com');
    expect(firebaseConfig.messagingSenderId).toBe('899780685402');
    expect(firebaseConfig.appId).toBe('1:899780685402:web:e81eceb178bf2484a37263');
    expect(firebaseConfig.measurementId).toBe('G-1JKVWR2XNZ');
  });
});

describe('cometConfig', () => {
  it('Testing environment cometchat configuration', () => {
    expect(cometConfig.appId).toBe('2039006cd8fea42f');
    expect(cometConfig.region).toBe('us');
    expect(cometConfig.authKey).toBe('5ba93b125c840b04a61a8b528f517eb418ed6cbc');
  });
});

describe('uiConfigLogin', () => {
  it('Testing firebaseui component login configuration', () => {
    expect(uiConfigLogin.signInSuccessUrl).toBe('/discover');
  });
});

describe('uiConfigRegister', () => {
  it('Testing firebaseui component login configuration', () => {
    expect(uiConfigRegister.signInSuccessUrl).toBe('/google-register');
  });
});