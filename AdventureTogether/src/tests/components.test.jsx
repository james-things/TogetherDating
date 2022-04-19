/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { initializeApp } from 'firebase/app';
import { act } from 'react-dom/test-utils';
import { FirebaseAppProvider, AuthProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../environment';
import Navbar from '../components/Navbar';
import ButtonMap from '../components/ButtonMap';
import CollapsibleMultiSelect from '../components/CollapsibleMultiSelect';

let container = null;
const firebaseApp = initializeApp(firebaseConfig);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('root');
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
      const auth = getAuth(firebaseApp);
      render(
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AuthProvider sdk={auth}>
            <Router>
              <Navbar />
            </Router>
          </AuthProvider>
        </FirebaseAppProvider>, container,
      );
    });
    expect(container.toBeVisible);
  });
});

describe('ButtonMap', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><ButtonMap /></Router>, container);
      expect(container.toBeVisible);
    });
  });
});

describe('CollapsibleMultiSelect', () => {
  it('Should render successfully', () => {
    act(() => {
      render(<Router><CollapsibleMultiSelect /></Router>, container);
      expect(container.toBeVisible);
    });
  });
});
