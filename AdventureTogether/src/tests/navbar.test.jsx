/* eslint-disable no-undef */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { shallow, mount, render } from 'enzyme';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Navbar', () => {
  it('Should render successfully', () => {
    act(() => {
      firebase.initializeApp(firebaseConfig);
      render(<Router><Navbar /></Router>, container);
    });
    // expect(paragraph).toHaveLength(1);
    expect(container.toBeVisible);
  });
});
